import React, { Component } from 'react';

export default class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = { value: props.value };
  }

  renderOptions() {
    let options = this.props.options.map((option) => {
      const opt = <div key={option} value={option} className="dropdown-item">{option}</div>;
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
        {this.renderOptions()}
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
