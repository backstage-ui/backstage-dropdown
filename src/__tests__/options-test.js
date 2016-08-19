/* global describe, it, expect */
import React from 'react';
import { mount } from 'enzyme';
import Option from '../option';

describe('<Option />', () => {
  it('should has hover state', () => {
    const option = mount(<Option value="1" />);

    expect(option.state('hover')).toBe(false);
  });
});
