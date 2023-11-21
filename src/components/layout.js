import React from 'react';
import { css } from '@emotion/core';
import { useStaticQuery, Link, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
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
    <>
      <Helmet>
        <meta name="theme-color" content="" />
      </Helmet>
      <div css={styledContainer}>
        <Link to="/">
          <h3 css={styledHeader}>{data.site.siteMetadata.title}</h3>
        </Link>
        <ThemeTogglerComponent />
        {children}
        <Footer />
      </div>
    </>
  );
};

const styledContainer = css`
  margin: 0 auto;
  max-width: 700px;
  padding: ${rhythm(2)};
  padding-top: ${rhythm(1.5)};
  color: var(--textNormal);
  transition-duration: 0.2s;
  transition-property: background-color, color;

  @media (max-width: 550px) {
    padding: ${rhythm(1)};
  }
`;

const styledHeader = css`
  margin-bottom: ${rhythm(2)};
  display: inline-block;
  font-style: normal;
`;
