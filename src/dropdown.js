import React, { Component } from 'react';

export default class Dropdown extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <div className="dropdown-control">
          <div className="dropdown-placeholder">value</div>
          <span className="dropdown-arrow" />
        </div>
        <div className="dropdown-items" />
      </div>
    );
  }
}

Dropdown.propTypes = {
  className: React.PropTypes.string,
};
