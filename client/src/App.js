import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      test: []
    }
  }

  componentDidMount() {
    fetch('/api/popular-movies')
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        // this.setState({test: data.results})
      })
  }

  render() {
    if (!this.state.test) {
      return (
        <div className="App">
          waiting...
        </div>
      );
    }

    return (
      <div className="App">
          data in the console.
      </div>
    );
  }
}

export default App;
