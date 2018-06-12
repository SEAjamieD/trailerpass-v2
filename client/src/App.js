import React, { Component } from 'react';
import Home from './components/home/Home';
import './App.css';

class App extends Component {

  render() {

    return (
      <div className="app">
        <div className="header full-flex">
          <h1>trailerPass</h1>
        </div>

        <Home />

      </div>
    );
  }
}

export default App;
