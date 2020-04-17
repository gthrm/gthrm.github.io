import React from 'react';
import { css } from '@emotion/core';
import { useStaticQuery, Link, graphql } from 'gatsby';
import ThemeTogglerComponent from './theme-toggler';
import Footer from './footer';
import { rhythm } from '../utils/typography';

export default ({ children }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );

  return (
    <div
      css={css`
        margin: 0 auto;
        max-width: 700px;
        padding: ${rhythm(2)};
        @media (max-width: 550px) {
          padding: ${rhythm(1)};
        }
        padding-top: ${rhythm(1.5)};

        color: var(--textNormal);
        transition-duration: 0.2s;
        transition-property: background-color, color;
    `}
    >
      <Link to="/">
        <h3
          css={css`
          margin-bottom: ${rhythm(2)};
          display: inline-block;
          font-style: normal;
        `}
        >
          {data.site.siteMetadata.title}
        </h3>
      </Link>
      <ThemeTogglerComponent />
      {children}
      <Footer />
    </div>
  );
};
