import React from 'react';
import TypedString from './TypedString';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      strings: [
        {
          id: '01',
          text: ['Hello! My name is Roman and I Frontend developer.'],
          isTyped: false
        },
        {
          id: '02',
          text: ['This is my GitHub:'],
          isTyped: false,
          link: 'https://github.com/gthrm'
        },
        {
          id: '03',
          text: ['This is my CodePen:'],
          isTyped: false,
          link: 'https://codepen.io/gthrm'
        },
        {
          id: '04',
          text: ['This is my Twitter:'],
          isTyped: false,
          link: 'https://twitter.com/RomanSeRA'
        },
        {
          id: '05',
          text: ['This is my Patreon:'],
          isTyped: false,
          link: 'https://www.patreon.com/cdroma'
        },
        {
          id: '06',
          text: ['WELCOM!'],
          isTyped: false
        }
      ]
    };
  }

  changeComplete = (id) => {
    this.setState(
      (prevState) => ({
        ...prevState,
        strings: prevState.strings.map(
          (item) => (item.id === id ? { ...item, isTyped: true } : item)
        )
      })
    );
  }

  render() {
    const { strings } = this.state;

    return (
      <div className="App flex">
        <header className="App-header flex">
          <h1 className="unselectable">
            cdroma.ru - gthrm.github.io
          </h1>
          {
            strings.map(
              (stringItem, index) => (
                <TypedString
                  isStarted={(index > 0 && strings[index - 1].isTyped) || (index === 0)}
                  stringItem={stringItem}
                  onComplete={this.changeComplete}
                  key={stringItem.id}
                />
              )
            )
          }
        </header>
      </div>
    );
  }
}

export default App;
