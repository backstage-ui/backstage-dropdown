/* global describe, it, expect */
import React from 'react';
import { shallow } from 'enzyme';
import Dropdown from '../dropdown';

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
});
