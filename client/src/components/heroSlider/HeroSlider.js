import React from 'react';
import Slider from 'react-slick';

class HeroSlider extends React.Component {

  render() {
    const { randomMovies, history } = this.props;

    const sliderSettings = {
      dots: false,
      arrows: false,
      centerMode: true,
      className: 'hero-slider',
      centerPadding: "150px",
      touchThreshold: 2,
      swipeToSlide: true,
      speed: 700,
      infinite: false,
      initialSlide: 1,
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1025,
          settings: {
            centerPadding: "200px"
          }
        },
        {
          breakpoint: 770,
          settings: {
            centerPadding: "180px"
          }
        },
        {
          breakpoint: 426,
          settings: {
            centerPadding: "50px"
          }
        }
      ]
    };


    return (
      <Slider {...sliderSettings}>
        {randomMovies.map((randomMovie, i) => (
          <div key={i} className="hero-container" onClick={() => history.push(`/movie/${randomMovie.id}`)}>
            <h2 className="list__random-title text-shadow-dark">{randomMovie.title}</h2>
            <img className="list__random-image deep-box-shadow" src={'https://image.tmdb.org/t/p/w500/' + randomMovie.backdrop_path} alt="movie backdrop"/>
          </div>
        ))}
      </Slider>
    );
  }
}

export default HeroSlider;
