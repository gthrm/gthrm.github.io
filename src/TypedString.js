import React, { useState } from 'react';
import Typed from 'react-typed';

function TypedString(props) {
  const [showString, changeShowString] = useState(true);
  const { stringItem = {}, onComplete = () => { }, isStarted } = props;
  if (!isStarted) {
    return (
      <p />
    );
  }
  return (
    <>
      <p className="unselectable" style={{ paddingLeft: stringItem?.link ? 20 : 0 }}>
        {
          showString
            ? (
              <Typed
                onComplete={() => { changeShowString(false); onComplete(stringItem?.id); }}
                strings={stringItem.text || 'Text'}
                typeSpeed={40}
                className="unselectable"
              />
            )
            : stringItem.text
        }
      </p>
      {
        stringItem?.link && !showString
          ? <a href={stringItem.link} target="_blank" rel="noopener noreferrer">{'< --- click --- >'}</a>
          : null
      }
    </>
  );
}

export default TypedString;
