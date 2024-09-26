import { css } from '@emotion/react';
import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { rhythm } from '../utils/typography';

const styledCoffeeWrapper = css`
  padding: ${rhythm(1)} 20px;
  margin: ${rhythm(1)} 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 4px dotted var(--textLink);
`;

const styledLink = css`
  text-decoration: none;
  color: inherit;
`;

function SpecialOffer({
  external, children, to, target,
}) {
  return (
    <div css={styledCoffeeWrapper}>
      {external ? (
        <a href={to} target={target} css={styledLink}>
          {children}
        </a>
      ) : (
        <Link target={target} to={to} css={styledLink}>
          {children}
        </Link>
      )}
    </div>
  );
}

SpecialOffer.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  target: PropTypes.string,
  external: PropTypes.bool,
};

export default SpecialOffer;
