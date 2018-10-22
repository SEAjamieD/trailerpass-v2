import React from 'react';
import {withRouter} from 'react-router-dom';

// import redux stuff
import store from '../../store';
import { _fetchNewSet } from '../../actions/Movies';

//import libraries
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

// import components
import Menu from '../menu/Menu';
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

  fetchNewSet = (category, i) => {
    let currentCategory = store.getState().movies.selectedCategory;
    if (category !== currentCategory) {
      fetch(`/api/${category.replace(/\s+/g, '-').toLowerCase()}-movies`)
      .then(res => res.json())
      .then((data) => {
        let isActive = i;
        let selectedCategory = category;
        let selectedMovies = data.results.slice(0,10);
        let selectedMoviesRow2 = data.results.slice(11,20);
        store.dispatch(_fetchNewSet(isActive, selectedCategory, selectedMovies, selectedMoviesRow2))
      })
    }
  }


  render() {
    const {history} = this.props;

    return (
      <HomeDiv>

        <Menu />

        <div className="search__button full-flex"
          onClick={() => history.push(`/search`)}>
          <img src={Eyeglass} alt="search icon" className="search__eyeglass" />
        </div>

        <HeroSlider history={history} randomMovies={store.getState().movies.randomMovies} />

        <CategorySelector
          fetchNewSet={this.fetchNewSet}
          categories={categories}
          isActive={store.getState().movies.isActive} />

        <SelectedMovies
          history={history}
          selectedCategory={store.getState().movies.selectedCategory}
          selectedMovies={store.getState().movies.selectedMovies}
          selectedMoviesRow2={store.getState().movies.selectedMoviesRow2} />

        <PoweredBy />

      </HomeDiv>
    );
  }

}

export default withRouter(Home);
