import React from 'react';

class People extends React.Component {
  isLoading = true;

  constructor() {
    super();
    this.state = {
      people: [],
      count: 0,
      error: null
    };
  }

  render() {
    return <div />;
  }
}

export default People;
