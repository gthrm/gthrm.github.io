/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/*
 * Copyright (c) 2015 instructure-react
 * Forked from https://github.com/aaronshaf/react-toggle/
 * + applied https://github.com/aaronshaf/react-toggle/pull/90
 * */

import './Toggle.css';
import PropTypes from 'prop-types';

import React, { PureComponent } from 'react';

// Copyright 2015-present Drifty Co.
// http://drifty.com/
// from: https://github.com/driftyco/ionic/blob/master/src/util/dom.ts
function pointerCoord(event) {
  // get coordinates for either a mouse click
  // or a touch depending on the given event
  if (event) {
    const { changedTouches } = event;
    if (changedTouches && changedTouches.length > 0) {
      const touch = changedTouches[0];
      return { x: touch.clientX, y: touch.clientY };
    }
    const { pageX } = event;
    if (pageX !== undefined) {
      return { x: pageX, y: event.pageY };
    }
  }
  return { x: 0, y: 0 };
}

export default class Toggle extends PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleTouchCancel = this.handleTouchCancel.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.previouslyChecked = !!(props.checked || props.defaultChecked);
    this.state = {
      checked: !!(props.checked || props.defaultChecked),
      hasFocus: false,
    };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({ checked: !!nextProps.checked });
      this.previouslyChecked = !!nextProps.checked;
    }
  }

  handleTouchStart(event) {
    const { hasFocus } = this.state;
    this.startX = pointerCoord(event).x;
    this.touchStarted = true;
    this.hadFocusAtTouchStart = hasFocus;
    this.setState({ hasFocus: true });
  }

  handleTouchMove(event) {
    if (!this.touchStarted) return;
    this.touchMoved = true;

    if (this.startX != null) {
      const { checked } = this.state;
      const currentX = pointerCoord(event).x;
      if (checked && currentX + 15 < this.startX) {
        this.setState({ checked: false });
        this.startX = currentX;
      } else if (!checked && currentX - 15 > this.startX) {
        this.setState({ checked: true });
        this.startX = currentX;
      }
    }
  }

  handleTouchEnd(event) {
    if (!this.touchMoved) return;
    const { checked } = this.state;
    const checkbox = this.input;
    event.preventDefault();

    if (this.startX != null) {
      if (this.previouslyChecked !== checked) {
        checkbox.click();
      }

      this.touchStarted = false;
      this.startX = null;
      this.touchMoved = false;
    }

    if (!this.hadFocusAtTouchStart) {
      this.setState({ hasFocus: false });
    }
  }

  handleTouchCancel() {
    if (this.startX != null) {
      this.touchStarted = false;
      this.startX = null;
      this.touchMoved = false;
    }

    if (!this.hadFocusAtTouchStart) {
      this.setState({ hasFocus: false });
    }
  }

  handleFocus(event) {
    const { onFocus } = this.props;

    if (onFocus) {
      onFocus(event);
    }

    this.hadFocusAtTouchStart = true;
    this.setState({ hasFocus: true });
  }

  handleBlur(event) {
    const { onBlur } = this.props;

    if (onBlur) {
      onBlur(event);
    }

    this.hadFocusAtTouchStart = false;
    this.setState({ hasFocus: false });
  }

  handleClick(event) {
    const checkbox = this.input;
    this.previouslyChecked = checkbox.checked;
    if (event.target !== checkbox && !this.moved) {
      event.preventDefault();
      checkbox.focus();
      checkbox.click();
      return;
    }

    this.setState({ checked: checkbox.checked });
  }

  getIcon(type) {
    const { icons } = this.props;
    if (!icons) {
      return null;
    }
    return icons[type] === undefined
      ? Toggle.defaultProps.icons[type]
      : icons[type];
  }

  render() {
    const {
      className, icons: _icons, disabled, ...inputProps
    } = this.props;
    const { checked, hasFocus } = this.state;
    const classes = `react-toggle${checked ? ' react-toggle--checked' : ''}${
      hasFocus ? ' react-toggle--focus' : ''
    }${disabled ? ' react-toggle--disabled' : ''}${
      className ? ` ${className}` : ''
    }`;
    return (
      <div
        className={classes}
        onClick={this.handleClick}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        onTouchCancel={this.handleTouchCancel}
      >
        <div className="react-toggle-track">
          <div className="react-toggle-track-check">
            {this.getIcon('checked')}
          </div>
          <div className="react-toggle-track-x">
            {this.getIcon('unchecked')}
          </div>
        </div>
        <div className="react-toggle-thumb" />

        <input
          {...inputProps}
          ref={(ref) => {
            this.input = ref;
          }}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          className="react-toggle-screenreader-only"
          type="checkbox"
          aria-label="Switch between Dark and Light mode"
        />
      </div>
    );
  }
}

Toggle.propTypes = {
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  icons: PropTypes.shape({
    checked: PropTypes.node,
    unchecked: PropTypes.node,
  }),
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

Toggle.defaultProps = {
  checked: false,
  defaultChecked: undefined,
  onFocus: null,
  onBlur: null,
  icons: null,
  className: '',
  disabled: false,
};
