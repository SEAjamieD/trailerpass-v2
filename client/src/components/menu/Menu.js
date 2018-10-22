import React from 'react';
import styled from 'styled-components';

const MenuDiv = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 5px;
  top: 5px;
  height: 50px;
  width: 50px;
`;

const MenuBar = styled.div`
  width: 50%;
  height: 2px;
  background: #333;
  &::after {
    content: '';
    display: inline-block;
    width: 100%;
    height: 2px;
    vertical-align: top;
    margin-top: 5px;
    background: #333;
  }
`;

const MenuSlideout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100vh;
  background: white;
  transform: ${props => props.isOpen === true ? 'translateX(0%)' : 'translateX(-101%)' };
  transition: transform .25s;
`;

const CloseDiv = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  height: 50px;
  width: 50px;
  .x1 {
    margin-top: 45%;
    margin-left: 25%;
    width: 60%;
    height: 4px;
    background: #333;
    transform: rotate(45deg);
  }
  .x2 {
    margin-top: -8%;
    margin-left: 25%;
    width: 60%;
    height: 4px;
    background: #333;
    transform: rotate(-45deg);
  }
`;

class Menu extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    }
  }

  toggleMenu = () => {
    if (this.state.isOpen === true) {
      this.setState({isOpen: false})
    } else {
      this.setState({isOpen: true})
    }
  }

  render() {
    const { isOpen } = this.state;
    return (
      <div>
        <MenuDiv
        onClick={this.toggleMenu}
        >
          <MenuBar />
        </MenuDiv>
        <MenuSlideout
          isOpen={isOpen}>
          <CloseDiv
          onClick={this.toggleMenu}
          >
            <div className="x1"></div>
            <div className="x2"></div>
          </CloseDiv>
        </MenuSlideout>
      </div>
    );
  }
}

export default Menu;
