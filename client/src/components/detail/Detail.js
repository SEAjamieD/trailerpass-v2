import React from 'react';
import {withRouter} from 'react-router-dom';
import store from '../../store';
import { _setHeaderColor } from '../../actions/Styles';
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


class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      hidden: false,
      movie: [],
      country: '',
      releaseYear: '',
      youTubeVid: '',
      pageUrl: '',
      cast: []
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
          console.log(data);
          this.setState({
            movie: data,
            country: data.production_countries[0].iso_3166_1,
            releaseYear: data.release_date.slice(0,4),
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

  playTrailer = () => {
    console.log("play trailer")
  }

  render() {
    const {loading, movie, youTubeVid, cast, releaseYear, country} = this.state;
    const {history} = this.props;

    if (loading === true) {
      return (
        <Loader />
      );
    }

    return (
      <div>

      <BackButton />

      {/*
      <Youtube
        youTubeVid={youTubeVid}
        movieTitle={movie.original_title} />
      */}

      <HeroPoster backdrop={'https://image.tmdb.org/t/p/w1280/' + movie.backdrop_path}>
      </HeroPoster>

      <PlayButtonDiv
        onClick={this.playTrailer}
        >
        <div class="play"></div>
      </PlayButtonDiv>

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

          <div className="url-copy-container">
            <ParticleEffectButton
              color='#00AFAB'
              hidden={this.state.hidden}
              oscillationCoefficient={30}
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
