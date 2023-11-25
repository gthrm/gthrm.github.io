import React from 'react';
import { Link, graphql } from 'gatsby';

import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import { rhythm } from '../utils/typography';
import Layout from '../components/layout';
import avatar from '../assets/avatar.jpg';
import avatarAvif from '../assets/avatar.avif';
import avatarWebp from '../assets/avatar.webp';

const styledHeaderWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const styledAvatar = css`
  font-size: 10px;
  color: var(--bg);
  margin-bottom: 0;
  min-width: ${rhythm(2.6)};
  height: ${rhythm(2.6)};
  border-radius: 50%;

  @media (max-width: 420px) {
    min-width: ${rhythm(2)};
    height: ${rhythm(2)};
  }
`;

const styledHeader = css`
  display: inline-block;
  margin: 0;

  @media (max-width: 420px) {
    font-size: ${rhythm(1)};
  }
`;

const styledLink = css`
  text-decoration: none;
  color: inherit;
`;

const styledCoffeeWrapper = css`
  padding: ${rhythm(1)} 0;
  margin: ${rhythm(1)} 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 4px dotted var(--textLink);
`;

const styledLinkHeader = css`
  font-size: ${rhythm(1)};
  margin-bottom: ${rhythm(0.5)};

  @media (max-width: 420px) {
    font-size: ${rhythm(0.8)};
  }
`;

const styledCoffeeLinkHeader = css`
  font-size: ${rhythm(1)};
  margin: 0;

  @media (max-width: 420px) {
    font-size: ${rhythm(0.8)};
  }
`;

const styledCounter = css`
  margin: 0;
`;

const styledLinkHeaderDate = css`
  color: #bbb;
`;

const styledTimeToRead = css`
  color: #bbb;
  font-size: 13px;
`;

export default function App({ data }) {
  return (
    <Layout>
      <main>
        <div css={styledHeaderWrapper}>
          <div>
            <h1 css={styledHeader}>Roman&#39;s Blog</h1>
            <h4 css={styledCounter}>
              {`${data.allMarkdownRemark.totalCount} Notes`}
            </h4>
          </div>
          <picture>
            <source
              srcSet={avatarAvif}
            />
            <source
              srcSet={avatarWebp}

            />
            <img loading="lazy" src={avatar} alt="Roman" css={styledAvatar} />
          </picture>

        </div>
        <div css={styledCoffeeWrapper}>
          <Link to="coffee" css={styledLink}>
            <h3 css={styledCoffeeLinkHeader}>
              <span aria-label="Coffee" role="img">
                ☕️
              </span>
              {' '}
              The Coffee Blog here
              {' '}
              <span aria-label="Click" role="img">
                👈
              </span>
            </h3>
          </Link>
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
      filter: { frontmatter: { type: { eq: "main" }, lang: { eq: "eng" } } }
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

App.propTypes = {
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
