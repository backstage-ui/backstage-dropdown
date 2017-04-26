/* global describe, it, expect */
import React from 'react';
import { shallow, mount } from 'enzyme';

import Dropdown from '../dropdown';
import Option from '../option';

describe('<Dropdown />', function () {
  let callbacks;

  const options = [
    {label: "Label Teste", value: "teste"},
    {label: "Label Teste 2", value: "teste 2"},
    {label: "Label Teste 3", value: "teste 3"}
  ];

  beforeEach(function () {
    callbacks = [];
  });

  afterEach(function () {
    callbacks.forEach(function (callback, index, array) {
      callback();
    });
  });

  const dispatchEvent = function (eventName, el) {
    let evt = document.createEvent('Event');
    evt.initEvent(eventName, true, true);
    el.dispatchEvent(evt);
  }

  it('should accept className', function () {
    const wrapper = shallow(<Dropdown options={options} className="foobar" />);
    expect(wrapper.hasClass('foobar')).toBe(true);
  });

  it('should have options', function () {
    const wrapper = shallow(<Dropdown options={options} />);

    wrapper.simulate('click');
    const renderedOptions = wrapper.find(Option);
    expect(renderedOptions.length).toBe(3);
  });

  it('should accept options as Array of Strings', function () {
    const stringOptions = ['string 1', 'string 2'];
    const wrapper = shallow(<Dropdown options={stringOptions} />);
    const renderedOptions = wrapper.find(Option);

    expect(renderedOptions.length).toBe(2);
    expect(renderedOptions.first().prop('value')).toEqual(stringOptions[0]);
    expect(renderedOptions.last().prop('value')).toEqual(stringOptions[1]);
  });

  describe('click', function () {
    it('should open dropdown', function () {
      const wrapper = shallow(<Dropdown options={options} />);

      expect(wrapper.hasClass('bs-ui-dropdown--open')).toBe(false);

      wrapper.simulate('click');
      expect(wrapper.update().hasClass('bs-ui-dropdown--open')).toBe(true);
    });

    it('out should close dropdown', (done) => {
      const wrapper = mount(<Dropdown options={options} />);

      expect(wrapper.hasClass('bs-ui-dropdown--open')).toBe(false);

      wrapper.simulate('click');
      expect(wrapper.update().hasClass('bs-ui-dropdown--open')).toBe(true);

      const expectCallback = function () {
        expect(wrapper.update().hasClass('bs-ui-dropdown--open')).toBe(false);
        done();
      };

      document.addEventListener('click', expectCallback, false);
      callbacks.push(function () {
        document.removeEventListener('click', expectCallback, false);
      });

      dispatchEvent('click', document.body);
    });
  });

  describe('select option', function () {
    it('should close dropdown', function () {
      const wrapper = mount(<Dropdown options={options} />);
      wrapper.simulate('click');

      const option = wrapper.find(Option).first();
      option.simulate('click');
      expect(wrapper.update().hasClass('bs-ui-dropdown--open')).toBe(false);
    });

    it('should change selected option', function () {
      const wrapper = mount(<Dropdown options={options} />);
      wrapper.simulate('click');

      const option = wrapper.find(Option).last();
      option.simulate('click');

      const selectedOption = wrapper.find('.bs-ui-dropdown__item');
      expect(selectedOption.text()).toBe(options[options.length - 1].label);
    });

    it('should set selected state to the selected option', function () {
      const wrapper = mount(<Dropdown options={options} />);
      wrapper.simulate('click');

      const option = wrapper.find(Option).last();
      expect(option.props().selected).toBe(false);

      option.simulate('click');
      expect(option.prop('selected')).toBe(true);
    });
  });

  describe('should call', function () {
    it('onSelectOption callback whenever a option has been selected', function () {
      const onSelectOption = jest.fn();
      const wrapper = mount(<Dropdown options={options} onSelectOption={onSelectOption} />);
      const option = wrapper.find(Option).last();

      wrapper.simulate('click');
      option.simulate('click');
      expect(onSelectOption).toBeCalled();
      expect(onSelectOption).toBeCalledWith(options[options.length - 1]);
    });

    it('onOpen callback whenever the dropdown is opened', function () {
      const onOpen = jest.fn();
      const wrapper = shallow(<Dropdown options={options} onOpen={onOpen} />);

      wrapper.simulate('click');
      expect(onOpen).toBeCalled();
    });

    it('onClose callback whenever the dropdown is closed', function () {
      const onClose = jest.fn();
      const wrapper = mount(<Dropdown options={options} onClose={onClose} />);

      wrapper.simulate('click');
      dispatchEvent('click', document.body);
      expect(onClose).toBeCalled();
    });
  });
});
