import React from 'react';
import { css } from '@emotion/react';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import Layout from '../../components/layout';
import { rhythm } from '../../utils/typography';

const styledLink = css`
  text-decoration: none;
  color: inherit;
`;

const styledLinkHeader = css`
  font-size: ${rhythm(1)};
  margin-bottom: ${rhythm(0.5)};

  @media (max-width: 420px) {
    font-size: ${rhythm(0.8)};
  }
`;

const styledLinkHeaderDate = css`
  color: #bbb;
`;

const styledTimeToRead = css`
  color: #bbb;
  font-size: 13px;
`;

const styledHeader = css`
  display: inline-block;
  margin: 0;

  @media (max-width: 420px) {
    font-size: ${rhythm(1)};
  }
`;

const styledCounter = css`
  margin: 0;
`;

const styledHeaderWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${rhythm(1)};
`;

export default function CoffeePage({ data }) {
  return (
    <Layout>
      <main>
        <div css={styledHeaderWrapper}>
          <div>
            <h1 css={styledHeader}>
              <span aria-label="Coffee" role="img">
                ☕️
              </span>
              {' '}
              My Coffee Blog
              {' '}
              <span aria-label="Coffee" role="img">
                ☕️
              </span>

            </h1>
            <h4 css={styledCounter}>
              {`${data.allMarkdownRemark.totalCount} Notes`}
            </h4>
          </div>
        </div>

        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <Link to={node.fields.slug} css={styledLink}>
              <h3 css={styledLinkHeader}>
                {node.frontmatter.title}
                {' '}
                <span css={styledLinkHeaderDate}>
                  —
                  {' '}
                  {node.frontmatter.date}
                </span>
              </h3>
              <p>{node.excerpt}</p>
              <p css={styledTimeToRead}>
                {`Time to read: ${node.timeToRead}  min.`}
              </p>
            </Link>
          </div>
        ))}
      </main>
    </Layout>
  );
}

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "coffee" }, lang: { eq: "eng" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            type
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
          timeToRead
        }
      }
    }
  }
`;

CoffeePage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string.isRequired,
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
              date: PropTypes.string.isRequired,
              type: PropTypes.string,
            }).isRequired,
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }).isRequired,
            excerpt: PropTypes.string.isRequired,
            timeToRead: PropTypes.number.isRequired,
          }).isRequired,
        }).isRequired,
      ).isRequired,
    }).isRequired,
  }).isRequired,
};
