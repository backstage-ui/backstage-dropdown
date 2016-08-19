import React, { Component } from 'react';

export default class Dropdown extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <label htmlFor="backstage-dropdown">
          {this.props.label}
        </label>
        <div>
          <div>value</div>
          <span className="dropdown-arrow" />
        </div>
        <div />
      </div>
    );
  }
}

Dropdown.propTypes = {
  className: React.PropTypes.string,
  label: React.PropTypes.string,
};

Dropdown.defaultProps = {
  label: '',
};
