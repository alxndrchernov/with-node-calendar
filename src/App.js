import './App.css';

import React from 'react';

import LoginForm from "./LoginForm"
import Dashboard from "./Dashboard"

class App extends React.Component {
  state = {
    isLoggedIn: false,
  };

  handleLoginClick = (param) => {
    this.setState({ isLoggedIn: param })
  }

  render() {
    return (
      <div className="App">
        {this.state.isLoggedIn ? <div className="MainScreen">
          <Dashboard handleLoginClick={this.handleLoginClick} />
        </div> : <LoginForm handleLoginClick={this.handleLoginClick} />}
      </div>
    )
  }
}

export default App;
