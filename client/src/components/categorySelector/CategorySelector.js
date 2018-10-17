import React from 'react';
import styled from 'styled-components';
import testImg from './avengers.jpg';

const CatContainerDiv = styled.div`
  display: flex;
  width: fit-content;
  padding-right: calc((100% - 200px) / 2);
  padding-left: calc((100% - 200px) / 2);
`
const CatScrollDiv = styled.div`
  width: 100%;
  padding-top: 20px;
  padding-bottom: 25px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
`

const CategoryDiv = styled.div`
  position: relative;
  width: 200px;
  min-width: 200px;
  height: 60px;
  color: white;
  text-transform: uppercase;
  overflow: hidden;
  margin-right: 15px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: red;
  box-shadow: 0px 25px 26px -21px rgba(0,0,0,1);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`

const Whiteh2 = styled.h2`
  color: #fff;
  z-index: 100;
`


class CategorySelector extends React.Component {


  render() {

    const { categories } = this.props;
    return (
      <CatScrollDiv>
      <CatContainerDiv>
      { categories.map(category => (
        <CategoryDiv key={category}>
        <Whiteh2>{category}</Whiteh2>
        </CategoryDiv>
      ))}
      </CatContainerDiv>
      </CatScrollDiv>
    );
  }
}



export default CategorySelector;
