import React from 'react';
import styled, { keyframes } from 'styled-components';
import { fadeInLeft } from 'react-animations';
import { withRouter } from 'react-router';
import './backbutton.css';

const fadeInAnimation = keyframes`${fadeInLeft}`;

const BackArrowDiv = styled.div`
  position: fixed;
  height: 30px;
  width: 30px;
  top: 15px;
  left: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  -webkit-transform: translate3d(0,0,0);
  animation: .5s ${fadeInAnimation};
  `;

class BackbuttonOne extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <BackArrowDiv onClick={ () => history.goBack() }>
        <div className="arrow left-arrow"></div>
      </BackArrowDiv>
    );
  }
}

export default withRouter(BackbuttonOne);
