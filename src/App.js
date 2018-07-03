import React, { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isModelOneView : false
    };
    this.switchViewHandle  = this.switchViewHandle.bind(this);
  }

  switchViewHandle() {
    this.setState({
      isModelOneView : true
    });
  }

  render() {
    const ModalOne = (
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800">
        <g onClick={this.switchViewHandle}>
          <ellipse ry="300" rx="300" cy="400" cx="400" stroke-width="5" stroke="#fff" fill="#555"></ellipse>
          <ellipse ry="80" rx="80" cy="400" cx="200" stroke-width="3" stroke="#fff" fill="#555"></ellipse>
          <ellipse ry="150" rx="150" cy="400" cx="500" stroke-width="3" stroke="#fff" fill="#555"></ellipse>
          <line id="svg_5" y2="400" x2="280" y1="400" x1="350" stroke-width="3" stroke="#fff"></line>
        </g>
      </svg>
    );

    const ModalTwo = (
      <svg height="300" width="300">
        <circle cx="150" cy="150" r="145" stroke="black" strokeWidth="5" fill="red" />
      </svg>
    );

    return (
      <div className="App">
        { this.state.isModelOneView ? ModalTwo : ModalOne }
      </div>
    );
  }
}

export default App;
