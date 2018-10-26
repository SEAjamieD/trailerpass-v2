import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';


export const fadeInAnimation = keyframes`${fadeIn}`;

export const DetailsDiv = styled.div`
  .details__lower-info {
    position: relative;
    width: 90%;
    margin: 0 auto;
    min-height: 30vh;
    color: #333;
  }
  .details__title {
    font-size: 1.3em;
    width: 60%;
    text-transform: uppercase
    color: #333;
    text-align: center;
    margin: 0 auto;
    padding: 12px 0;
  }
  .details__release-info {
    display: grid;
    height: 100%;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    text-align: center;
    margin: 1em auto;
    grid-column-gap: 1em;
    grid-row-gap: 5px;
    color: #939393;
    text-transform: capitalize;
    font-size: .875em;
  }
  .details__release-info:nth-last-child(-n + 3) {
    color: #333;
  }
`;

export const ActorsContainer = styled.div`
  width: 100%;
  padding-bottom: 30px;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
  .actors-slider-container {
    display: flex;
    width: fit-content;
    padding-right: 2.5%;
    padding-left: 2.5%;
  }
  .actor-image-holder {
    width: 80px;
    min-width: 80px;
    margin-right: 15px;
    background-clip: padding-box;
  }
  .actor-image-holder img {
    object-fit: contain;
    max-width: 100%;
    border-radius: 10px;
    vertical-align: top;
  }
`;

export const HeroPoster = styled.div`
  background-image: ${props => `url(${props.backdrop})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 275px;
  border-radius: 0% 0% 60% 60% / 0% 0% 15% 15%;
  box-shadow: 0px 4px 45px -1px rgba(0,0,0,0.7);
`;

export const PlayButtonDiv = styled.div`
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

export const YoutubeWrapper = styled.div`
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

export const CloseDiv = styled.div`
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

export const UrlCopyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  margin: 15px auto 0;
`;

export const PlusSign = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  overflow: hidden;
  .p1 {
    position: absolute;
    width: 100%
    height: 2px;
    background: #333;
    top: calc(50% - 1px);
  }
  .p2 {
    position: absolute;
    height: 100%;
    width: 2px;
    background: #333;
    left: calc(50% - .5px);
  }
`;

export const Toast = styled.div`
  visibility: ${props => props.showToast === true ? 'visible' : 'hidden'}
  animation: ${props => props.showToast === true ? `2.5s ${toastAnimation} forwards` : ''}
  z-index: 9995;
  position: fixed;
  height: 40px;
  background: #fff;
  color: #5439FF;
  font-size: 0.7em;
  text-transform: uppercase;
  border-radius: 10px;
  right: 5%;
  padding: 0px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const GenreDiv = styled.div`
  display: flex;
  width: 80%;
  color: #939393;
  margin: 0 auto 20px;
  align-items: center;
  justify-content: center;
  text-align: justify;
  text-align-last: center;
  font-size: .80em;
`;

export const FadeIn = styled.div`
  animation: .5s ${fadeInAnimation} linear;
`;


export const toastAnimation = keyframes`
  0% {
    transform: translateY(0);
    opacity: 0;
  }

  30% {
    transform: translateY(-70px);
    opacity: .8;
    box-shadow: 0px 0px 45px -1px rgba(0,0,0,0.7);
  }

  90% {
    opacity: .8;
    box-shadow: 0px 0px 45px -1px rgba(0,0,0,0.7);
  }

  100% {
    transform: translateY(-70px);
    opacity: 0;
    visibility: hidden;
  }
`;
