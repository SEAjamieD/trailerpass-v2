import React from 'react';
import {withRouter} from 'react-router-dom';
import store from '../../store';
import { _setHeaderColor } from '../../actions/Styles';
import styled, { keyframes } from 'styled-components';
import anime from 'animejs';
import YouTube from 'react-youtube';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ParticleEffectButton from 'react-particle-effect-button';
import ShareIcon from './ShareButton';
import { fadeIn } from 'react-animations';
import Stars from '../stars/Stars';
import BackButton from '../../common/backButton/BackButton';
import Loader from '../../common/loader/Loader';
import PoweredBy from '../../common/poweredBy/PoweredBy';
import './detail.css';

const fadeInAnimation = keyframes`${fadeIn}`;

const DetailsDiv = styled.div`
  .details__lower-info {
    position: relative;
    width: 90%;
    margin: 40px auto 0;
    min-height: 30vh;
    color: #333;
  }
  .details__title {
    font-size: 1.3em;
    width: 60%;
    text-transform: uppercase
    color: #333;
    text-align: center;
    margin: 1em auto 0;
    padding: 12px 0;
  }
  .details__release-info {
    display: grid;
    height: 100%;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    margin: 0 auto;
    text-align: center;
    margin: 1em auto;
    grid-column-gap: 1em;
    grid-row-gap: 5px;
    text-transform: capitalize;
    font-size: .875em;
  }
  `;

const CastDetails = styled.div`
  display: flex;
  overflow: hidden;
  height: 100px;
  width: 100%;
  margin-bottom: 1em;
  background: #fff;
  box-shadow: 0 4px 6px rgba(50,50,93,.21),
              0 1px 3px rgba(0,0,0,.18);
`;

const HeroPoster = styled.div`
  background-image: ${props => `url(${props.backdrop})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 275px;
  border-radius: 0% 0% 60% 60% / 0% 0% 15% 15%;
  box-shadow: 0px 4px 45px -1px rgba(0,0,0,0.7);
`;

const PlayButtonDiv = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 50%;
  width: 75px;
  height: 75px;
  top: 230px;
  left: calc(50% - 37.5px);
  box-shadow: 0px 0px 45px -1px rgba(0,0,0,0.7);
  .play {
    width: 0;
    height: 0;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-left: 26px solid red;
    margin-left: 5px;
  }
`;

const YoutubeWrapper = styled.div`
  display: ${props => props.isHidden ? props.isHidden : 'none'}
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  background: black;
  animation: .7s ${fadeInAnimation};
  z-index: 9990;
`;

const CloseDiv = styled.div`
  position: absolute;
  z-index: 9999
  right: 10px;
  top: 10px;
  height: 50px;
  width: 50px;
  .x1 {
    margin-top: 45%;
    margin-left: 25%;
    width: 60%;
    height: 4px;
    background: #fff;
    transform: rotate(45deg);
  }
  .x2 {
    margin-top: -8%;
    margin-left: 25%;
    width: 60%;
    height: 4px;
    background: #fff;
    transform: rotate(-45deg);
  }
`;

const FadeIn = styled.div`
  animation: .5s ${fadeInAnimation};
`;


class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      hidden: false,
      isHidden: 'none',
      movie: [],
      country: '',
      releaseYear: '',
      pageUrl: '',
      cast: [],
      videoControl: null,
      reactYoutube: null,
      copied: false
    }
  }

  componentDidMount() {
    store.dispatch(_setHeaderColor('transparent', '#fff', '1.4em'));
    this.fetchMovieDetails();
  }

  componentWillUnmount() {
    store.dispatch(_setHeaderColor('#fff', '#5439FF', '2.4em'));
  }

  fetchMovieDetails = () => {
    const {match} = this.props;
    this.setState({loading: true})
    fetch(`/api/movie/${match.params.id}`)
      .then(res => res.json())
      .then((data) => {
        if (data.videos.results[0]) {
          let cast = data.credits.cast.slice(0,5);
          let country = data.production_countries.length > 0 ? data.production_countries[0].iso_3166_1 : 'unlisted';
          console.log(data);
          this.setState({
            movie: data,
            country: country,
            releaseYear: data.release_date.slice(0,4),
            reactYoutube: data.videos.results[0].key,
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

  onCopy = () => {
    this.setState({copied: true})
  }


  render() {
    const {loading, movie, cast, releaseYear, country, reactYoutube} = this.state;
    const {history} = this.props;

    const opts = {
      height: '500',
      width: '294',
      allowFullScreen: 'allowFullScreen',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        modestbranding: 1,
      }
    };

    const shareStyle = {
      position: 'absolute',
      right: '50px',
    }

    if (loading === true) {
      return (
        <React.Fragment>
          <BackButton />
          <Loader />
        </React.Fragment>
      );
    }



    return (
      <React.Fragment>

        <BackButton />

        <FadeIn>

          <HeroPoster backdrop={'https://image.tmdb.org/t/p/w1280/' + movie.backdrop_path}>
          </HeroPoster>

          <PlayButtonDiv
            onClick={this.playTrailer}
            >
            <div className="play"></div>
          </PlayButtonDiv>

          { reactYoutube &&
            <YoutubeWrapper isHidden={this.state.isHidden}>

              <CloseDiv
              onClick={this._onEnd}
              >
                <div className="x1"></div>
                <div className="x2"></div>
              </CloseDiv>

              <YouTube
                id="react-youtube"
                videoId={reactYoutube}
                className='youtube-player'
                opts={opts}
                onReady={this._onReady}
                onEnd={this._onEnd}
                />
            </YoutubeWrapper>
          }

          <div className="url-copy-container">
              <CopyToClipboard
                text={this.state.pageUrl}
                onCopy={this.onCopy}
                >
                <button>
                <ShareIcon
                  width='25px'
                  fill='black'
                  stroke='transparent'
                  style={shareStyle}
                  />
              </button>
              </CopyToClipboard>
          </div>

          <DetailsDiv>
            <div className="details__lower-info">
              <h1 className="details__title text-shadow-dark">{movie.original_title}</h1>
              <Stars rating={movie.vote_average}/>
              <div className="details__release-info">
                <p>year</p>
                <p>country</p>
                <p>runtime</p>
                <p className="bold">{releaseYear}</p>
                <p className="bold">{country}</p>
                <p className="bold">{movie.runtime} min</p>
              </div>
              <p className="details__overview">{movie.overview}</p>

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


          </DetailsDiv>

          </FadeIn>

          <PoweredBy />

      </React.Fragment>
    );
  }

  _onReady = (event) => {
  // access to player in all event handlers via event.target
    event.target.pauseVideo();
    this.setState({videoControl: event.target})  // store the videoplayer for access to later
  }

  _onEnd = (event) => {
    let exitFullscreen = document.exitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen || document.webkitExitFullscreen;
    if (exitFullscreen) {
      exitFullscreen.bind(document)();
    }
    this.setState({isHidden: 'none'})
  }

  playTrailer = () => {
    const { videoControl } = this.state;
    if ( videoControl ) {
      this.setState({isHidden: 'grid'})
      const tube = document.getElementById('react-youtube');
      let requestFullScreen = tube.requestFullScreen || tube.mozRequestFullScreen || tube.webkitRequestFullScreen;
       if (requestFullScreen) {
         requestFullScreen.bind(tube)();
       }
      videoControl.seekTo(0);
      videoControl.playVideo();
    }
  }


}

export default withRouter(Details);
