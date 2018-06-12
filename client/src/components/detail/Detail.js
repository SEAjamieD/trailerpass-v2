import React from 'react';
import YouTube from 'react-youtube';
import './detail.css';

class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      movie: [],
      video: null
    }
  }

  componentDidMount() {
    // this.fetchMovieDetails();
  }

  fetchMoviesDetails = () => {
    const {match} = this.props;
    this.setState({loading: true})
    fetch(`/api/movie/${match.params.id}`)
      .then(res => res.json())
      .then((data) => {
        console.log(data);

      })
  }


  render() {
    const {movie, video} = this.state;

    const opts = {
          height: '300px',
          width: '100%',
          playerVars: { // https://developers.google.com/youtube/player_parameters
            autoplay: 0
          }
        };

    return (
      <div className="details__container">

        <div className="youtube-container">
          <YouTube
            opts={opts}
            videoId={video}
            />
        </div>
        <div className="details__lower-info">
          <h1 className="details__title">{movie.original_title}</h1>
          <p className="details__release-date">Released: {movie.release_date}</p>
          <p className="details__overview">{movie.overview}</p>
        </div>
      </div>
    );
  }
}

export default Details;
