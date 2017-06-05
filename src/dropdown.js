/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import Option from './option';

export default class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdown: false,
    };

    this.onClick = ::this.onClick;
    this.onSelectItem = ::this.onSelectItem;
    this.handleDocumentClick = ::this.handleDocumentClick;
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

  componentWillUnmount() {
    this.unbindDocumentClick();
  }

  onClick() {
    const dropdown = this.state.dropdown;
    this.setState({ dropdown: !dropdown });
  }

  onSelectItem(selectedItem) {
    this.setState({
      ...this.state,
      dropdown: false,
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
        dropdown: false,
      });
    }
  }

  renderOptions() {
    const options = this.props.options.map(option => (
      <Option
        key={option.value}
        label={option.label}
        onSelect={() => this.onSelectItem(option)}
        selected={this.props.selectedOption === option.value}
      />
    ));
    return options;
  }

  render() {
    const dropdownClassNames = classNames({
      'bs-ui-dropdown': true,
      'bs-ui-dropdown--small': this.props.small,
      'bs-ui-dropdown--disabled': this.props.disabled,
      'bs-ui-options--open': this.state.dropdown,
      'bs-ui-options--open-up': this.props.openUp,
    }, this.props.className);
    const selectedItem = this.props.options.find(
      option => option.value === this.props.selectedOption,
    );

    return (
      <div
        className={dropdownClassNames}
        onClick={() => this.props.disabled || this.state.dropdown || this.onClick()}
      >
        <div className="bs-ui-dropdown__item">
          { selectedItem.label }
        </div>
        <ul className="bs-ui-options__list">
          { this.renderOptions() }
        </ul>
      </div>
    );
  }
}

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })).isRequired,
  selectedOption: PropTypes.string.isRequired,

  className: PropTypes.string,
  disabled: PropTypes.bool,
  small: PropTypes.bool,
  openUp: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onSelectOption: PropTypes.func,
};

Dropdown.defaultProps = {
  className: '',
  disabled: false,
  small: false,
  openUp: false,
  onOpen: () => {},
  onClose: () => {},
  onSelectOption: () => {},
};
