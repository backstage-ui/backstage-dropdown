/* global describe, it, expect */
import React from 'react';
import { shallow, mount } from 'enzyme';
import Dropdown from '../dropdown';
import Option from '../option';

describe('<Dropdown />', () => {
  const options = [
    {label: "Label Teste", value: "teste"}
  ];
  it('should accept className', () => {
    const wrapper = shallow(<Dropdown options={options} className="foobar" />);
    expect(wrapper.hasClass('foobar')).toBe(true);
  });

  it('click should enable dropdown', () => {
    const wrapper = mount(<Dropdown options={options} />);

    expect(wrapper.hasClass('bs-ui-dropdown--open')).toBe(false);

    wrapper.simulate('click');
    expect(wrapper.update().hasClass('bs-ui-dropdown--open')).toBe(true);

    wrapper.simulate('click');
    expect(wrapper.update().hasClass('bs-ui-dropdown--open')).toBe(false);
  });

  it('click out should disable dropdown', (done) => {
    const wrapper = mount(<Dropdown options={options} />);

    expect(wrapper.hasClass('bs-ui-dropdown--open')).toBe(false);

    wrapper.simulate('click');
    expect(wrapper.update().hasClass('bs-ui-dropdown--open')).toBe(true);

    document.body.addEventListener('click', function () {
      console.log('LAMEIRA');
      expect(wrapper.update().hasClass('bs-ui-dropdown--open')).toBe(false);
      console.log(wrapper);
      done();
    }, false);
    document.body.click();
  });


/*
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

  it('should support onChange', () => {
    let result;
    const wrapper = mount(<Dropdown options={['1']} onChange={() => { result = 'changed'; }} />);
    wrapper.simulate('click');

    const option = wrapper.find(Option).first();
    option.simulate('click');

    expect(result).toBe('changed');
  });*/
});
