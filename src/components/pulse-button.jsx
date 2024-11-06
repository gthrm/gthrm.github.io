import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import React from 'react';
import { rhythm } from '../utils/typography';
import SpecialOffer from './special-offer';

const buttonContainer = css`
  animation: pulse 1s infinite ease-in-out alternate;
  position: fixed;
  bottom: ${rhythm(1)};
  right: ${rhythm(2)};
  background-color: var(--bg);
  padding: ${rhythm(0.5)};
  margin: 0;

  @media (max-width: 768px) {
    display: none;
  }

  @keyframes pulse {
    from {
      transform: scale(0.8);
    }
    to {
      transform: scale(1);
    }
  }
`;

function PulseButton({ label, href }) {
  return (
    <SpecialOffer styles={buttonContainer} external to={href} target="_blank">
      {label}
    </SpecialOffer>
  );
}

PulseButton.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export default PulseButton;
