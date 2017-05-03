/* global describe, it, expect, beforeEach, afterEach, jest */
/* eslint func-names: ["off"], react/prop-types: ["off"] */

import React, { Component } from 'react';

import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import Option from '../option';

describe('Option', function () {
  it('selected should contain expected className', function () {
    const wrapper = shallow(<Option selected />);
    expect(wrapper.prop('className')).toContain('bs-ui-dropdown__list-item--selected');
  });

  it('should call onSelect with expect data', function () {
    const onSelect = jest.fn();
    const wrapper = shallow(<Option
      label="Test 2"
      onSelect={onSelect}
    />);
    wrapper.simulate('click');
    expect(onSelect).toBeCalled();
  });

  describe('should component update', function () {
    class FakeComponent extends Component {
      render() {
        return (
          <Option selected={this.props.selected} label="Maca" />
        );
      }
    }

    beforeEach(function () {
      this.renderStub = sinon.stub(Option.prototype, 'render').returns(null);
      this.wrapper = mount(<FakeComponent selected={false} />);
    });

    afterEach(function () {
      this.renderStub.restore();
    });

    it('should not rerender if props and state not change', function () {
      this.wrapper.setProps({ selected: false });
      this.wrapper.update();

      expect(this.renderStub.calledTwice).not.toBeTruthy();
    });

    it('should rerender if props and state change', function () {
      this.wrapper.setProps({ selected: true });
      this.wrapper.update();

      expect(this.renderStub.calledTwice).toBeTruthy();
    });
  });
});
