import React from 'react';
import {withRouter} from 'react-router-dom';
import store from '../../store';
import { _setHeaderColor } from '../../actions/Styles';
import YouTube from 'react-youtube';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ShareIcon from './ShareButton';
import Stars from '../stars/Stars';
import BackButton from '../../common/backButton/BackButton';
import Loader from '../../common/loader/Loader';
import PoweredBy from '../../common/poweredBy/PoweredBy';
import './detail.css';

import {
  DetailsDiv,
  HeroPoster,
  PlayButtonDiv,
  YoutubeWrapper,
  CloseDiv,
  UrlCopyContainer,
  PlusSign,
  Toast,
  FadeIn,
  GenreDiv,
  ActorsContainer
  } from './styledComponents';

import { FadeOverlay } from '../selectedMovies/SelectedMovies';




class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      hidden: false,
      isHidden: 'none',
      movie: [],
      genres: [],
      country: '',
      releaseYear: '',
      pageUrl: '',
      cast: [],
      reactYoutube: null,
      videoControl: null,
      copied: false,
      shareIconFill: '#333',
      shareStyle: {},
      showToast: false
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
        if (data) {
          let cast = data.credits.cast.slice(0,10);
          let country = data.production_countries.length > 0 ? data.production_countries[0].iso_3166_1 : 'unlisted';
          let genreObject = data.genres.length > 0 ? data.genres : null ;
          let youtubeId = data.videos.results.length > 0 ? data.videos.results[0].key : null;
          let genres = [];
          if (genreObject) {
            Object.keys(genreObject).map((key,index) => {
              return genres.push(genreObject[key].name);
            })
          }
          console.log(data);
          this.setState({
            movie: data,
            country: country,
            genres: genres.join(', '),
            releaseYear: data.release_date.slice(0,4),
            reactYoutube: youtubeId,
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
    this.setState({
      copied: true,
      shareIconFill: '#5439FF',
      shareStyle: {filter: 'drop-shadow(rgb(68, 68, 221) 0px 0px 2px)'},
      showToast: true
    })
  }


  render() {
    const { loading,
            movie,
            cast,
            genres,
            releaseYear,
            country,
            reactYoutube,
            copied,
            shareIconFill,
            shareStyle,
            showToast,
            } = this.state;

    const { history } = this.props;

    const opts = {
      height: '500',
      width: '294',
      allowFullScreen: 'allowFullScreen',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        modestbranding: 1,
      }
    };


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

          <UrlCopyContainer>

              <PlusSign>
                <div className="p1"></div>
                <div className="p2"></div>
              </PlusSign>

              <Toast showToast={showToast}>
                <p>URL Copied</p>
              </Toast>


              <CopyToClipboard
                text={this.state.pageUrl}
                onCopy={this.onCopy}
                >
                <button className="hidden-button">
                <ShareIcon
                  className="share-icon"
                  style={shareStyle}
                  width='20px'
                  fill={shareIconFill}
                  stroke='transparent'
                  copied={copied}
                  />
                </button>
              </CopyToClipboard>
          </UrlCopyContainer>

          <DetailsDiv>
            <div className="details__lower-info">
              <h1 className="details__title text-shadow-dark">{movie.original_title}</h1>

              {genres.length > 0 &&
                <GenreDiv>
                  <p>{genres}</p>
                </GenreDiv>
              }

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
            </div>
          </DetailsDiv>

          { cast &&
          <div style={{position: 'relative', marginTop: '2em'}}>
            <FadeOverlay/>
            <h3 className="text-shadow-dark" style={{marginLeft: '10%'}}>Main Cast</h3>
            <ActorsContainer>
              <div className="actors-slider-container">
              {cast.map((actor) => (
                <div className="actor-image-holder deep-box-shadow"
                  key={actor.id}
                  onClick={() => history.push(`/person/${actor.id}`)}
                  style={{backgroundImage:`url(https://image.tmdb.org/t/p/w185/${actor.profile_path})`}}>
                  <p className="text-shadow">{actor.name}</p>
                </div>
              ))}
              </div>
            </ActorsContainer>
          </div>
        }

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
