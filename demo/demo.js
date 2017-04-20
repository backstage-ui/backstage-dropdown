/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import ReactDOM from "react-dom";

import Dropdown from '../src/dropdown';

class Demo extends React.Component {
  constructor(){
    super();
    this.state = {
      isOpen: true
    };

    this.onOpenClick = ::this.onOpenClick;
    this.onCloseRequest = ::this.onCloseRequest;
  }

  onOpenClick(e){
    e.preventDefault();
    this.setState({isOpen: true});
  }

  onCloseRequest(){
    this.setState({isOpen: false});
  }

  render() {
    return (
      <div>
        <header className="heading"><h1>Backstage Modal Demo</h1></header>

        <div className="content">
          <Dropdown options={['uva', 'maca', 'manga', 'tangerina']}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById("container"));
