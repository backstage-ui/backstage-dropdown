/* global describe, it, expect, beforeEach, afterEach, jest */
/* eslint func-names: ["off"] */

import React from 'react';

import sinon from 'sinon';
import { shallow, mount } from 'enzyme';

import Dropdown from '../dropdown';
import Option from '../option';

describe('Dropdown', () => {
  let callbacks;

  const options = [
    { label: 'Label Teste', value: 'teste' },
    { label: 'Label Teste 2', value: 'teste 2' },
    { label: 'Label Teste 3', value: 'teste 3' },
  ];

  const defaultProps = {
    options,
    selectedOption: options[0].value,
  };

  beforeEach(() => {
    callbacks = [];
  });

  afterEach(() => {
    callbacks.forEach((callback) => {
      callback();
    });
  });

  const dispatchEvent = function (eventName, el) {
    const evt = document.createEvent('Event');
    evt.initEvent(eventName, true, true);
    el.dispatchEvent(evt);
  };

  it('should accept className', function () {
    const wrapper = shallow(<Dropdown {...defaultProps} className="foobar" />);
    expect(wrapper.hasClass('foobar')).toBe(true);
  });

  it('should have options', function () {
    const wrapper = shallow(<Dropdown {...defaultProps} />);

    wrapper.simulate('click');
    const renderedOptions = wrapper.find(Option);
    expect(renderedOptions.length).toBe(3);
  });

  it('should have selectedOption props as selected', function () {
    const wrapper = shallow(<Dropdown options={options} selectedOption={options[1].value} />);
    expect(wrapper.find('.bs-ui-dropdown__item').text()).toBe(options[1].label);
  });

  it('should pass selected to the selected Option', function () {
    const wrapper = shallow(<Dropdown {...defaultProps} />);
    const renderedOptions = wrapper.find(Option);

    expect(renderedOptions.first().prop('selected')).toBe(true);
    expect(renderedOptions.last().prop('selected')).toBe(false);
  });

  it('should accept options as Array of Strings', function () {
    const stringOptions = ['string 1', 'string 2'];
    const wrapper = shallow(<Dropdown options={stringOptions} selectedOption={stringOptions[0]} />);
    const renderedOptions = wrapper.find(Option);

    expect(renderedOptions.length).toBe(2);
    expect(renderedOptions.first().prop('value')).toEqual(stringOptions[0]);
    expect(renderedOptions.last().prop('value')).toEqual(stringOptions[1]);
  });

  describe('click', function () {
    beforeEach(function () {
      this.wrapper = mount(<Dropdown {...defaultProps} />);
    });

    it('should open dropdown', function () {
      expect(this.wrapper.hasClass('bs-ui-dropdown--open')).toBe(false);

      this.wrapper.simulate('click');
      expect(this.wrapper.update().hasClass('bs-ui-dropdown--open')).toBe(true);
    });

    it('out should close dropdown', function (done) {
      expect(this.wrapper.hasClass('bs-ui-dropdown--open')).toBe(false);

      this.wrapper.simulate('click');
      expect(this.wrapper.update().hasClass('bs-ui-dropdown--open')).toBe(true);

      const expectCallback = () => {
        expect(this.wrapper.update().hasClass('bs-ui-dropdown--open')).toBe(false);
        done();
      };

      document.addEventListener('click', expectCallback, false);
      callbacks.push(function () {
        document.removeEventListener('click', expectCallback, false);
      });

      dispatchEvent('click', document.body);
    });

    it('should remove document event listener if component is unmount', function () {
      const spyDocumentClick = sinon.stub(this.wrapper.instance(), 'handleDocumentClick').returns();

      this.wrapper.simulate('click');
      this.wrapper.unmount();
      document.body.click();

      expect(spyDocumentClick.called).toBe(false);
    });
  });

  describe('select option', function () {
    it('should close dropdown', function () {
      const wrapper = mount(<Dropdown {...defaultProps} />);
      wrapper.simulate('click');

      const option = wrapper.find(Option).first();
      option.simulate('click');
      expect(wrapper.update().hasClass('bs-ui-dropdown--open')).toBe(false);
    });

    it('should call onSelectOption callback whenever a option has been selected', function () {
      const onSelectOption = jest.fn();
      const wrapper = mount(<Dropdown {...defaultProps} onSelectOption={onSelectOption} />);
      const option = wrapper.find(Option).last();

      wrapper.simulate('click');
      option.simulate('click');
      expect(onSelectOption).toBeCalled();
      expect(onSelectOption).toBeCalledWith(options[options.length - 1]);
    });
  });

  describe('should call', function () {
    it('onOpen callback whenever the dropdown is opened', function () {
      const onOpen = jest.fn();
      const wrapper = shallow(<Dropdown {...defaultProps} onOpen={onOpen} />);

      wrapper.simulate('click');
      expect(onOpen).toBeCalled();
    });

    it('onClose callback whenever the dropdown is closed', function () {
      const onClose = jest.fn();
      const wrapper = mount(<Dropdown {...defaultProps} onClose={onClose} />);

      wrapper.simulate('click');
      dispatchEvent('click', document.body);
      expect(onClose).toBeCalled();
    });
  });

  describe('component update', function () {
    beforeEach(function () {
      this.renderStub = sinon.stub(Dropdown.prototype, 'render').returns(null);
      this.wrapper = mount(<Dropdown {...defaultProps} />);
    });

    afterEach(function () {
      this.renderStub.restore();
    });

    describe('should not rerender', function () {
      it('if props and state not change', function () {
        this.wrapper.update();
        expect(this.renderStub.calledTwice).toBe(false);
      });

      it('if openUp props change', function () {
        this.wrapper.setProps({
          ...this.wrapper.props,
          openUp: true,
        });
        expect(this.renderStub.calledTwice).toBe(false);
      });

      it('if onOpen props change', function () {
        this.wrapper.setProps({
          ...this.wrapper.props,
          onOpen: () => {},
        });
        expect(this.renderStub.calledTwice).toBe(false);
      });

      it('if onClose props change', function () {
        this.wrapper.setProps({
          ...this.wrapper.props,
          onClose: () => {},
        });
        expect(this.renderStub.calledTwice).toBe(false);
      });

      it('if onSelectOption props change', function () {
        this.wrapper.setProps({
          ...this.wrapper.props,
          onSelectOption: () => {},
        });
        expect(this.renderStub.calledTwice).toBe(false);
      });
    });

    describe('should rerender', function () {
      it('if options change', function () {
        this.wrapper.setProps({
          ...this.wrapper.props,
          options: [...options, { value: 'melao', label: 'Melao' }],
        });
        expect(this.renderStub.calledTwice).toBe(true);
      });

      it('if dropdown state change', function () {
        this.wrapper.setState({
          ...this.wrapper.state,
          dropdown: true,
        });
        expect(this.renderStub.calledTwice).toBe(true);
      });

      it('if small props change', function () {
        this.wrapper.setProps({
          ...this.wrapper.props,
          small: true,
        });
        expect(this.renderStub.calledTwice).toBe(true);
      });

      it('if disabled props change', function () {
        this.wrapper.setProps({
          ...this.wrapper.props,
          disabled: true,
        });
        expect(this.renderStub.calledTwice).toBe(true);
      });

      it('if className props change', function () {
        this.wrapper.setProps({
          ...this.wrapper.props,
          className: 'testClass',
        });
        expect(this.renderStub.calledTwice).toBe(true);
      });

      it('if selectedOption props change', function () {
        this.wrapper.setProps({
          ...this.wrapper.state,
          selectedOption: options[1].value,
        });
        expect(this.renderStub.calledTwice).toBe(true);
      });
    });
  });
});
