import React, { Component } from 'react';
import ModalOne from './Modals/ModalOne';
import ModalTwo from './Modals/ModalTwo';

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
    return (
      <div className="App">
        { this.state.isModelOneView ? <ModalTwo /> : <ModalOne click={this.switchViewHandle} /> }
      </div>
    );
  }
}

export default App;
