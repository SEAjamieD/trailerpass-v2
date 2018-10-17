import React from 'react';
import {withRouter} from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';
import Loader from '../../common/loader/Loader';
import CategorySelector from '../categorySelector/CategorySelector';
import PoweredBy from '../../common/poweredBy/PoweredBy';
import Eyeglass from './eyeglass.svg';
import './home.css';


const fadeInAnimation = keyframes`${fadeIn}`;

const HomeDiv = styled.div`
  padding-top: 60px;
  animation: .5s ${fadeInAnimation};
  `;

const categories = ['Popular', 'Action', 'In Theaters'];


class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      selectedCategory: 'popular movies',
      selectedMovies: [],
      selectedMoviesRow2: [],
      randomMovie: [],
      randomMovieBackDrop: '',
    }
  }

  componentDidMount() {
    this.fetchPopularMovies();
  }

  fetchPopularMovies = () => {
    this.setState({loading: true})
    fetch('/api/popular-movies')
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        let randomIndex = Math.floor(Math.random() * 10);
        let selectedMovies = data.results.slice(0,10);
        let selectedMoviesRow2 = data.results.slice(11,20);
        let randomMovie = selectedMovies[randomIndex];
        let randomMovieBackDrop = 'https://image.tmdb.org/t/p/w500/' + randomMovie.backdrop_path;
        this.setState({
          selectedMovies,
          selectedMoviesRow2,
          randomMovie,
          randomMovieBackDrop,
          loading: false,
        })
      })
  }

  fetchNewSet = (category) => {
    fetch(`/api/${category}-movies`)
      .then(res => res.json())
      .then((data) => {
        let selectedCategory = category;
        let selectedMovies = data.results.slice(0,10);
        let selectedMoviesRow2 = data.results.slice(11,20);
        this.setState({
          selectedCategory,
          selectedMovies,
          selectedMoviesRow2
        })
      })
  }


  render() {
    const { loading, selectedMovies, randomMovie, randomMovieBackDrop, selectedMoviesRow2, selectedCategory} = this.state;
    const {history} = this.props;

    if (loading === true) {
      return (
        <Loader />
      );
    }

    return (
      <HomeDiv>
        <div className="hero-container" onClick={() => history.push(`/movie/${randomMovie.id}`)}>
          <h2 className="list__random-title text-shadow-dark">{randomMovie.title}</h2>
          <img className="list__random-image deep-box-shadow" src={randomMovieBackDrop} alt="movie backdrop"/>
        </div>

      <CategorySelector categories={categories} fetchNewSet={this.fetchNewSet} />

        <div className="movie-list-container">
          <div className="fade-overlay"></div>
        <h2 className="list__section-title text-shadow">{selectedCategory}</h2>
          <div className="list__slider-container">
            {selectedMovies.map((movie) => (
              <div key={movie.id} className="list__image-poster" onClick={() => history.push(`/movie/${movie.id}`)}>
                  <img className="deep-box-shadow" src={'https://image.tmdb.org/t/p/w200/' +  movie.poster_path} alt="movie poster"/>
              </div>
            ))}
          </div>
        </div>

      <div className="movie-list-container">
        <div className="fade-overlay"></div>
        <div className="list__slider-container">
          {selectedMoviesRow2.map((movie) => (
            <div key={movie.id} className="list__image-poster" onClick={() => history.push(`/movie/${movie.id}`)}>
                <img className="deep-box-shadow" src={'https://image.tmdb.org/t/p/w200/' +  movie.poster_path} alt="movie poster"/>
            </div>
          ))}
        </div>
      </div>

        <div className="search__button full-flex"
            onClick={() => history.push(`/search`)}>
            <img src={Eyeglass} alt="search icon" className="search__eyeglass" />
        </div>

        <PoweredBy />

      </HomeDiv>
    );
  }

}

export default withRouter(Home);
