/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Option extends PureComponent {
  render() {
    const optionClassNames = classNames({
      'bs-ui-options__item': true,
      'bs-ui-options__item--selected': this.props.selected,
    });

    return (
      <div className={optionClassNames} onClick={this.props.onSelect}>
        {this.props.label}
      </div>
    );
  }
}

Option.propTypes = {
  label: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

Option.defaultProps = {
  label: '',
  onSelect: () => {},
  selected: false,
};
