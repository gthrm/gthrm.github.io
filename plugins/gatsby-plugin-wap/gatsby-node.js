/* eslint-disable no-restricted-syntax, no-await-in-loop */
// Builds a WAP 1.x copy of the blog: WML 1.1 decks and 1-bit WBMP images in
// public/wap, for anyone still browsing on a Nokia 7110.
const crypto = require('crypto');
const fs = require('fs/promises');
const path = require('path');
const hastToWml = require('./lib/hast-to-wml');
const paginate = require('./lib/paginate');
const toWbmp = require('./lib/wbmp');

const { escape } = hastToWml;
const BASE = '/wap';
const FETCH_TIMEOUT = 15000;
const FETCH_CONCURRENCY = 4;

const LANGS = [
  { key: 'eng', label: 'English' },
  { key: 'rus', label: 'Русский' },
];

// Language comes from the folder, not frontmatter, so a post is never lost
// to a `lang: "ru"` typo.
const langOf = (slug) => /^\/(eng|rus)\//.exec(slug)?.[1];

// `/eng/some-post/` -> `eng/some-post`
const stem = (slug) => slug.replace(/^\/+|\/+$/g, '');
const deckFile = (name, page) =>
  page > 1 ? `${name}-${page}.wml` : `${name}.wml`;
const deckHref = (name, page = 1) =>
  encodeURI(`${BASE}/${deckFile(name, page)}`);

// WML 1.1, what the Nokia 7110 speaks: no accesskey and no <pre>, those
// only arrived in 1.2.
const deck = (title, body) => `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE wml PUBLIC "-//WAPFORUM//DTD WML 1.1//EN" "http://www.wapforum.org/DTD/wml_1.1.xml">
<wml>
<card id="c" title="${escape(title)}">
<do type="prev" label="Back"><prev/></do>
${body.join('\n')}
</card>
</wml>
`;

const collectImages = (node, urls) => {
  if (node.tagName === 'img' && /^https?:\/\//.test(node.properties?.src)) {
    urls.add(node.properties.src);
  }
  (node.children || []).forEach((child) => collectImages(child, urls));
  return urls;
};

const pool = async (items, limit, task) => {
  const queue = [...items];
  const worker = async () => {
    while (queue.length) await task(queue.shift());
  };
  await Promise.all(Array.from({ length: limit }, worker));
};

exports.onPostBuild = async (
  { graphql, reporter, cache, store },
  {
    imageWidth = 96,
    deckBytes = 1400,
    avatar,
    avatarAlt = '',
    heading,
    intro,
  } = {},
) => {
  const root = store.getState().program.directory;
  const out = path.join(root, 'public', BASE);
  await fs.rm(out, { recursive: true, force: true });
  await fs.mkdir(path.join(out, 'img'), { recursive: true });

  const { data, errors } = await graphql(`
    query {
      site {
        siteMetadata {
          title
          siteUrl
        }
      }
      allMarkdownRemark(
        filter: { frontmatter: { type: { eq: "main" } } }
        sort: { frontmatter: { date: DESC } }
      ) {
        nodes {
          htmlAst
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "DD.MM.YYYY")
          }
        }
      }
    }
  `);
  if (errors) {
    reporter.panicOnBuild('gatsby-plugin-wap: GraphQL query failed', errors);
    return;
  }

  const { title: siteTitle, siteUrl } = data.site.siteMetadata;
  const { origin } = new URL(siteUrl);
  const posts = data.allMarkdownRemark.nodes.filter((post) =>
    langOf(post.fields.slug),
  );
  const slugs = new Set(posts.map((post) => post.fields.slug));

  // --- Images -------------------------------------------------------------

  const images = new Map();
  const saveWbmp = async (key, wbmp) => {
    await fs.writeFile(path.join(out, 'img', `${key}.wbmp`), wbmp);
    return `${BASE}/img/${key}.wbmp`;
  };

  const urls = new Set();
  posts.forEach((post) => collectImages(post.htmlAst, urls));
  await pool(urls, FETCH_CONCURRENCY, async (url) => {
    const key = crypto.createHash('sha1').update(url).digest('hex');
    // Bump the version when toWbmp changes so cached images are redone.
    const cacheKey = `wbmp-v2-${imageWidth}-${key}`;
    try {
      let wbmp = await cache.get(cacheKey);
      wbmp = wbmp && Buffer.from(wbmp, 'base64');
      if (!wbmp) {
        const response = await fetch(url, {
          signal: AbortSignal.timeout(FETCH_TIMEOUT),
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        wbmp = await toWbmp(
          Buffer.from(await response.arrayBuffer()),
          imageWidth,
        );
        await cache.set(cacheKey, wbmp.toString('base64'));
      }
      images.set(url, await saveWbmp(key, wbmp));
    } catch (error) {
      reporter.warn(`gatsby-plugin-wap: ${url} -> alt text (${error.message})`);
    }
  });

  let avatarSrc = null;
  if (avatar) {
    try {
      avatarSrc = await saveWbmp(
        'avatar',
        await toWbmp(path.join(root, avatar), 48),
      );
    } catch (error) {
      reporter.warn(`gatsby-plugin-wap: avatar skipped (${error.message})`);
    }
  }

  // --- Decks --------------------------------------------------------------

  const navFor = (name, number, total, up) => {
    const nav = [];
    if (total > 1) {
      const prev =
        number > 1
          ? `<a href="${deckHref(name, number - 1)}">&lt;&lt; Prev</a>`
          : '';
      const next =
        number < total
          ? `<a href="${deckHref(name, number + 1)}">Next &gt;&gt;</a>`
          : '';
      nav.push([prev, `${number}/${total}`, next].filter(Boolean).join(' | '));
    }
    if (up) {
      nav.push(`<a href="${up.href}">${escape(up.label)}</a>`);
    }
    if (name !== 'index') {
      nav.push(`<a href="${deckHref('index')}">Home</a>`);
    }
    // Explicit wrap: the nav may follow a code block, whose nowrap mode would
    // otherwise carry over.
    return nav.length ? [`<p mode="wrap">${nav.join('<br/>')}</p>`] : [];
  };

  let written = 0;
  const writeDecks = async (name, title, blocks, up) => {
    // Whatever the wrapper and the widest possible nav (a middle page, with
    // both Prev and Next) leave is for content.
    const overhead = Buffer.byteLength(deck(title, navFor(name, 98, 99, up)));
    const pages = paginate(blocks, Math.max(deckBytes - overhead, 256));
    for (const [index, page] of pages.entries()) {
      const number = index + 1;
      const body = [...page, ...navFor(name, number, pages.length, up)];
      const file = path.join(out, deckFile(name, number));
      await fs.mkdir(path.dirname(file), { recursive: true });
      await fs.writeFile(file, deck(title, body));
      written += 1;
    }
  };

  // Resolves a link the way the browser would from the post's page; links to
  // other posts go to their WAP decks, everything else to the real URL.
  const linkFrom = (slug) => (href) => {
    if (!href || href.startsWith('#')) return null;
    let url;
    try {
      url = new URL(href, `${siteUrl}${slug}`);
    } catch {
      return href;
    }
    if (url.origin === origin) {
      let pathname;
      try {
        pathname = decodeURIComponent(url.pathname);
      } catch {
        ({ pathname } = url);
      }
      const target = pathname.endsWith('/') ? pathname : `${pathname}/`;
      if (slugs.has(target)) return deckHref(stem(target));
    }
    return url.href;
  };

  for (const post of posts) {
    const { slug } = post.fields;
    const up = LANGS.find((item) => item.key === langOf(slug));
    const blocks = [
      `<p><b>${escape(post.frontmatter.title)}</b><br/><small>${escape(
        post.frontmatter.date || '',
      )}</small></p>`,
      ...hastToWml(post.htmlAst, {
        link: linkFrom(slug),
        image: (src) => images.get(src),
      }),
    ];
    await writeDecks(stem(slug), post.frontmatter.title, blocks, {
      href: deckHref(up.key),
      label: up.label,
    });
  }

  const postsIn = (key) =>
    posts.filter((post) => langOf(post.fields.slug) === key);

  for (const { key, label } of LANGS) {
    const items = postsIn(key).map(
      (post) =>
        `<p><a href="${deckHref(stem(post.fields.slug))}">${escape(
          post.frontmatter.title,
        )}</a><br/><small>${escape(post.frontmatter.date || '')}</small></p>`,
    );
    await writeDecks(key, `${label} - ${siteTitle}`, [
      `<p><b>${escape(label)}</b></p>`,
      ...items,
    ]);
  }

  const counts = LANGS.map(
    ({ key, label }) =>
      `<a href="${deckHref(key)}">${escape(label)} (${postsIn(key).length})</a>`,
  );
  const avatarImg = avatarSrc
    ? `<img src="${avatarSrc}" alt="${escape(avatarAlt || 'avatar')}"/><br/>`
    : '';
  await writeDecks('index', siteTitle, [
    `<p align="center">${avatarImg}<b>${escape(
      heading || siteTitle,
    )}</b><br/><small>WAP edition</small></p>`,
    ...(intro ? [`<p>${escape(intro)}</p>`] : []),
    `<p>${counts.join('<br/>')}</p>`,
    `<p><small><a href="${escape(siteUrl)}/">Full version</a></small></p>`,
  ]);
  // Static hosts (GitHub Pages, gatsby serve) only use index.html as a folder
  // index, so /wap/ gets a copy of the home deck. It is served as text/html
  // there; /wap/index.wml has the proper WML content type.
  await fs.copyFile(path.join(out, 'index.wml'), path.join(out, 'index.html'));

  reporter.info(
    `gatsby-plugin-wap: ${written} decks, ${images.size}/${urls.size} images`,
  );
};
