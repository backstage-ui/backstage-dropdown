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

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextState.dropdown !== this.state.dropdown ||
      nextState.selectedItem !== this.state.selectedItem
    ) {
      return true;
    } else if (
      nextProps.options !== this.props.options ||
      nextProps.disabled !== this.props.disabled ||
      nextProps.small !== this.props.small ||
      nextProps.className !== this.props.className
    ) {
      return true;
    }
    return false;
  }

  componentWillUnmount() {
    this.unbindDocumentClick();
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.dropdown !== nextState.dropdown) {
      if (nextState.dropdown) {
        this.handleOpenDropdown();
      } else {
        this.handleCloseDropdown();
      }
    }
  }

  onClick() {
    const dropdown = this.state.dropdown;
    this.setState({ dropdown: !dropdown });
  }

  onSelectItem(selectedItem) {
    this.setState({
      ...this.state,
      selectedItem: selectedItem,
      dropdown: false
    });
    this.props.onSelectOption(selectedItem);
  }

  handleOpenDropdown() {
    this.props.onOpen();
    this.bindDocumentClick();
  }

  handleCloseDropdown() {
    this.props.onClose();
    this.unbindDocumentClick();
  }

  bindDocumentClick() {
    document.addEventListener('click', this.handleDocumentClick, false);
    document.addEventListener('touchend', this.handleDocumentClick, false);
  }

  unbindDocumentClick() {
    document.removeEventListener('click', this.handleDocumentClick, false);
    document.removeEventListener('touchend', this.handleDocumentClick, false);
  }

  handleDocumentClick(event) {
    if (!ReactDOM.findDOMNode(this).contains(event.target)) {
      this.props.onClose();
      this.setState({
        ...this.state,
        dropdown: false
      });
    }
  }

  renderOptions() {
    const options = this.props.options.map((option) => {
      if (typeof option !== 'object') {
        option = {
          value: option,
          label: option
        };
      }

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
  options: PropTypes.array.isRequired,
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
