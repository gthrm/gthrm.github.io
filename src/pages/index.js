import React from 'react';
import { Link, graphql } from 'gatsby';
import { css } from '@emotion/core';
import { rhythm } from '../utils/typography';
import Layout from '../components/layout';

export default ({ data }) => (
  <Layout>
    <div>
      <div
        css={css`
            @media (max-width: 550px) {
              display: inline-block;
            }
            display:flex;
          `}
      >
        <h1
          css={css`
            @media (max-width: 420px) {
              font-size: ${rhythm(1)};
            }
            display: inline-block;
          `}
        >
          Notes by Roman Mesheshcheriakov
        </h1>
        <img
          src="https://pbs.twimg.com/profile_images/1250156684892307456/DvGRkppG_400x400.jpg"
          alt="Roman Meshcheriakov"
          css={css`
              @media (max-width: 420px) {
                font-size: ${rhythm(1)};
                width: ${rhythm(2)};
                height: ${rhythm(2)};
              }
              margin-bottom: 0;
              width: ${rhythm(2.6)};
              height: ${rhythm(2.6)};
              border-radius: 50%;
            `}
        />
      </div>
      <h4>
        {data.allMarkdownRemark.totalCount}
        {' '}
        Notes
      </h4>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id}>
          <Link
            to={node.fields.slug}
            css={css`
                text-decoration: none;
                color: inherit;
              `}
          >
            <h3
              css={css`
                margin-bottom: ${rhythm(1 / 4)};
              `}
            >
              {node.frontmatter.title}
              {' '}
              <span
                css={css`
                  color: #bbb;
                `}
              >
                —
                {' '}
                {node.frontmatter.date}
              </span>
            </h3>
            <p>{node.excerpt}</p>
            <p
              css={css`
                color: #bbb;
                font-size: 13px;
              `}
            >
              Time to read:
              {node.timeToRead}
              {' '}
              min.
            </p>
          </Link>
        </div>
      ))}
    </div>
  </Layout>
);

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
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
