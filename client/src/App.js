import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import store from './store';
import { _initialMovieFetch } from './actions/Movies';
import styled from 'styled-components';
import Home from './components/home/Home';
import Search from './components/search/Search';
import Detail from './components/detail/Detail';
import Person from './components/person/Person';
import './App.css';


const HeaderDiv = styled.div`
  box-sizing:border-box;
  position: fixed;
  width: 100%;
  max-width: 850px;
  height: 60px;
  background: ${props => props.headerColor ? props.headerColor : '#fff' };
  color: ${props => props.headerText ? props.headerText : '#5439FF' };
  z-index: 500;
  h1 {
    margin-top: 15px;
    font-size: ${props => props.textSize ? props.textSize : '2.4em' };
    font-family: voltage, sans-serif;
    font-weight: 400;
    font-style: normal;
    text-align: center;
  }
`;

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

        <HeaderDiv
          headerColor={store.getState().styles.headerColor}
          headerText={store.getState().styles.headerText}
          textSize={store.getState().styles.textSize}
          >
          <h1 className="text-shadow-dark">trailerPass</h1>
        </HeaderDiv>



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
