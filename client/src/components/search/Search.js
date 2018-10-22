import React from 'react';
import {withRouter} from 'react-router-dom';
import store from '../../store';

import { _searchMovie, _clearSearch } from '../../actions/Search';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';
import BackButton from '../../common/backButton/BackButton';
import './search.css';

const fadeInAnimation = keyframes`${fadeIn}`;

const SearchDiv = styled.div`
  padding-top: 60px;
  animation: .5s ${fadeInAnimation};
  `;

const SearchFormContainer = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 850px;
  background: #fff;
`;

class Search extends React.Component {

  componentDidMount() {
    this.searchInput.focus();
  }

  handleChange = () => {
    this.searchMovie();
  }

  searchMovie = () => {
    if (this.searchInput.value.length > 1) {
    fetch(`/api/search/${this.searchInput.value}`)
      .then(res => res.json())
      .then((data) => {
        store.dispatch(_searchMovie(data.results))
      })
    } else if (this.searchInput.value.length < 1) {
        store.dispatch(_searchMovie([]));
    }
  }

  clearSearch = () => {
    console.log('party')
    store.dispatch( _clearSearch() )
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.searchInput.blur();
  }

  formatReleaseYear = (year) => {
    if (year) {
      let formatYear = year.slice(0,4)
      return(
        <p className="search__release">{formatYear}</p>
      );
    }
  }


  render() {
    const {history} = this.props;

    return(
      <React.Fragment>

        <BackButton clearSearch={this.clearSearch}/>

        <SearchDiv>

        <SearchFormContainer>
          <form
            onSubmit={this.handleSubmit}
            className="search__form"
            ref={(form) => this.searchForm = form}
            >
            <input
              className="search__input"
              onChange={this.handleChange}
              ref={(input) => this.searchInput = input}
              placeholder="Search by Movie Title"
              />
          </form>
        </SearchFormContainer>

        <div className="search__results-container">
          {store.getState().search.results.map((movie) => (
            <div className="search__movie" key={movie.id} onClick={() => history.push(`/movie/${movie.id}`)}>
                <div className="search__image-container">
                  <img className="search__image-poster" src={'https://image.tmdb.org/t/p/w200/' +  movie.poster_path} alt="movie poster"/>
                </div>
                <div className="search__movie-details">
                  <p className="search__title">{movie.title}</p>
                  {this.formatReleaseYear(movie.release_date)}
                </div>
            </div>
          ))}
        </div>

      </SearchDiv>

    </React.Fragment>
    );
  }
}

export default withRouter(Search);
