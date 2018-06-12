import React from 'react';
import Loader from '../../common/loader/Loader';
import './home.css';


class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      popularMovies: null
    }
  }

  componentDidMount() {
    this.fetchPopularMovies();
  }

  fetchPopularMovies = () => {
    this.setState({loading: true})
    fetch('/api/popular-movies')
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          popularMovies: data.results,
          loading: false
        })
      })
  }


  render() {
    const {loading, popularMovies} = this.state;

    if (loading === true) {
      return (
        <Loader />
      );
    }

    return (
      <div className="home">
        <div className="hero-container border">

        </div>

        <div className="movie-list-popular">

        </div>
      </div>
    );
  }

}

export default Home;
