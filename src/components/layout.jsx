import React from 'react';
import {
  useStaticQuery, Link, graphql,
} from 'gatsby';
import { Helmet } from 'react-helmet';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';

import ThemeTogglerComponent from './theme-toggler';
import Footer from './footer';
import { rhythm } from '../utils/typography';
import LanguageSwitcher from './language-switcher';

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

export default function Layout({ location, children }) {
  const currentPath = location?.pathname;
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `,
  );

  return (
    <>
      <Helmet>
        <meta name="theme-color" content="" />
      </Helmet>
      <div css={styledContainer}>
        <div>
          <Link to="/">
            <h3 css={styledHeader}>{data.site.siteMetadata.title}</h3>
          </Link>
          <ThemeTogglerComponent />
        </div>

        {location && <LanguageSwitcher currentPath={currentPath} />}
        {children}
        <Footer />
      </div>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
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
  }),
};

Layout.defaultProps = { location: null };
