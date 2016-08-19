import React, { Component } from 'react';

export default class Dropdown extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <label htmlFor="backstage-dropdown">
          {this.props.label}
        </label>
        <div>
          <div className="dropdown-placeholder">{this.props.placeholder}</div>
          <span className="dropdown-arrow" />
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  className: React.PropTypes.string,
  label: React.PropTypes.string,
  placeholder: React.PropTypes.string,
};

Dropdown.defaultProps = {
  label: '',
  placeholder: '',
};
