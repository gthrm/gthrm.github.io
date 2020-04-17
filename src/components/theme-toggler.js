import React from 'react';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';
import { css } from '@emotion/core';

import Toggle from './Toggle';
import sun from '../assets/sun.png';
import moon from '../assets/moon.png';

export default function ThemeTogglerComponent() {
  return (
    <div css={css`
        float: right;
      `}
    >
      <ThemeToggler>
        {({ theme, toggleTheme }) => (theme && (
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
            onChange={(e) => toggleTheme(e.target.checked ? 'dark' : 'light')}
          />
        ))}
      </ThemeToggler>
    </div>
  );
}
