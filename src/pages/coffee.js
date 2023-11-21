import React from 'react';
import { css } from '@emotion/core';
import Layout from '../components/layout';
import { rhythm } from '../utils/typography';

export default function NotFoundPage({ location }) {
  return (
    <Layout location={location}>
      <main>
        <h1>The Coffee Page</h1>
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
            allowFullscreen
          />
        </div>

        <p>Look at</p>
      </main>
    </Layout>
  );
}

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
