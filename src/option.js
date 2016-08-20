import React, { Component } from 'react';

export default class Option extends Component {
  constructor(props) {
    super(props);

    this.state = { hover: false };
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
  }

  mouseOver() {
    this.setState({ hover: true });
  }

  mouseOut() {
    this.setState({ hover: false });
  }

  render() {
    return (
      <div
        value={this.props.value}
        className="dropdown-option"
      >
        {this.props.value}
      </div>
    );
  }
}

Option.propTypes = {
  value: React.PropTypes.string,
};

Option.defaultProps = {
  value: '',
};
