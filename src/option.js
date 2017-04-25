/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import classNames from "classnames";

export default class Option extends Component {
  constructor(props) {
    super(props);

    this.onClick = ::this.onClick;
  }

  onClick() {
    this.props.onSelect({
      value: this.props.value,
      label: this.props.label
    });
  }

  render() {
    const optionClassNames = classNames({
      "bs-ui-dropdown__list-item": true,
      "bs-ui-dropdown__list-item--selected": this.props.selected
    });

    return (
      <li className={optionClassNames} onClick={this.onClick}>
        {this.props.label}
      </li>
    );
  }
}

Option.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  onSelect: PropTypes.func,
  selected: PropTypes.bool,
};

Option.defaultProps = {
  value: "",
  label: "",
  onSelect: () => {},
  selected: false,
};
