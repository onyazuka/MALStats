import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Notification extends Component {

  render() {
    const { type, children } = this.props;
    // we can apply different styles depending on notification type
    return (
      <div className={`notification notification-${type}`}>{children}</div>
    );
  }
}

Notification.propTypes = {
  type: PropTypes.string.isRequired,
};