import React from 'react';
import styled, { keyframes } from 'styled-components';

import BackButtonOne from '../../common/backButton/BackButtonOne';

class Person extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      actor: []
    }
  }

  componentDidMount() {
    console.log('mounted');
  }

  fetchPersonDetails = () => {
    const {match} = this.props;
    this.setState({loading: true})
    // fetch(`/api/person/${match.params.person_id}`)

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
