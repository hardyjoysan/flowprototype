import React, { Component } from 'react';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isPasswordPage : false
    };

    this.enablePasswordPage  = this.enablePasswordPage.bind(this);
  }

  enablePasswordPage() {
    this.setState({
      isPasswordPage : true
    });
  }

  showPasswordPage() {
    this.setState({showPassword: true });
  }

  render() {

    const Circle1 = (
      <svg height="300" width="300" onClick={this.enablePasswordPage}>
        <circle cx="150" cy="150" r="145" stroke="black" strokeWidth="5" fill="#fff" />
      </svg>
    );

    const Circle2 = (
      <svg height="300" width="300">
        <circle cx="150" cy="150" r="145" stroke="black" strokeWidth="5" fill="red" />
      </svg>
    );

    return (
      <div className="App">
        { this.state.isPasswordPage ? Circle2 : Circle1 }
      </div>
    );

  }
}

export default App;
