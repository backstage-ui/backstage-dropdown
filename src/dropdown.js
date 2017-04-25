/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';
import classNames from "classnames";
import Option from "./option";

export default class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItem: this.props.options[0],
      dropdown: false
    };

    this.onClick = ::this.onClick;
    this.onSelectItem = ::this.onSelectItem;
    this.handleDocumentClick = ::this.handleDocumentClick;
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick, false);
    document.addEventListener('touchend', this.handleDocumentClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick, false);
    document.removeEventListener('touchend', this.handleDocumentClick, false);
  }

  handleDocumentClick(event) {
    if (!ReactDOM.findDOMNode(this).contains(event.target)) {
      this.props.onClose();
      this.setState({ dropdown: false });
    }
  }

  onClick() {
    const dropdown = this.state.dropdown;
    this.setState({ dropdown: !dropdown });

    if (dropdown) {
      this.props.onClose();
    } else {
      this.props.onOpen();
    }
  }

  onSelectItem(selectedItem) {
    this.setState({selectedItem: selectedItem, dropdown: false});
    this.props.onSelectOption(selectedItem);
  }

  renderOptions() {
    const options = this.props.options.map((option) => {
      return (
        <Option key={option.value}
          value={option.value}
          label={option.label}
          onSelect={this.onSelectItem}
          selected={ this.state.selectedItem && this.state.selectedItem.value == option.value }
        />
      );
    });
    return options;
  }

  render() {
    const dropdownClassNames = classNames({
      "bs-ui-dropdown": true,
      "bs-ui-dropdown--open": this.state.dropdown,
      "bs-ui-dropdown--small": this.props.small,
      "bs-ui-dropdown--open-up": this.props.openUp,
      "bs-ui-dropdown--disabled": this.props.disabled,
    }, this.props.className);
    const selectedItem = this.state.selectedItem ? this.state.selectedItem : this.props.options[0];

    return (
      <div className={dropdownClassNames} onClick={() => this.props.disabled || this.state.dropdown || this.onClick() }>
        <div className="bs-ui-dropdown__item">{selectedItem.label}</div>
        <ul className="bs-ui-dropdown__list">
          {this.renderOptions()}
        </ul>
      </div>
    );
  }
}

Dropdown.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  small: PropTypes.bool,
  openUp: PropTypes.bool,
  options: PropTypes.array,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onSelectOption: PropTypes.func,
};

Dropdown.defaultProps = {
  className: "",
  disabled: false,
  small: false,
  openUp: false,
  options: [],
  onOpen: () => {},
  onClose: () => {},
  onSelectOption: () => {},
};
