import React from 'react';
import styled, { keyframes } from 'styled-components';
import YouTube from 'react-youtube';
import { fadeIn } from 'react-animations';

const fadeInAnimation = keyframes`${fadeIn}`;

const YoutubeWrapper = styled.div`
  display: grid;
  position: relative;
  padding-bottom: 56.25%;
  margin-bottom: 60px;
  height: 0;
  animation: .7s ${fadeInAnimation};
  position: absolute;
  top: 0;
  display: ${props => props.isHidden ? props.isHidden : 'none'}
`;


class ReactYoutube extends React.Component {


  render() {
    const { youTubeVid, movieTitle } = this.props;
    const opts = {
      height: '500',
      width: '294',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };

    return (
      <YoutubeWrapper isHidden={this.props.isHidden}>
        <YouTube
          id="react-youtube"
          videoId={this.props.youTubeVid}
          className='youtube-player'
          opts={opts}
          onReady={this._onReady}
          startVideo={this.props.startTrailer}
        />
      </YoutubeWrapper>
    );
  }

  _onReady(event) {
  // access to player in all event handlers via event.target
  event.target.pauseVideo();
  // event.target.playVideo();//won't work on mobile
  // const video = document.getElementById('react-youtube');  // this needs a ref or something maybe
  // var requestFullScreen = video.requestFullScreen || video.mozRequestFullScreen || video.webkitRequestFullScreen;
  //   if (requestFullScreen) {
  //     requestFullScreen.bind(video)();
  //   }
  }


}

export default ReactYoutube;
