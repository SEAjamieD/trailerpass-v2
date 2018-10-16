import React from 'react';
import styled from 'styled-components';
import testImg from './avengers.jpg';

const CatContainerDiv = styled.div`
  margin: 10px auto 15px;
  height: 70px;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
`

const CategoryDiv = styled.div`
  position: relative;
  width: 35%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  min-width: 35%;
  border-radius: 10px;
  opacity: 0.4;
  background-image: url(${testImg});
  background-position: center center;
  background-size: 110% auto;
  background-repeat: no-repeat;
  margin: 10px 20px 10px 2.5%;
  box-shadow: 0px 3px 8px 0px #CB0814;
  &::before {
    position: absolute;
    border-radius: 10px;
    content:" ";
    top:0;
    left:0;
    width:100%;
    height:100%;
    display: block;
    z-index:0;
    background-color: rgba(203, 8, 20, 0.3);
  }
`

const Whiteh2 = styled.h2`
  color: #fff;
  z-index: 100;
`


const CategorySelector = ( {categories} ) => {
  return (
    <CatContainerDiv>
    { categories.map(category => (
      <CategoryDiv key={category}>
        <Whiteh2>{category}</Whiteh2>
      </CategoryDiv>
    ))}
    </CatContainerDiv>
  );
}


export default CategorySelector;
