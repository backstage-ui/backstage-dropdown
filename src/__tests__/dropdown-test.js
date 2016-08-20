/* global describe, it, expect */
import React from 'react';
import { shallow, mount } from 'enzyme';
import Dropdown from '../dropdown';
import Option from '../option';

describe('<Dropdown />', () => {
  it('should accept className', () => {
    const wrapper = shallow(<Dropdown className="foobar" />);
    expect(wrapper.hasClass('foobar')).toBe(true);
  });

  it('should accept label', () => {
    const wrapper = shallow(<Dropdown label="my label" />);
    const label = wrapper.find('label');

    expect(label.text()).toBe('my label');
  });

  it('should accept placeholder', () => {
    const wrapper = shallow(<Dropdown placeholder="my placeholder" />);
    const placeholder = wrapper.find('.dropdown-placeholder');

    expect(placeholder.text()).toBe('my placeholder');
  });

  it('should has an arrow', () => {
    const wrapper = shallow(<Dropdown placeholder="my placeholder" />);
    const arrow = wrapper.find('.dropdown-arrow');

    expect(arrow.length).toBe(1);
  });

  it('should accept initial value', () => {
    const wrapper = shallow(<Dropdown value="my value" />);
    const input = wrapper.find('input');

    expect(input.prop('value')).toBe('my value');
  });

  it('should accept custom name', () => {
    const wrapper = shallow(<Dropdown name="my-dropdown" />);
    const input = wrapper.find('input');

    expect(input.prop('name')).toBe('my-dropdown');
  });

  it('should have options', () => {
    const wrapper = mount(<Dropdown options={['1', '2', '3']} />);
    const options = wrapper.find(Option);

    expect(options.length).toBe(3);
  });
});
