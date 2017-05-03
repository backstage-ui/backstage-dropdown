'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _option = require('./option');

var _option2 = _interopRequireDefault(_option);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2016, Globo.com (https://github.com/globocom)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * License: MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Dropdown = function (_Component) {
  _inherits(Dropdown, _Component);

  function Dropdown(props) {
    _classCallCheck(this, Dropdown);

    var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

    _this.state = {
      dropdown: false
    };

    _this.onClick = _this.onClick.bind(_this);
    _this.onSelectItem = _this.onSelectItem.bind(_this);
    _this.handleDocumentClick = _this.handleDocumentClick.bind(_this);
    return _this;
  }

  _createClass(Dropdown, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (this.state.dropdown !== nextState.dropdown) {
        if (nextState.dropdown) {
          this.handleOpenDropdown();
        } else {
          this.handleCloseDropdown();
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unbindDocumentClick();
    }
  }, {
    key: 'onClick',
    value: function onClick() {
      var dropdown = this.state.dropdown;
      this.setState({ dropdown: !dropdown });
    }
  }, {
    key: 'onSelectItem',
    value: function onSelectItem(selectedItem) {
      this.setState(_extends({}, this.state, {
        dropdown: false
      }));
      this.props.onSelectOption(selectedItem);
    }
  }, {
    key: 'handleOpenDropdown',
    value: function handleOpenDropdown() {
      this.props.onOpen();
      this.bindDocumentClick();
    }
  }, {
    key: 'handleCloseDropdown',
    value: function handleCloseDropdown() {
      this.props.onClose();
      this.unbindDocumentClick();
    }
  }, {
    key: 'bindDocumentClick',
    value: function bindDocumentClick() {
      document.addEventListener('click', this.handleDocumentClick, false);
      document.addEventListener('touchend', this.handleDocumentClick, false);
    }
  }, {
    key: 'unbindDocumentClick',
    value: function unbindDocumentClick() {
      document.removeEventListener('click', this.handleDocumentClick, false);
      document.removeEventListener('touchend', this.handleDocumentClick, false);
    }
  }, {
    key: 'handleDocumentClick',
    value: function handleDocumentClick(event) {
      if (!_reactDom2.default.findDOMNode(this).contains(event.target)) {
        this.props.onClose();
        this.setState(_extends({}, this.state, {
          dropdown: false
        }));
      }
    }
  }, {
    key: 'renderOptions',
    value: function renderOptions() {
      var _this2 = this;

      var options = this.props.options.map(function (option) {
        return _react2.default.createElement(_option2.default, {
          key: option.value,
          label: option.label,
          onSelect: function onSelect() {
            return _this2.onSelectItem(option);
          },
          selected: _this2.props.selectedOption === option.value
        });
      });
      return options;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var dropdownClassNames = (0, _classnames2.default)({
        'bs-ui-dropdown': true,
        'bs-ui-dropdown--open': this.state.dropdown,
        'bs-ui-dropdown--small': this.props.small,
        'bs-ui-dropdown--open-up': this.props.openUp,
        'bs-ui-dropdown--disabled': this.props.disabled
      }, this.props.className);
      var selectedItem = this.props.options.find(function (option) {
        return option.value === _this3.props.selectedOption;
      });

      return _react2.default.createElement(
        'div',
        {
          className: dropdownClassNames,
          onClick: function onClick() {
            return _this3.props.disabled || _this3.state.dropdown || _this3.onClick();
          }
        },
        _react2.default.createElement(
          'div',
          { className: 'bs-ui-dropdown__item' },
          selectedItem.label
        ),
        _react2.default.createElement(
          'ul',
          { className: 'bs-ui-dropdown__list' },
          this.renderOptions()
        )
      );
    }
  }]);

  return Dropdown;
}(_react.Component);

exports.default = Dropdown;


Dropdown.propTypes = {
  options: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    label: _propTypes2.default.string,
    value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
  })).isRequired,
  selectedOption: _propTypes2.default.string.isRequired,

  className: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  small: _propTypes2.default.bool,
  openUp: _propTypes2.default.bool,
  onOpen: _propTypes2.default.func,
  onClose: _propTypes2.default.func,
  onSelectOption: _propTypes2.default.func
};

Dropdown.defaultProps = {
  className: '',
  disabled: false,
  small: false,
  openUp: false,
  onOpen: function onOpen() {},
  onClose: function onClose() {},
  onSelectOption: function onSelectOption() {}
};