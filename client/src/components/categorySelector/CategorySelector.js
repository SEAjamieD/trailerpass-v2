import React from 'react';
import styled from 'styled-components';
import './categorySelector.css';

const CatContainerDiv = styled.div`
  display: flex;
  width: fit-content;
  padding-right: 2.5%;
  padding-left: 2.5%;
`
const CatScrollDiv = styled.div`
  width: 100%;
  padding-bottom: 35px;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
`

const CategoryDiv = styled.button`
  position: relative;
  width: 150px;
  min-width: 150px;
  height: 50px;
  color: #fff;
  font-size: .9em;
  letter-spacing: 2px;
  text-transform: uppercase;
  overflow: hidden;
  margin-right: 15px;
  border-radius: 10px;
  background-clip: padding-box;
  border: none;
  outline: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: red;
  box-shadow: 0px 25px 26px -21px rgba(0,0,0,1);
  ${props => props.isActive && `box-shadow: 0px 25px 26px -21px red;`}
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`

const CatOverlay = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-clip: padding-box;
  position: absolute;
  background: red;
  opacity: .6;
  pointer-events: none;
`;

const Whiteh2 = styled.h2`
  color: #fff;
  z-index: 100;
  pointer-events: none;
`

class CategorySelector extends React.Component {

  render() {

    const { categories, isActive } = this.props;
    const images = ["https://images.unsplash.com/photo-1512149177596-f817c7ef5d4c?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=25bd4127d97a5cf6d5baf5e2563436d2", "https://images.unsplash.com/photo-1529798856831-427dfd0a1ab1?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=75d7843b7dd8889a14b2da54a97ac9a0", "https://images.unsplash.com/photo-1523678802981-959dc4f70b96?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=c67fa93d666a03efc95126aabfc42c89", "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=4fffd7a27086f313d0db6a61cd38f39a"
    ];

    return (
    <CatScrollDiv>
      <CatContainerDiv>
      { categories.map((category, i) => (
        <CategoryDiv
        key={category}
        isActive={isActive === i ? 'active' : ''}
        data-category={category}
        style={{"backgroundImage": `url(${images[i]})`}}
        onClick={ () => this.props.fetchNewSet( category, i ) }
        >
          <Whiteh2>{category}</Whiteh2>
        <CatOverlay></CatOverlay>
        </CategoryDiv>
      ))}
      </CatContainerDiv>
    </CatScrollDiv>
    );
  }
}



export default CategorySelector;
