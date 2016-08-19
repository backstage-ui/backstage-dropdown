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
});
