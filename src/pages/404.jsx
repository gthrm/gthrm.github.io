import React from 'react';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';

import Layout from '../components/layout';
import { rhythm } from '../utils/typography';

const styledIframeWrapper = css`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* Aspect Ratio 16:9 */
  margin-bottom: ${rhythm(0.8)};
`;

const iframeStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export default function NotFoundPage({ location }) {
  return (
    <Layout location={location}>
      <main>
        <h1>Not Found</h1>
        <p>I haven’t written this post yet. Will you help me write it?</p>
        <div css={styledIframeWrapper}>
          <iframe
            css={iframeStyle}
            title="video"
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/eYCtsliRdQw"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p>Look at</p>
      </main>
    </Layout>
  );
}

NotFoundPage.propTypes = {
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
  }).isRequired,
};
