'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  container: {
    display: 'inline-block',
    height: '32px',
    cursor: 'default'
  },
  placeholder: {
    height: '16px',
    fontFamily: 'Open Sans',
    fontSize: '14px',
    lineHeight: 1.1,
    color: '#999',
    padding: '6px 0 0 16px'
  },
  placeholderSelected: {
    color: '#333'
  },
  dropdown: {
    width: '255px',
    height: '32px',
    borderRadius: '4px',
    backgroundColor: '#fff',
    border: 'solid 2px #ccc',
    position: 'relative'
  },
  dropdownHover: {
    border: 'solid 2px #999'
  },
  options: {
    width: '255px',
    borderRadius: '2px',
    backgroundColor: '#fff',
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.4)',
    zIndex: 1000,
    position: 'absolute',
    marginTop: '-32px'
  },
  option: {
    fontFamily: 'Open Sans',
    fontSize: '14px',
    lineHeight: 1.1,
    backgroundColor: '#fff',
    height: '36px',
    padding: '10px 0 10px 16px',
    color: '#999'
  },
  optionHover: {
    backgroundColor: '#0769de',
    color: '#fff'
  },
  optionSelected: {
    color: '#333'
  },
  arrow: {
    borderColor: '#ccc transparent transparent',
    borderStyle: 'solid',
    borderWidth: '5px 5px 0',
    content: 'x',
    display: 'block',
    height: 0,
    position: 'absolute',
    right: '13px',
    top: '12px',
    width: 0
  },
  arrowHover: {
    borderColor: '#999 transparent transparent'
  },
  arrowSelected: {
    borderColor: '#333 transparent transparent'
  }
};