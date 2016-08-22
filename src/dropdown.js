import React, { Component } from 'react';
import Option from './option';
import styles from './dropdown.css';

export default class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = { value: props.value, dropdown: false };
    this.onClick = this.onClick.bind(this);
    this.optionChange = this.optionChange.bind(this);
  }

  onClick() {
    const dropdown = this.state.dropdown;
    this.setState({ dropdown: !dropdown });
  }

  optionChange(value) {
    this.setState({ value });
  }

  renderOptions() {
    let options = this.props.options.map((option) => {
      const opt = <Option key={option} value={option} onChange={this.optionChange} />;
      return opt;
    });
    let optionsContainer;
    if (options.length > 0) {
      optionsContainer = <div className="dropdown-options" style={styles.options}>{options}</div>;
    }
    return optionsContainer;
  }

  render() {
    return (
      <div className={this.props.className} onClick={this.onClick} style={styles.container}>
        <input
          type="hidden"
          name={this.props.name}
          id="backstage-dropdown"
          value={this.state.value}
        />
        <div style={styles.dropdown}>
          <div className="dropdown-placeholder" style={styles.placeholder}>
            {this.state.value.length > 0 ? this.state.value : this.props.placeholder}
          </div>
          <span className="dropdown-arrow" style={styles.arrow} />
        </div>
        {this.state.dropdown ? this.renderOptions() : <div />}
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
