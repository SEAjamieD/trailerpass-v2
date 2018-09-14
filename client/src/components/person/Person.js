import React from 'react';
import styled, { keyframes } from 'styled-components';

import BackButtonOne from '../../common/backButton/BackButtonOne';
import Loader from '../../common/loader/Loader';

import './person.css';


const PersonDetailsDiv = styled.div`
  padding-top: 70px;
  width: 90%;
  margin: 0 auto;
  min-height: 40vh;
  color: white;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto;
  grid-template-areas:
    "image info"
    "bio bio";
  grid-row-gap: 5vh;
`;


class Person extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      person: []
    }
  }

  componentDidMount() {
    this.fetchPersonDetails();
  }

  fetchPersonDetails = () => {
    const {match} = this.props;
    this.setState({loading: true})
    fetch(`/api/person/${match.params.person_id}`)
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          loading: false,
          person: data
        })
      })
  }

  getAge = (birthday) => {
    if (birthday) {
      let today = new Date();
      let thisYear = today.getFullYear();
      let birthYear = birthday.slice(0,4);
      let birthMonth = birthday.slice(5,7);
      let dayOfBirth = birthday.slice(8,10);
      let age = thisYear - birthYear;

      if ( (today.getMonth() + 1) < birthMonth ||
       ( (today.getMonth() + 1) == birthMonth && (today.getDate() + 1) < dayOfBirth ) ) {
        age--
      }

      return age;
    }
  }

render() {
  const {loading, person} = this.state;

  if (loading === true) {
    return (
      <Loader />
    );
  }

  return (
    <div>

      <BackButtonOne />

      <PersonDetailsDiv>
        <div className="person__image-container">
          <img src={'http://image.tmdb.org/t/p/w185/' + person.profile_path} alt={person.name}/>
        </div>
        <div className="person__name-container">
          <h2>{person.name}</h2>
          <p>Age: {this.getAge(person.birthday)}</p>
          <p>Born: {person.birthday}</p>
        </div>
        <div className="person__bio-container">
          <p>{person.biography}</p>
        </div>
      </PersonDetailsDiv>
    </div>
  );
}

}

export default Person;
