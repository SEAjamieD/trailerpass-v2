import React from 'react';
import {withRouter} from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';
import Loader from '../../common/loader/Loader';
import HeroSlider from '../heroSlider/HeroSlider';
import SelectedMovies from '../selectedMovies/SelectedMovies';
import CategorySelector from '../categorySelector/CategorySelector';
import PoweredBy from '../../common/poweredBy/PoweredBy';
import Eyeglass from './eyeglass.svg';
import './home.css';


const fadeInAnimation = keyframes`${fadeIn}`;

const HomeDiv = styled.div`
  padding-top: 60px;
  animation: .5s ${fadeInAnimation};
  `;

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


    if (loading === true) {
      return (
        <Loader />
      );
    }

    return (
      <HomeDiv>

        <div className="search__button full-flex"
          onClick={() => history.push(`/search`)}>
          <img src={Eyeglass} alt="search icon" className="search__eyeglass" />
        </div>

        <HeroSlider history={history} randomMovies={randomMovies} />

        <CategorySelector categories={categories} fetchNewSet={this.fetchNewSet} isActive={isActive} />

        <SelectedMovies history={history} selectedCategory={selectedCategory} selectedMovies={selectedMovies} selectedMoviesRow2={selectedMoviesRow2} />

        <PoweredBy />

      </HomeDiv>
    );
  }

}

export default withRouter(Home);
