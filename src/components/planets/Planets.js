import React from 'react';
import { planetsService } from '../../App';

class Planets extends React.Component {
  PAGE_SIZE = 10;
  isLoading = true;
  count = 0;
  page = 1;

  constructor() {
    super();
    this.state = {
      planets: [],
      error: null
    };
  }

  componentDidMount() {
    this.goToPage(this.page);
  }

  goToPage(page) {
    this.isLoading = true;
    this.page = page;
    this.setState({});
    planetsService
      .getPlanetsPage(page)
      .then(planets => {
        this.count = planetsService.count;
        this.isLoading = false;
        this.setState({
          planets
        });
      })
      .catch(error => {
        this.isLoading = false;
        this.setState({
          people: [],
          error: {
            title: 'Ops, something wrong',
            text: 'Probably problem with network or API, please try again later. ',
            message: error.message
          }
        });
      });
  }

  closeMessage() {
    this.setState({
      error: null
    });
  }

  render() {
    return <div />;
  }
}

export default Planets;
