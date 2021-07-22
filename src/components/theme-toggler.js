import React from 'react';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';
import { css } from '@emotion/core';

import Toggle from './Toggle';
import sun from '../assets/sun.png';
import moon from '../assets/moon.png';

export default function ThemeTogglerComponent() {
  const handleToggleTheme = (e, toggleTheme, theme) => {
    // that happens before the theme toggled, so we should invert colors
    // eslint-disable-next-line no-undef
    document
      .querySelector('meta[name="theme-color"]')
      .setAttribute('content', theme === 'dark' ? 'white' : '#2d2d2d');
    toggleTheme(e.target.checked ? 'dark' : 'light');
  };
  return (
    <div
      css={css`
        float: right;
      `}
    >
      <ThemeToggler>
        {({ theme, toggleTheme }) => theme && (
        <Toggle
          icons={{
            checked: (
              <img
                alt=""
                src={moon}
                width="16"
                height="16"
                role="presentation"
                style={{ pointerEvents: 'none' }}
              />
            ),
            unchecked: (
              <img
                alt=""
                src={sun}
                width="16"
                height="16"
                role="presentation"
                style={{ pointerEvents: 'none' }}
              />
            ),
          }}
          checked={theme === 'dark'}
          onChange={(e) => handleToggleTheme(e, toggleTheme, theme)}
        />
        )}
      </ThemeToggler>
    </div>
  );
}
