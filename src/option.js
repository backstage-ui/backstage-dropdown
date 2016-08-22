import React, { Component } from 'react';

export default class Option extends Component {
  constructor(props) {
    super(props);

    this.state = { hover: false, selected: false };
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({ selected: true });
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
        onClick={this.onClick}
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
