import React from 'react';
import styled, { keyframes } from 'styled-components';
import anime from 'animejs';
import { fadeIn } from 'react-animations';
import Youtube from '../youtube/Youtube';
import Stars from '../stars/Stars';
import BackButton from '../../common/backButton/BackButton';
import Loader from '../../common/loader/Loader';
import PoweredBy from '../../common/poweredBy/PoweredBy';
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
      youTubeVid: '',
      pageUrl: '',
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
            youTubeVid: `https://www.youtube.com/embed/${data.videos.results[0].key}?&theme=dark&autohide=2&showinfo=0`,
            pageUrl: window.location.href,
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

  copyUrl = () => {
    this.urlInput.select();
    document.execCommand('copy');

  }

  render() {
    const {loading, movie, youTubeVid} = this.state;

    if (loading === true) {
      return (
        <Loader />
      );
    }

    return (
      <div>

      <BackButton />

      <Youtube
        youTubeVid={youTubeVid}
        movieTitle={movie.original_title} />

      <DetailsDiv>
        <div className="details__lower-info">
          <h1 className="details__title">{movie.original_title}</h1>
          <p className="details__release-date">Released: {movie.release_date}</p>
          <Stars rating={movie.vote_average}/>
          <p className="details__overview">{movie.overview}</p>

          <div className="url-copy-container" onClick={this.copyUrl}>
            <div className="url-copy-button full-flex">
              <input id="page-url"
              ref={el => this.urlInput = el}
              defaultValue={this.state.pageUrl}
              />
              <p>Share Url</p>
            </div>
          </div>
        </div>


        <PoweredBy />

      </DetailsDiv>

      </div>
    );
  }
}

export default Details;
