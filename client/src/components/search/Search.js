import React from 'react';
import {withRouter} from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';
import BackButton from '../../common/backButton/BackButton';
import './search.css';

const fadeInAnimation = keyframes`${fadeIn}`;

const SearchDiv = styled.div`
  padding-top: 60px;
  animation: .5s ${fadeInAnimation};
  `;

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      results: []
    }

  }

  componentDidMount() {
    this.searchInput.focus();
  }

  handleChange = () => {
    this.searchMovie();
  }

  searchMovie = () => {
    if (this.searchInput.value.length > 1) {
    this.setState({loading: true})
    fetch(`/api/search/${this.searchInput.value}`)
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          results: data.results,
          loading: false
        })
      })
    } else if (this.searchInput.value.length < 1) {
      this.setState({results: []})
    }
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
    const {results} = this.state;
    const {history} = this.props;

    return(
      <div>
      <BackButton />
      <SearchDiv>

        <div className="search__form-container">
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
        </div>

        <div className="search__results-container">
          {results.map((movie) => (
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

      </div>
    );
  }
}

export default withRouter(Search);
