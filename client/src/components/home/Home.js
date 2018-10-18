import React from 'react';
import {withRouter} from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Slider from 'react-slick';
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

const SelectedMoviesContainer = styled.div`
  position: relative;
`;

const FadeOverlay = styled.div`
  position: absolute;
  z-index: 10;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 20%;
  pointer-events: none;
  background: linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);
`

const MovieScrollDiv = styled.div`
  width: 100%;
  padding-bottom: 30px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
`

const categories = ['Trending','In Theaters', 'Comedy', 'Action',];


class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      selectedCategory: 'trending',
      selectedMovies: [],
      selectedMoviesRow2: [],
      randomMovies: [],
      isActive: 0
    }
  }

  componentDidMount() {
    this.fetchPopularMovies();
  }

  fetchPopularMovies = () => {
    this.setState({loading: true})
    fetch('/api/trending-movies')
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        let randomIndex = Math.floor(Math.random() * 10);
        let selectedMovies = data.results.slice(0,10);
        let selectedMoviesRow2 = data.results.slice(11,20);
        let randomMovies = data.results.slice(13,16);

        this.setState({
          selectedMovies,
          selectedMoviesRow2,
          randomMovies,
          loading: false,
        })
      })
  }

  fetchNewSet = (category, i) => {
    fetch(`/api/${category.replace(/\s+/g, '-').toLowerCase()}-movies`)
      .then(res => res.json())
      .then((data) => {
        let isActive = i;
        let selectedCategory = category;
        let selectedMovies = data.results.slice(0,10);
        let selectedMoviesRow2 = data.results.slice(11,20);
        this.setState({
          isActive,
          selectedCategory,
          selectedMovies,
          selectedMoviesRow2
        })
      })
  }


  render() {
    const { loading, selectedMovies, randomMovies, selectedMoviesRow2, selectedCategory, isActive} = this.state;
    const {history} = this.props;

    const sliderSettings = {
      dots: false,
      arrows: false,
      centerMode: true,
      swipeToSlide: true,
      infinite: false,
      initialSlide: 1,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    if (loading === true) {
      return (
        <Loader />
      );
    }

    return (
      <HomeDiv>

        { randomMovies &&
        <Slider {...sliderSettings}>
          {randomMovies.map((randomMovie, i) => (
            <div key={i} className="hero-container" onClick={() => history.push(`/movie/${randomMovie.id}`)}>
              <h2 className="list__random-title text-shadow-dark">{randomMovie.title}</h2>
              <img className="list__random-image deep-box-shadow" src={'https://image.tmdb.org/t/p/w500/' + randomMovie.backdrop_path} alt="movie backdrop"/>
            </div>
          ))}
        </Slider>
      }




      <CategorySelector categories={categories} fetchNewSet={this.fetchNewSet} isActive={isActive} />

      <SelectedMoviesContainer>
        <FadeOverlay />
        <h2 className="list__section-title text-shadow">{selectedCategory}</h2>
          <div className="movie-list-container">
            <MovieScrollDiv>
              <div className="list__slider-container">
                {selectedMovies.map((movie) => (
                  <div key={movie.id} className="list__image-poster" onClick={() => history.push(`/movie/${movie.id}`)}>
                      <img className="deep-box-shadow" src={'https://image.tmdb.org/t/p/w200/' +  movie.poster_path} alt="movie poster"/>
                  </div>
                ))}
              </div>
            </MovieScrollDiv>
          </div>

        <div className="movie-list-container mlc2">
          <MovieScrollDiv>
            <div className="list__slider-container">
              {selectedMoviesRow2.map((movie) => (
                <div key={movie.id} className="list__image-poster" onClick={() => history.push(`/movie/${movie.id}`)}>
                    <img className="deep-box-shadow" src={'https://image.tmdb.org/t/p/w200/' +  movie.poster_path} alt="movie poster"/>
                </div>
              ))}
            </div>
          </MovieScrollDiv>
        </div>
      </SelectedMoviesContainer>

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
