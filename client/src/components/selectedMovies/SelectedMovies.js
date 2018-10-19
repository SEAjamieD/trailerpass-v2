import React from 'react';
import styled from 'styled-components';

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
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
`

class SelectedMovies extends React.Component {

  render() {
    const { history, selectedCategory, selectedMovies, selectedMoviesRow2 } = this.props;

    return (
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
    );
  }
}

export default SelectedMovies;
