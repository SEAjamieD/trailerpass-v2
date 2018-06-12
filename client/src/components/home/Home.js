import React from 'react';
import {withRouter} from 'react-router-dom';
import Loader from '../../common/loader/Loader';
import Eyeglass from './eyeglass.svg';
import './home.css';


class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      popularMovies: [],
      moreMovies: [],
      randomMovie: [],
      randomMovieBackDrop: ''
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
        let popularMovies = data.results.slice(0,10);
        let moreMovies = data.results.slice(11,20);
        let randomMovie = popularMovies[randomIndex];
        let randomMovieBackDrop = 'https://image.tmdb.org/t/p/w500/' + randomMovie.backdrop_path;
        this.setState({
          popularMovies,
          moreMovies,
          randomMovie,
          randomMovieBackDrop,
          loading: false
        })
      })
  }


  render() {
    const {loading, popularMovies, randomMovie, randomMovieBackDrop, moreMovies} = this.state;
    const {history} = this.props;

    if (loading === true) {
      return (
        <Loader />
      );
    }

    return (
      <div className="home">
        <div className="hero-container">
          <h2 className="list__random-title">{randomMovie.title}</h2>
          <img className="list__random-image" src={randomMovieBackDrop} alt="movie backdrop"/>
        </div>


        <div className="movie-list-popular">
        <h2 className="list__section-title">Popular Movies</h2>
          <div className="list__slider-container">
            {popularMovies.map((movie) => (
              <div key={movie.id} className="list__image-poster" onClick={() => history.push(`/movie/${movie.id}`)}>
                  <img src={'https://image.tmdb.org/t/p/w200/' +  movie.poster_path} alt="movie poster"/>
              </div>
            ))}
          </div>
        </div>

        <h2 className="list__section-title">Now Playing</h2>
        <div className="list__slider-container">
          {moreMovies.map((movie) => (
            <div key={movie.id} className="list__image-poster" onClick={() => history.push(`/movie/${movie.id}`)}>
                <img src={'https://image.tmdb.org/t/p/w200/' +  movie.poster_path} alt="movie poster"/>
            </div>
          ))}
        </div>

        <div className="search__button full-flex"
            onClick={() => history.push(`/search`)}>
            <img src={Eyeglass} alt="search icon" className="search__eyeglass" />
        </div>


      </div>
    );
  }

}

export default withRouter(Home);
