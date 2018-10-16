import React from 'react';
import styled, { keyframes } from 'styled-components';
import Star from './Star';
import StarOutline from './StarOutline';
import './stars.css';

const revealAnimation = keyframes`
  from {width: 100%;}
  to {width: 0%;}
`;

const RevealDiv = styled.div`
  position: absolute;
  height: 50%;
  width: 0%;
  right: 30%;
  background: #fff;
  -webkit-transform: translate3d(0,0,0);
  z-index: 10;
  animation: ${revealAnimation} 2.5s ease-out;
`;

class Stars extends React.Component {

  render() {
    var rating = Math.round(this.props.rating);
    var stars = []

    if (rating !== 0) {
      for (var i = 0; i < rating; i++) {
        stars.push(<Star key={i + "S"}/>)
      }

      var outlines = 10 - rating;
      for (var j = 0; j < outlines; j++) {
        stars.push(<StarOutline key={j + "SL"}/>)
      }
    } else {
      stars = "No Viewer Rating Yet"
    }


    return (
      <div className="stars__container">
          <div className="stars__row">
            <RevealDiv></RevealDiv>
          {stars}
          </div>
      </div>
    );
  }
}

export default Stars;
