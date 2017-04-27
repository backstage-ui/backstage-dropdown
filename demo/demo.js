/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import ReactDOM from "react-dom";

import Dropdown from '../src/dropdown';

const OPTIONS = [
  {value: "uva", label: "Uva"},
  {value: "maca", label: "Maçã"},
  {value: "manga", label: "Manga"},
  {value: "tangerina", label: "Tangerina"},
];

class Demo extends React.Component {
  constructor(){
    super();

    this.state = {
      isSmall: false,
      isDisabled: false,
      isOpenUp: false,
      selectedOption: {}
    };

    this.onSmallCheck = ::this.onSmallCheck;
    this.onDisableCheck = ::this.onDisableCheck;
    this.onOpenUpCheck = ::this.onOpenUpCheck;
    this.onSelectOption = ::this.onSelectOption;
  }

  onSmallCheck() {
    this.setState({isSmall: !this.state.isSmall});
  }

  onDisableCheck() {
    this.setState({isDisabled: !this.state.isDisabled});
  }

  onOpenUpCheck() {
    this.setState({isOpenUp: !this.state.isOpenUp});
  }

  onSelectOption(option) {
    this.setState({selectedOption: option});
  }

  render() {
    return (
      <div>
        <header className="heading"><h1>Backstage Dropdown Demo</h1></header>

        <div className="content">
          <div className="modes">
            <input name="small" type="checkbox" onChange={this.onSmallCheck} /> Small
            <input name="disable" type="checkbox" onChange={this.onDisableCheck} /> Disable
            <input name="open-up" type="checkbox" onChange={this.onOpenUpCheck} /> Open Up
          </div>

          <Dropdown className="dropdown"
            options={OPTIONS} small={this.state.isSmall}
            disabled={this.state.isDisabled} openUp={this.state.isOpenUp}
            onSelectOption={this.onSelectOption}
          />

          <p>Selected Option: { JSON.stringify(this.state.selectedOption) }</p>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById("container"));
