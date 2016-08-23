'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _option = require('./option');

var _option2 = _interopRequireDefault(_option);

var _dropdown = require('./dropdown.css');

var _dropdown2 = _interopRequireDefault(_dropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dropdown = function (_Component) {
  _inherits(Dropdown, _Component);

  function Dropdown(props) {
    _classCallCheck(this, Dropdown);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Dropdown).call(this, props));

    _this.state = { value: props.value, dropdown: false, hover: false };
    _this.onClick = _this.onClick.bind(_this);
    _this.optionChange = _this.optionChange.bind(_this);
    _this.mouseOver = _this.mouseOver.bind(_this);
    _this.mouseOut = _this.mouseOut.bind(_this);
    _this.handleDocumentClick = _this.handleDocumentClick.bind(_this);
    return _this;
  }

  _createClass(Dropdown, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('click', this.handleDocumentClick, false);
      document.addEventListener('touchend', this.handleDocumentClick, false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('click', this.handleDocumentClick, false);
      document.removeEventListener('touchend', this.handleDocumentClick, false);
    }
  }, {
    key: 'onClick',
    value: function onClick() {
      var dropdown = this.state.dropdown;
      this.setState({ dropdown: !dropdown, hover: false });
    }
  }, {
    key: 'mouseOver',
    value: function mouseOver() {
      this.setState({ hover: true });
    }
  }, {
    key: 'mouseOut',
    value: function mouseOut() {
      this.setState({ hover: false });
    }
  }, {
    key: 'optionChange',
    value: function optionChange(value) {
      this.setState({ value: value });
      this.props.onChange();
    }
  }, {
    key: 'handleDocumentClick',
    value: function handleDocumentClick() {
      if (!_reactDom2.default.findDOMNode(this).contains(event.target)) {
        this.setState({ dropdown: false });
      }
    }
  }, {
    key: 'renderOptions',
    value: function renderOptions() {
      var _this2 = this;

      var options = this.props.options.map(function (option) {
        var selected = option === _this2.state.value;
        var opt = _react2.default.createElement(_option2.default, {
          key: option,
          selected: selected,
          value: option,
          onChange: _this2.optionChange
        });
        return opt;
      });
      var optionsContainer = void 0;
      if (options.length > 0) {
        optionsContainer = _react2.default.createElement(
          'div',
          { className: 'dropdown-options', style: _dropdown2.default.options },
          options
        );
      }
      return optionsContainer;
    }
  }, {
    key: 'render',
    value: function render() {
      var dropdownStyle = _dropdown2.default.dropdown;
      var arrowStyle = _dropdown2.default.arrow;
      var placeholderStyle = _dropdown2.default.placeholder;
      var containerStyle = Object.assign({}, _dropdown2.default.container, this.props.style);

      if (this.state.hover) {
        dropdownStyle = Object.assign({}, dropdownStyle, _dropdown2.default.dropdownHover);
        arrowStyle = Object.assign({}, arrowStyle, _dropdown2.default.arrowHover);
      }

      var selected = this.props.value !== this.state.value;

      if (selected && !this.state.hover) {
        arrowStyle = Object.assign({}, arrowStyle, _dropdown2.default.arrowSelected);
        placeholderStyle = Object.assign({}, placeholderStyle, _dropdown2.default.placeholderSelected);
      }
      return _react2.default.createElement(
        'div',
        {
          className: this.props.className,
          onClick: this.onClick,
          style: containerStyle,
          onMouseOver: this.mouseOver,
          onMouseOut: this.mouseOut
        },
        _react2.default.createElement('input', {
          type: 'hidden',
          name: this.props.name,
          id: 'backstage-dropdown',
          value: this.state.value
        }),
        _react2.default.createElement(
          'div',
          { style: dropdownStyle },
          _react2.default.createElement(
            'div',
            { className: 'dropdown-placeholder', style: placeholderStyle },
            this.state.value.length > 0 ? this.state.value : this.props.placeholder
          ),
          _react2.default.createElement('span', { className: 'dropdown-arrow', style: arrowStyle })
        ),
        this.state.dropdown ? this.renderOptions() : _react2.default.createElement('div', null)
      );
    }
  }]);

  return Dropdown;
}(_react.Component);

exports.default = Dropdown;


Dropdown.propTypes = {
  className: _react2.default.PropTypes.string,
  label: _react2.default.PropTypes.string,
  placeholder: _react2.default.PropTypes.string,
  value: _react2.default.PropTypes.string,
  name: _react2.default.PropTypes.string,
  options: _react2.default.PropTypes.array,
  onChange: _react2.default.PropTypes.func,
  style: _react2.default.PropTypes.object
};

Dropdown.defaultProps = {
  label: '',
  placeholder: '',
  value: '',
  name: '',
  options: [],
  onChange: function onChange() {},
  style: {}
};