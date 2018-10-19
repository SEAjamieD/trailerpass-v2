import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import store from './store';
import { _initialMovieFetch } from './actions/Movies';

import Home from './components/home/Home';
import Search from './components/search/Search';
import Detail from './components/detail/Detail';
import Person from './components/person/Person';
import './App.css';

class App extends Component {

  componentWillMount() {
    this.initialMovieFetch();
  }

  initialMovieFetch = () => {
    fetch('/api/trending-movies')
      .then(res => res.json())
      .then((data) => {
        let isActive = 0;
        let selectedCategory = 'trending';
        let selectedMovies = data.results.slice(0,10);
        let selectedMoviesRow2 = data.results.slice(11,20);
        let randomMovies = data.results.slice(13,16);
        store.dispatch(_initialMovieFetch(isActive, selectedCategory, selectedMovies, selectedMoviesRow2, randomMovies))
      })
  }

  render() {

    return (
      <div className="app">

        <div className="header full-flex">
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
