import React from 'react';
import Layout from '../components/layout';

export default function NotFoundPage({ location }) {
  return (
    <Layout location={location}>
      <main>
        <h1>Not Found</h1>
        <p>I haven’t written this post yet. Will you help me write it?</p>
        <iframe
          title="video"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/eYCtsliRdQw"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullscreen
        />
        <p>Look at</p>
      </main>
    </Layout>
  );
}
