import React from 'react';
import styled from 'styled-components';

const MenuDiv = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 10px;
  top: 10px;
  height: 50px;
  width: 50px;
  z-index: 9999;
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
  position: fixed;
  top: 0;
  left: 0;
  width: 50%;
  height: 100vh;
  background: white;
  transform: ${props => props.isOpen === true ? 'translateX(0%)' : 'translateX(-101%)' };
  transition: transform .25s;
  z-index: 9999;
  ul {
    padding-top: 60px;
    text-align: center;
    li {
      font-size: 1.2em;
      text-transform: uppercase;
      padding: 10px 0;
      color: #333;
    }
  }
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

const MenuOverlay = styled.div`
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  background: black;
  opacity: 0.6;
  z-index: 9990;
  display: ${props => props.isOpen === true ? 'block' : 'none' };
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
      document.body.classList.remove("menu-open")
    } else {
      this.setState({isOpen: true})
      document.body.classList.add("menu-open")
    }
  }

  render() {
    const { isOpen } = this.state;
    return (
      <div>
        <MenuOverlay
          isOpen={isOpen}
          ></MenuOverlay>
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

          <ul>
            <li>About</li>
            <li>Nothing</li>
            <li>Here</li>
            <li>Yet</li>
          </ul>

        </MenuSlideout>
      </div>
    );
  }
}

export default Menu;
