import React, { Component } from 'react';

import ModalOne from './Modals/ModalOne';
import ModalTwo from './Modals/ModalTwo';
import ModalThree from './Modals/ModalThree';
import ModalFour from './Modals/ModalFour';
import ModalFive from './Modals/ModalFive';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalView : "1"
    };
    this.switchViewHandle = this.switchViewHandle.bind(this);
  }

  switchViewHandle(viewId) {
    this.setState({
      modalView : viewId
    });
  }

  renderSwitch = (param) => {
    switch(param){
      case "1":
        return <ModalOne click={this.switchViewHandle} viewChild="2" />

      case "2":
        return <ModalTwo click={this.switchViewHandle} viewChild="3" viewParent="1"/>

      case "3":
        return <ModalThree click={this.switchViewHandle} viewChild="4" viewParent="2"/>

      case "4":
        return <ModalFour click={this.switchViewHandle} viewChild="5" viewParent="3"/>

      case "5":
        return <ModalFive click={this.switchViewHandle} viewParent="4"/>

      default:
        return <ModalOne click={this.switchViewHandle} viewChild="2"/>
    }
  }

  render() {
    return (
      <div className="App">
        { this.renderSwitch(this.state.modalView)}
      </div>
    );
  }
}

export default App;
