import React from 'react';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

const fadeInAnimation = keyframes`${fadeIn}`;

const YoutubeWrapper = styled.div`
  display: grid;
  position: relative;
  padding-bottom: 56.25%;
  margin-bottom: 60px;
  height: 0;
  animation: .7s ${fadeInAnimation};
`;

class Youtube extends React.Component {

  render() {
    const { youTubeVid, movieTitle } = this.props;

    return (
      <YoutubeWrapper>
        <iframe title={movieTitle} className="youtube-player deep-box-shadow" width="500" height="294" src={youTubeVid} frameBorder="0"></iframe>
      </YoutubeWrapper>
    );
  }

}

export default Youtube;
