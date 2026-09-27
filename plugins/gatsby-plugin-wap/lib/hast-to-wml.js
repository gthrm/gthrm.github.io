// Turns the hast tree gatsby-transformer-remark gives us into a flat list of
// WML <p> blocks. WML 1.1 has no nested blocks, no lists, no headings and no
// <pre>, so everything is flattened into paragraphs of inline markup.

const NBSP = '&#160;';

const escape = (text) =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
    // `$` starts a variable reference in WML, `$$` is a literal dollar.
    .replace(/\$/g, '$$$$')
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '');

const textOf = (node) => {
  if (node.type === 'text') return node.value;
  return (node.children || []).map(textOf).join('');
};

const INLINE = new Set([
  'a',
  'abbr',
  'b',
  'br',
  'code',
  'del',
  'em',
  'i',
  'img',
  'kbd',
  's',
  'small',
  'span',
  'strong',
  'sub',
  'sup',
  'u',
]);

const isInline = (node) =>
  node.type === 'text' || (node.type === 'element' && INLINE.has(node.tagName));

const isBlank = (node) => node.type === 'text' && !node.value.trim();

module.exports = function hastToWml(root, { link, image }) {
  const blocks = [];
  // A <p> without `mode` inherits the previous paragraph's line wrapping, so
  // the one after a code block has to switch wrapping back on.
  let afterNowrap = false;

  const img = ({ properties = {} }) => {
    const alt = escape((properties.alt || '').trim()) || 'image';
    const src = image(properties.src || '');
    return src ? `<img src="${escape(src)}" alt="${alt}"/>` : `[IMG: ${alt}]`;
  };

  // WML anchors may only hold text, <br/> and <img>, so any formatting inside
  // a link is dropped but images (linked badges) are kept.
  const anchorContent = (nodes) =>
    nodes
      .map((node) => {
        if (node.type === 'text')
          return escape(node.value.replace(/\s+/g, ' '));
        if (node.tagName === 'img') return img(node);
        if (node.tagName === 'br') return '<br/>';
        return anchorContent(node.children || []);
      })
      .join('');

  const inline = (nodes) =>
    nodes
      .map((node) => {
        if (node.type === 'text')
          return escape(node.value.replace(/\s+/g, ' '));
        if (node.type !== 'element') return '';
        const { tagName, properties = {}, children = [] } = node;
        switch (tagName) {
          case 'br':
            return '<br/>';
          case 'b':
          case 'strong':
            return `<b>${inline(children)}</b>`;
          case 'i':
          case 'em':
            return `<i>${inline(children)}</i>`;
          case 'u':
            return `<u>${inline(children)}</u>`;
          case 'small':
            return `<small>${inline(children)}</small>`;
          case 'a': {
            const label = anchorContent(children).trim();
            const href = link(properties.href || '');
            if (!href) return label;
            return `<a href="${escape(href)}">${label || escape(href)}</a>`;
          }
          case 'img':
            return img(node);
          default:
            return inline(children);
        }
      })
      .join('');

  const trim = (content) => content.replace(/^(\s|<br\/>)+|(\s|<br\/>)+$/g, '');

  // `bullet` is shared by everything inside one list item: its first block
  // gets the marker ("- ", "2. "), later ones are indented to line up under
  // the text. `wrap` goes around every paragraph (blockquote italics).
  const walk = (nodes, ctx = {}) => {
    const { wrap = (s) => s, depth = 0 } = ctx;
    const bullet = ctx.bullet || { first: '', rest: '', used: true };
    const take = () => {
      if (bullet.used) return bullet.rest;
      bullet.used = true;
      return bullet.first;
    };
    const paragraph = (content, { center = false, nowrap = false } = {}) => {
      const body = trim(content);
      if (!body) return;
      const align = center ? ' align="center"' : '';
      const mode =
        nowrap || afterNowrap ? ` mode="${nowrap ? 'no' : ''}wrap"` : '';
      blocks.push(`<p${align}${mode}>${wrap(take() + body)}</p>`);
      afterNowrap = nowrap;
    };

    // Loose inline nodes at block level (inside <li>, raw HTML <div>s) are
    // gathered into one paragraph.
    let run = [];
    const flushRun = () => {
      if (run.some((node) => !isBlank(node))) paragraph(inline(run));
      run = [];
    };

    nodes.forEach((node) => {
      if (isInline(node)) {
        run.push(node);
        return;
      }
      flushRun();
      if (node.type !== 'element') return;
      const { tagName, children = [] } = node;

      if (/^h[1-6]$/.test(tagName)) {
        paragraph(`<b>${inline(children)}</b>`);
      } else if (tagName === 'p') {
        const onlyImage =
          children.filter((child) => !isBlank(child)).length === 1 &&
          children.some((child) => child.tagName === 'img');
        paragraph(inline(children), { center: onlyImage });
      } else if (tagName === 'ul' || tagName === 'ol') {
        const start = Number(node.properties?.start) || 1;
        children
          .filter((child) => child.tagName === 'li')
          .forEach((li, index) => {
            const marker = escape(
              tagName === 'ol' ? `${start + index}. ` : '- ',
            );
            // A list that opens a list item ("- - foo") takes over the outer
            // marker instead of losing it.
            const lead =
              index === 0 && !bullet.used ? take() : NBSP.repeat(depth * 2);
            walk(li.children || [], {
              bullet: {
                first: lead + marker,
                rest: NBSP.repeat(depth * 2 + 2),
                used: false,
              },
              wrap,
              depth: depth + 1,
            });
          });
      } else if (tagName === 'blockquote') {
        walk(children, { bullet, wrap: (s) => wrap(`<i>${s}</i>`), depth });
      } else if (tagName === 'pre') {
        const lines = textOf(node)
          .replace(/\n+$/, '')
          .split('\n')
          .map((line) =>
            escape(line).replace(/^ +/, (spaces) => NBSP.repeat(spaces.length)),
          );
        paragraph(lines.join('<br/>'), { nowrap: true });
      } else if (tagName === 'table') {
        const rows = [];
        const collect = (parent) =>
          (parent.children || []).forEach((child) => {
            if (child.tagName === 'tr') rows.push(child);
            else if (child.type === 'element') collect(child);
          });
        collect(node);
        const lines = rows.map((row) => {
          const cells = (row.children || []).filter((cell) =>
            ['td', 'th'].includes(cell.tagName),
          );
          const line = cells.map((cell) => inline(cell.children)).join(' | ');
          return cells.some((cell) => cell.tagName === 'th')
            ? `<b>${line}</b>`
            : line;
        });
        paragraph(lines.join('<br/>'));
      } else if (tagName === 'hr') {
        paragraph('----------', { center: true });
      } else if (!['script', 'style', 'iframe', 'video'].includes(tagName)) {
        walk(children, { bullet, wrap, depth });
      }
    });
    flushRun();
  };

  walk(root.children || []);
  return blocks;
};

module.exports.escape = escape;
