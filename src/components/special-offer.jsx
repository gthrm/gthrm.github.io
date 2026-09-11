import { css } from '@emotion/react';
import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { rhythm } from '../utils/typography';

const styledCoffeeWrapper = css`
  padding: ${rhythm(1)} 20px;
  margin: ${rhythm(1)} 0;
  display: flex;
  flex-direction: column;
  border: 4px dotted var(--textLink);
`;

const styledLink = css`
  text-decoration: none;
  color: inherit;
`;

// `footer` renders below the link, outside it — use it for anything that is
// itself a link, since nested <a> breaks SSR hydration.
function SpecialOffer({ external, children, to, target, styles, footer }) {
  return (
    <div css={[styledCoffeeWrapper, styles]}>
      {external ? (
        <a href={to} target={target} css={styledLink}>
          {children}
        </a>
      ) : (
        <Link target={target} to={to} css={styledLink}>
          {children}
        </Link>
      )}
      {footer}
    </div>
  );
}

SpecialOffer.propTypes = {
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  to: PropTypes.string.isRequired,
  target: PropTypes.string,
  external: PropTypes.bool,
  styles: PropTypes.string,
};

export default SpecialOffer;
