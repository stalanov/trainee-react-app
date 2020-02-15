import React from 'react';
import PaginationBar from '../pagination-bar/PaginationBar';

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
    return <PaginationBar current={9} total={9} />;
  }
}

export default People;
