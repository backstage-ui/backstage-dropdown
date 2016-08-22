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

  it('should enable/disable drodpwn', () => {
    const wrapper = mount(<Dropdown />);

    expect(wrapper.state('dropdown')).toBe(false);

    wrapper.simulate('click');
    expect(wrapper.state('dropdown')).toBe(true);

    wrapper.simulate('click');
    expect(wrapper.state('dropdown')).toBe(false);
  });

  it('should have options', () => {
    const wrapper = mount(<Dropdown options={['1', '2', '3']} />);

    let options = wrapper.find(Option);
    expect(options.length).toBe(0);

    wrapper.simulate('click');
    options = wrapper.find(Option);
    expect(options.length).toBe(3);

    wrapper.simulate('click');
    options = wrapper.find(Option);
    expect(options.length).toBe(0);
  });

  it('should change placeholder on selection', () => {
    const wrapper = mount(<Dropdown options={['1', '2', '3']} />);
    wrapper.simulate('click');

    const option = wrapper.find(Option).first();
    option.simulate('click');

    const placeholder = wrapper.find('.dropdown-placeholder');
    expect(placeholder.text()).toBe('1');
  });

  it('should change value on selection', () => {
    const wrapper = mount(<Dropdown options={['1', '2', '3']} />);
    wrapper.simulate('click');

    const option = wrapper.find(Option).first();
    option.simulate('click');

    const input = wrapper.find('input');
    expect(input.prop('value')).toBe('1');
  });

  it('should support selection', () => {
    const wrapper = mount(<Dropdown options={['1', '2', '3']} />);
    wrapper.simulate('click');

    let option = wrapper.find(Option).first();
    expect(option.prop('selected')).toBe(false);

    option.simulate('click');

    wrapper.simulate('click');
    option = wrapper.find(Option).first();
    expect(option.prop('selected')).toBe(true);
  });
});
