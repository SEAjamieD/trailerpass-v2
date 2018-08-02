import React from 'react';
import styled, { keyframes } from 'styled-components';
import anime from 'animejs';
import {CopyToClipboard} from 'react-copy-to-clipboard';
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
    this.animateCopiedTrue()
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

          <div className="url-copy-container">
            <CopyToClipboard
              text={this.state.pageUrl}
              onCopy={this.copyUrl}
              >
              <div
              className="url-copy-button full-flex"
              ref={el => this.copyButton = el}
              >
                <p
                ref={el => this.copyButtonText = el}
                >Copy Url</p>
                <p
                className="copy-checkmark"
                ref={el => this.checkMark = el}
                >&#x2713;</p>
              </div>
            </CopyToClipboard>
          </div>

        </div>


        <PoweredBy />

      </DetailsDiv>

      </div>
    );
  }


  animateCopiedTrue() {
    const { copyButton, copyButtonText, checkMark } = this;
    anime({
      targets: copyButtonText,
      opacity: [1,0],
      duration: 50
    });
    anime({
      targets: copyButton,
      width: "50px",
      background: "#FF0000",
      borderRadius: "50%",
      duration: 1100
    })
    anime({
      targets: checkMark,
      opacity: [0,1],
      duragion: 1100
    })
  }
}

export default Details;
