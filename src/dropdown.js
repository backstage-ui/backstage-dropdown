import React, { Component } from 'react';

export default class Dropdown extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <p>component</p>
      </div>
    );
  }
}

Dropdown.propTypes = {
  className: React.PropTypes.string,
};
