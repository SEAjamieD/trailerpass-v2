import React from 'react';
import styled, { keyframes } from 'styled-components';

import BackButtonOne from '../../common/backButton/BackButtonOne';

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
      })

  }

render() {
  return (
    <div>

      <BackButtonOne />

      Person Page
    </div>
  );
}

}

export default Person;
