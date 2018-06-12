import React from 'react';
import Star from './Star';
import StarOutline from './StarOutline';
import './stars.css';

class Stars extends React.Component {

  render() {
    var rating = Math.round(this.props.rating);
    console.log(rating);
    var stars = []
    for (var i = 0; i < rating; i++) {
      stars.push(<Star key={i + "S"}/>)
    }

    var outlines = 10 - rating;
    for (var j = 0; j < outlines; j++) {
      stars.push(<StarOutline key={j + "SL"}/>)
    }

    return (
      <div className="stars__container">
        <div className="stars__row">
        {stars}
        </div>
      </div>
    );
  }
}

export default Stars;
