import React from 'react';
import {withRouter} from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import anime from 'animejs';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ParticleEffectButton from 'react-particle-effect-button';
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

const CastDetails = styled.div`
  display: flex;
  overflow: hidden;
  height: 100px;
  width: 100%;
  margin-bottom: 1em;
  border-radius: 10px;
  background: black;
  box-shadow: 0 4px 6px rgba(51,51,51,.3),
              0 1px 3px rgba(51,51,51, .5);
`;


class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      hidden: false,
      movie: [],
      youTubeVid: '',
      pageUrl: '',
      cast: []
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
          let cast = data.credits.cast.slice(0,5);
          console.log(cast);

          this.setState({
            movie: data,
            youTubeVid: `https://www.youtube.com/embed/${data.videos.results[0].key}?&theme=dark&autohide=2&showinfo=0`,
            pageUrl: window.location.href,
            cast: cast,
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

  disappear = () => {
    this.setState({
      hidden: true
    })
    this.animateCopiedTrue()
  }

  render() {
    const {loading, movie, youTubeVid, cast} = this.state;
    const {history} = this.props;

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
          <p className="details__release-date">Release Date: {movie.release_date}</p>
          <Stars rating={movie.vote_average}/>
          <p className="details__overview">{movie.overview}</p>

          <div className="url-copy-container">
            <ParticleEffectButton
              color='red'
              hidden={this.state.hidden}
              >
            <CopyToClipboard
              text={this.state.pageUrl}
              onCopy={this.disappear}
              >
              <div
              className="url-copy-button full-flex"
              ref={el => this.copyButton = el}
              >
                <p
                ref={el => this.copyButtonText = el}
                >Copy Url</p>

              </div>
            </CopyToClipboard>
            </ParticleEffectButton>
            <div
              className="copy-checkmark full-flex"
              ref={el => this.checkMark = el}
              >
              <p><span>&#x2713;</span> copied</p>
            </div>
          </div>

          <div>
            {cast.map((actor) => (
              <CastDetails key={actor.id} onClick={() => history.push(`/person/${actor.id}`)} >
                <div className="profile-container">
                  <img src={'https://image.tmdb.org/t/p/w185/' + actor.profile_path} alt={actor.name}/>
                </div>
                <div className="profile-details">
                  <p className="actor-name">{actor.name}</p>
                  <p>as</p>
                  <p className="actor-character">{actor.character}</p>
                </div>
              </CastDetails>
            ))}

          </div>


        </div>


        <PoweredBy />

      </DetailsDiv>

      </div>
    );
  }


  animateCopiedTrue() {
    const { checkMark } = this;
    anime({
      targets: checkMark,
      opacity: [0,1],
      delay: 1000,
      duration: 1000
    })
  }

}

export default withRouter(Details);
