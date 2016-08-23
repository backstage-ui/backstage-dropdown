import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Option from './option';
import styles from './dropdown.css';

export default class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = { value: props.value, dropdown: false, hover: false };
    this.onClick = this.onClick.bind(this);
    this.optionChange = this.optionChange.bind(this);
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick, false);
    document.addEventListener('touchend', this.handleDocumentClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick, false);
    document.removeEventListener('touchend', this.handleDocumentClick, false);
  }

  onClick() {
    const dropdown = this.state.dropdown;
    this.setState({ dropdown: !dropdown, hover: false });
    this.props.onChange();
  }

  mouseOver() {
    this.setState({ hover: true });
  }

  mouseOut() {
    this.setState({ hover: false });
  }

  optionChange(value) {
    this.setState({ value });
  }

  handleDocumentClick() {
    if (!ReactDOM.findDOMNode(this).contains(event.target)) {
      this.setState({ dropdown: false });
    }
  }

  renderOptions() {
    let options = this.props.options.map((option) => {
      const selected = (option === this.state.value);
      const opt = (<Option
        key={option}
        selected={selected}
        value={option}
        onChange={this.optionChange}
      />);
      return opt;
    });
    let optionsContainer;
    if (options.length > 0) {
      optionsContainer = <div className="dropdown-options" style={styles.options}>{options}</div>;
    }
    return optionsContainer;
  }

  render() {
    let dropdownStyle = styles.dropdown;
    let arrowStyle = styles.arrow;
    let placeholderStyle = styles.placeholder;
    const containerStyle = Object.assign({}, styles.container, this.props.style);

    if (this.state.hover) {
      dropdownStyle = Object.assign({}, dropdownStyle, styles.dropdownHover);
      arrowStyle = Object.assign({}, arrowStyle, styles.arrowHover);
    }

    const selected = (this.props.value !== this.state.value);

    if (selected && !this.state.hover) {
      arrowStyle = Object.assign({}, arrowStyle, styles.arrowSelected);
      placeholderStyle = Object.assign({}, placeholderStyle, styles.placeholderSelected);
    }
    return (
      <div
        className={this.props.className}
        onClick={this.onClick}
        style={containerStyle}
        onMouseOver={this.mouseOver}
        onMouseOut={this.mouseOut}
      >
        <input
          type="hidden"
          name={this.props.name}
          id="backstage-dropdown"
          value={this.state.value}
        />
        <div style={dropdownStyle}>
          <div className="dropdown-placeholder" style={placeholderStyle}>
            {this.state.value.length > 0 ? this.state.value : this.props.placeholder}
          </div>
          <span className="dropdown-arrow" style={arrowStyle} />
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
  onChange: React.PropTypes.func,
  style: React.PropTypes.object,
};

Dropdown.defaultProps = {
  label: '',
  placeholder: '',
  value: '',
  name: '',
  options: [],
  onChange: () => {},
  style: {},
};
