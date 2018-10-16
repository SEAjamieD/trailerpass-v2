import React from 'react';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

import BackButtonOne from '../../common/backButton/BackButtonOne';
import Loader from '../../common/loader/Loader';
import PoweredBy from '../../common/poweredBy/PoweredBy';

import './person.css';

const fadeInAnimation = keyframes`${fadeIn}`;


const PersonDetailsDiv = styled.div`
  padding-top: 70px;
  padding-bottom: 5vh;
  width: 90%;
  max-width: 550px;
  margin: 0 auto;
  min-height: 40vh;
  color: #333;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto;
  grid-template-areas:
    "image info"
    "bio bio";
  grid-row-gap: 5vh;
  animation: .5s ${fadeInAnimation};
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
    if (!birthday) {
      return "unknown";
    } else {
      let today = new Date();
      let thisYear = today.getFullYear();
      let birthYear = birthday.slice(0,4);
      let birthMonth = birthday.slice(5,7);
      let dayOfBirth = birthday.slice(8,10);
      let age = thisYear - birthYear;

      if ( (today.getMonth() + 1) < birthMonth ||
       ( (today.getMonth() + 1) === birthMonth && (today.getDate() + 1) < dayOfBirth ) ) {
        age--
      }

      return age;
    }
  }


  bornOn = (date) => {
    if (!date) {
      return "unknown";
    } else {
      let monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

      let bornOn = new Date(date);
      let day = bornOn.getDate() + 1;
      let month = monthArr[bornOn.getMonth()];
      let year = bornOn.getFullYear();

      bornOn = `${month} ${day}, ${year}`;
      return bornOn;
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
          <img className="stripe-box-shadow" src={'https://image.tmdb.org/t/p/w185/' + person.profile_path} alt={person.name}/>
        </div>
        <div className="person__name-container">
          <h2 className="text-shadow-dark">{person.name}</h2>
          <p className="person__age">Age: {this.getAge(person.birthday)}</p>
          <p>Born: {this.bornOn(person.birthday)}</p>
        </div>
        <div className="person__bio-container">
          <p>{person.biography}</p>
        </div>
      </PersonDetailsDiv>

      <PoweredBy />

    </div>
  );
}

}

export default Person;
