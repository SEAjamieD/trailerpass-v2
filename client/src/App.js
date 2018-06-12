import React, { Component } from 'react';
import Home from './components/home/Home';
import Detail from './components/detail/Detail';
import PoweredBy from './common/poweredBy/PoweredBy';
import './App.css';

class App extends Component {

  render() {

    return (
      <div className="app">
        <div className="header full-flex">
          <h1>trailerPass</h1>
        </div>

        <Detail />

        <PoweredBy />
      </div>
    );
  }
}

export default App;
