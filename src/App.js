import React, { Component } from 'react';
import './css/App.css';

import ModalOne from './Modals/ModalOne';
import ModalTwo from './Modals/ModalTwo';
import ModalThree from './Modals/ModalThree';
import ModalFour from './Modals/ModalFour';
import ModalFive from './Modals/ModalFive';
import ModalSix from './Modals/ModalSix';

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
        return <ModalOne zoomHandle={this.switchViewHandle} viewChild="2"/>

      case "2":
        return <ModalTwo zoomHandle={this.switchViewHandle} viewChild="3" viewParent="1"/>

      case "3":
        return <ModalThree zoomHandle={this.switchViewHandle} viewChild="4" viewParent="2"/>

      case "4":
        return <ModalFour zoomHandle={this.switchViewHandle} viewChild="5" viewParent="3"/>

      case "5":
        return <ModalFive zoomHandle={this.switchViewHandle} viewChild="6" viewParent="4"/>

      case "6":
        return <ModalSix zoomHandle={this.switchViewHandle} viewParent="4"/>

      default:
        return <ModalOne zoomHandle={this.switchViewHandle} viewChild="2"/>
    }
  }

  render() {
    return (
      <div className="App">
        <ModalOne />
      </div>
    );
  }

}

export default App;
