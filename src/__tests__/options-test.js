/* global describe, it, expect */
import React from 'react';
import { mount, shallow } from 'enzyme';
import Option from '../option';

describe('<Option />', () => {
  it('should has hover state', () => {
    const option = mount(<Option />);

    expect(option.state('hover')).toBe(false);
  });

  it('should className be dropdown-option', () => {
    const wrapper = shallow(<Option />);
    expect(wrapper.hasClass('dropdown-option')).toBe(true);
  });
});
