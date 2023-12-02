import React, { useCallback, useMemo } from 'react';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';

import { css } from '@emotion/react';
import Toggle from './Toggle';
import sun from '../assets/sun.png';
import moon from '../assets/moon.png';

export default function ThemeTogglerComponent() {
  const handleSetThemeColor = useCallback((theme, invert) => {
    const mainColors = ['#2d2d2d', 'white'];
    const colors = invert ? mainColors.reverse() : mainColors;
    document
      .querySelector('meta[name="theme-color"]')
      .setAttribute('content', theme === 'dark' ? colors[0] : colors[1]);
  }, []);

  const handleToggleTheme = useCallback((e, toggleTheme, theme) => {
    // that happens before the theme toggled, so we should invert colors
    handleSetThemeColor(theme, true);
    toggleTheme(e.target.checked ? 'dark' : 'light');
  }, []);

  const icons = useMemo(() => ({
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
  }), []);
  return (
    <div
      css={css`
        float: right;
      `}
    >
      <ThemeToggler>
        {({ theme, toggleTheme }) => {
          const themeLocal = localStorage.getItem('theme') || 'light';
          const mergedTheme = theme || themeLocal;
          setTimeout(() => { handleSetThemeColor(mergedTheme); });

          return (
            <Toggle
              icons={icons}
              checked={mergedTheme === 'dark'}
              onChange={(e) => handleToggleTheme(e, toggleTheme, mergedTheme)}
            />
          );
        }}
      </ThemeToggler>
    </div>
  );
}
