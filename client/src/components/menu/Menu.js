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
  top: 50px;
  left: 0;
  width: 50%;
  height: 100vh;
  background: white;
  border: 1px solid red;
  transform: translateX(-50%);
  .menu-open {
    transform: translateX(0%);
  }
`;

class Menu extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: "closed"
    }
  }

  toggleMenu = () => {
    console.log("clicked")
    if (this.state.isOpen === "closed") {
      this.setState({isOpen: "open"})
    } else {
      this.setState({isOpen: "closed"})
    }
  }

  render() {
    const { isOpen } = this.state;
    return (
      <React.Fragment>
        <MenuDiv
        className={`menu-${isOpen}`}
        onClick={this.toggleMenu}
        >
          <MenuBar />
        </MenuDiv>
        <MenuSlideout>
        </MenuSlideout>
      </React.Fragment>
    );
  }
}

export default Menu;
