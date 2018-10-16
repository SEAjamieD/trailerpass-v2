import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from './components/home/Home';
import Search from './components/search/Search';
import Detail from './components/detail/Detail';
import Person from './components/person/Person';
import './App.css';

class App extends Component {

  render() {

    return (
      <div className="app">

        <div className="header full-flex stripe-box-shadow">
          <h1 className="text-shadow-dark">trailerPass</h1>
        </div>

        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/movie/:id" component={Detail} />
            <Route exact path="/person/:person_id" component={Person} />
          </Switch>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;
