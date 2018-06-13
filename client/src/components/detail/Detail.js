import React from 'react';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';
import YouTube from 'react-youtube';
import Stars from '../stars/Stars';
import Loader from '../../common/loader/Loader';
import './detail.css';

const fadeInAnimation = keyframes`${fadeIn}`;

const DetailsDiv = styled.div`
  animation: .5s ${fadeInAnimation};
  `;

class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      movie: [],
      video: null
    }
  }

  componentDidMount() {
    this.fetchMovieDetails();
  }

  fetchMovieDetails = () => {
    const {match} = this.props;
    this.setState({loading: true})
    fetch(`/api/movie/${match.params.id}`)
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        if (data.videos.results[0]) {
          this.setState({
            movie: data,
            video: data.videos.results[0].key,
            loading: false
          })
        } else {
          this.setState({
            movie: data,
            video: null,
            loading: false
          })
        }
      })
  }


  render() {
    const {loading, movie, video} = this.state;

    const opts = {
          height: '300px',
          width: '100%',
          playerVars: { // https://developers.google.com/youtube/player_parameters
            autoplay: 0
          }
        };

    if (loading === true) {
      return (
        <Loader />
      );
    }

    return (
      <DetailsDiv>
        <div className="youtube-container">
          <YouTube
            opts={opts}
            videoId={video}
            />
        </div>
        <div className="details__lower-info">
          <h1 className="details__title">{movie.original_title}</h1>
          <p className="details__release-date">Released: {movie.release_date}</p>
          <Stars rating={movie.vote_average}/>
          <p className="details__overview">{movie.overview}</p>
        </div>
      </DetailsDiv>
    );
  }
}

export default Details;
