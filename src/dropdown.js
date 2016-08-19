import React, { Component } from 'react';

export default class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = { value: props.value };
  }

  render() {
    return (
      <div className={this.props.className}>
        <input
          type="hidden"
          name={this.props.name}
          id="backstage-dropdown"
          value={this.state.value}
        />
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
  value: React.PropTypes.string,
  name: React.PropTypes.string,
};

Dropdown.defaultProps = {
  label: '',
  placeholder: '',
  value: '',
  name: '',
};
