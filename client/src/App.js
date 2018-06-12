import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from './components/home/Home';
import Search from './components/search/Search';
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

        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/movie/:id" component={Detail} />
          </Switch>
        </BrowserRouter>

        <PoweredBy />
      </div>
    );
  }
}

export default App;
