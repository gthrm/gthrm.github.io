import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { Helmet } from 'react-helmet';
import Gitalk from 'gatsby-plugin-gitalk';
import Layout from '../components/layout';

const styledContainer = css`
  margin-bottom: 1rem;
`;

export default function BlogPost({ location, data }) {
  const post = data.markdownRemark;

  const gitalkConfig = {
    id: post.frontmatter.title,
    title: post.frontmatter.title,
  };

  return (
    <Layout location={location}>
      <Helmet>
        <meta name="theme-color" content="" />
        <meta name="description" content={post.frontmatter.description} />
        <meta name="keywords" content={post.frontmatter.keywords} />
        <link rel="canonical" href={data.site.siteMetadata.siteUrl} />
        <link rel="stylesheet" href="https://unpkg.com/gitalk/dist/gitalk.css" />
        <meta property="og:title" content={post.frontmatter.title} />
        <meta property="og:description" content={post.frontmatter.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={data.site.siteMetadata.siteUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.frontmatter.title} />
        <meta name="twitter:description" content={post.frontmatter.description} />
        <title>{`Roman's Blog - ${post.frontmatter.title}`}</title>
      </Helmet>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div css={styledContainer} dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
      <Gitalk options={gitalkConfig} />
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
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      id
      frontmatter {
        title
        description
        keywords
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
    markdownRemark: PropTypes.shape({
      html: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        keywords: PropTypes.string.isRequired,
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
