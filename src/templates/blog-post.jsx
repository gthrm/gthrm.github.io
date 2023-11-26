import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { Helmet } from 'react-helmet';
import Layout from '../components/layout';

const styledContainer = css`
  margin-bottom: 1rem;
`;

export default function BlogPost({ location, data }) {
  const post = data.markdownRemark;
  return (
    <Layout location={location}>
      <Helmet>
        <meta name="theme-color" content="" />
        <title>{`${data.site.siteMetadata.title} - ${post.frontmatter.title}`}</title>
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
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;

BlogPost.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
    markdownRemark: PropTypes.shape({
      html: PropTypes.string.isRequired,
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
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
