/* global describe, it, expect */
import React from 'react';
import { shallow, mount } from 'enzyme';
import Option from '../option';

describe('<Option />', () => {
  it('selected should contain expected className', () => {
    const wrapper = shallow(<Option selected={true} />);
    expect(wrapper.prop('className')).toContain('bs-ui-dropdown__list-item--selected');
  });

  it('should call onSelect with expect data', (done) => {
    const data = {
      label: 'Teste',
      value: 'teste'
    };

    const onSelect = function (responseData) {
      expect(responseData).toEqual(data);
      done();
    }

    const wrapper = mount(<Option label={data.label} value={data.value} onSelect={(data) => onSelect(data)} />);
    wrapper.simulate('click');
  });
});
