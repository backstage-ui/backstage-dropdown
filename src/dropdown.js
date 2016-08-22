import React, { Component } from 'react';
import Option from './option';

export default class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = { value: props.value, dropdown: false };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const dropdown = this.state.dropdown;
    this.setState({ dropdown: !dropdown });
  }

  renderOptions() {
    let options = this.props.options.map((option) => {
      const opt = <Option key={option} value={option} />;
      return opt;
    });
    let optionsContainer;
    if (options.length > 0) {
      optionsContainer = <div className="dropdown-options">{options}</div>;
    }
    return optionsContainer;
  }

  render() {
    return (
      <div className={this.props.className} onClick={this.onClick}>
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
          {this.state.dropdown ? this.renderOptions() : <div />}
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
  options: React.PropTypes.array,
};

Dropdown.defaultProps = {
  label: '',
  placeholder: '',
  value: '',
  name: '',
  options: [],
};
