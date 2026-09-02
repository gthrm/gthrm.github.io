import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { Helmet } from 'react-helmet';
import Layout from '../components/layout';
import avatar from '../assets/avatar.jpg';

const styledContainer = css`
  margin-bottom: 1rem;
`;

const firstImageFrom = (html) => {
  const match = /<img[^>]+src="([^"]+)"/.exec(html);
  return match ? match[1] : null;
};

const absolute = (url, siteUrl) => (url && url.startsWith('http') ? url : `${siteUrl}${url}`);

export default function BlogPost({ location, data }) {
  const post = data.markdownRemark;
  const { siteUrl } = data.site.siteMetadata;

  const pathname = location.pathname;
  const pageUrl = `${siteUrl}${pathname}`;
  // A post can point search engines at a different primary URL - used when the
  // same article also lives on a dedicated landing page.
  const canonical = post.frontmatter.canonical || pageUrl;

  const lang = post.frontmatter.lang === 'rus' ? 'ru' : 'en';
  const image = absolute(
    post.frontmatter.image || firstImageFrom(post.html) || avatar,
    siteUrl,
  );

  // A post that points elsewhere with rel=canonical should not compete with
  // that page in structured data either.
  const schema = post.frontmatter.canonical ? null : {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    image,
    inLanguage: lang,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.date,
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
    author: { '@type': 'Person', name: 'Roman', url: siteUrl },
    publisher: { '@type': 'Person', name: 'Roman', url: siteUrl },
  };

  // Language pairs are the same slug under /eng/ and /rus/, but not every post
  // is translated - only link to a counterpart that actually exists.
  const slugs = new Set(data.allMarkdownRemark.nodes.map((node) => node.fields.slug));
  const engPath = pathname.replace('/rus/', '/eng/');
  const rusPath = pathname.replace('/eng/', '/rus/');
  const hasTranslation = engPath !== rusPath && slugs.has(engPath) && slugs.has(rusPath);

  return (
    <Layout location={location}>
      <Helmet htmlAttributes={{ lang }}>
        <meta name="description" content={post.frontmatter.description} />
        <meta name="keywords" content={post.frontmatter.keywords} />
        <link rel="canonical" href={canonical} />
        {hasTranslation && (
          <link rel="alternate" hrefLang="en" href={`${siteUrl}${engPath}`} />
        )}
        {hasTranslation && (
          <link rel="alternate" hrefLang="ru" href={`${siteUrl}${rusPath}`} />
        )}
        {hasTranslation && (
          <link rel="alternate" hrefLang="x-default" href={`${siteUrl}${engPath}`} />
        )}
        <meta property="og:title" content={post.frontmatter.title} />
        <meta property="og:description" content={post.frontmatter.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={image} />
        <meta property="og:locale" content={lang === 'ru' ? 'ru_RU' : 'en_US'} />
        <meta property="og:site_name" content={data.site.siteMetadata.title} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.frontmatter.title} />
        <meta name="twitter:description" content={post.frontmatter.description} />
        <meta name="twitter:image" content={image} />
        <title>{`Roman's Blog - ${post.frontmatter.title}`}</title>
        {schema && (
          <script type="application/ld+json">{JSON.stringify(schema)}</script>
        )}
      </Helmet>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div css={styledContainer} dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  );
}

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    allMarkdownRemark {
      nodes {
        fields {
          slug
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      id
      frontmatter {
        title
        description
        keywords
        date(formatString: "YYYY-MM-DDTHH:mm:ssZ")
        lang
        canonical
        image
      }
    }
  }
`;

BlogPost.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
        siteUrl: PropTypes.string.isRequired,
      }),
    }),
    allMarkdownRemark: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          fields: PropTypes.shape({
            slug: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired,
      ).isRequired,
    }).isRequired,
    markdownRemark: PropTypes.shape({
      html: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        keywords: PropTypes.string.isRequired,
        date: PropTypes.string,
        lang: PropTypes.string,
        canonical: PropTypes.string,
        image: PropTypes.string,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    hash: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    origin: PropTypes.string.isRequired,
    protocol: PropTypes.string.isRequired,
    host: PropTypes.string.isRequired,
    hostname: PropTypes.string.isRequired,
    port: PropTypes.string.isRequired,
    state: PropTypes.shape({
      key: PropTypes.string.isRequired,
    }),
    key: PropTypes.string.isRequired,
    action: PropTypes.string,
  }).isRequired,
};
