import React, { Component } from 'react';
import './css/App.css';

import Header from './Partials/Header';
import CompanyModal from './Modals/CompanyModal';
import DivisionModal from './Modals/DivisionModal';
import TeamModal from './Modals/TeamModal';
import DeveloperModal from './Modals/DeveloperModal';
import ApiModal from './Modals/ApiModal';

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
        return <CompanyModal zoomHandle={this.switchViewHandle} viewChild="2"/>

      case "2":
        return <DivisionModal zoomHandle={this.switchViewHandle} viewChild="3" viewParent="1"/>

      case "3":
        return <TeamModal zoomHandle={this.switchViewHandle} viewChild="4" viewParent="2"/>

      case "4":
        return <DeveloperModal zoomHandle={this.switchViewHandle} viewChild="5" viewParent="3"/>

      case "5":
        return <ApiModal zoomHandle={this.switchViewHandle} viewParent="4"/>

      default:
        return <CompanyModal zoomHandle={this.switchViewHandle} viewChild="2"/>
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        { this.renderSwitch(this.state.modalView)}
      </div>
    );
  }
}

export default App;
