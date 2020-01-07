import React, { useState } from 'react';
import Typed from 'react-typed';

function App() {
  const [showCursor, changeShowCursor] = useState(true);
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          gthrm.github.io
        </h1>
        <p>
          <Typed
            onComplete={() => { console.log('onComplete'); changeShowCursor(false); }}
            showCursor={showCursor}
            strings={['Hello. \r My name is Roman and I Frontend developer.']}
            typeSpeed={40}
          />
        </p>
      </header>
    </div>
  );
}

export default App;
