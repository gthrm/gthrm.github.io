import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';

const styledContainer = css`
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-bottom: 15px;
`;

const styledDisabledLink = css`
    color: var(--disabledLink);

    &:hover {
        cursor: not-allowed;
    }
`;

const styledActiveLink = css`
    color: var(--textLink);

    &:hover {
        cursor: pointer;
    }
`;

function LanguageSwitcher({ currentPath }) {
  const isEnglish = currentPath.includes('/eng/');
  return (
    <div css={styledContainer}>
      <Link css={isEnglish ? styledDisabledLink : styledActiveLink} partiallyActive={!isEnglish} to={currentPath.replace('/rus/', '/eng/')}>
        ENG
      </Link>
      {' / '}
      <Link css={isEnglish ? styledActiveLink : styledDisabledLink} partiallyActive={isEnglish} to={currentPath.replace('/eng/', '/rus/')}>
        RUS
      </Link>
    </div>
  );
}

LanguageSwitcher.propTypes = {
  currentPath: PropTypes.string.isRequired,
};

export default LanguageSwitcher;
