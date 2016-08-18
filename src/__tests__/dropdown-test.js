/* global describe, it, expect */
import React from 'react';
import { shallow } from 'enzyme';
import Dropdown from '../dropdown';

describe('<Dropdown />', () => {
  it('should accept className', () => {
    const wrapper = shallow(<Dropdown className="foobar" />);
    expect(wrapper.hasClass('foobar')).toBe(true);
  });
});
