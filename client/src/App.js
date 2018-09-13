import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Helmet} from 'react-helmet';

import Home from './components/home/Home';
import Search from './components/search/Search';
import Detail from './components/detail/Detail';
import Person from './components/person/Person';
import './App.css';

class App extends Component {

  render() {

    return (
      <div className="app">

        <Helmet>
          <title>trailerPass</title>
          <meta property="og:title" content="trailerPass - Previews On Demand" />
          <meta property="og:image" content="../public/icon.png" />
        </Helmet>


        <div className="header full-flex">
          <h1>trailerPass</h1>
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
