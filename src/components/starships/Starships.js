import React from 'react';
import PaginationBar from '../shared/pagination-bar/PaginationBar';
import StarshipCard from './starship-card/StarshipCard';
import Loader from '../shared/loader/Loader';
import AlertMessage from '../shared/alert-message/AlertMessage';
import { starshipsService } from '../../App';

class People extends React.Component {
  PAGE_SIZE = 10;
  isLoading = true;
  count = 0;
  page = 1;

  constructor() {
    super();
    this.state = {
      starships: [],
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
    starshipsService
      .getStarshipsPage(page)
      .then(starship => {
        this.count = starshipsService.count;
        this.isLoading = false;
        this.setState({
          starships: starship
        });
      })
      .catch(error => {
        this.isLoading = false;
        this.setState({
          species: [],
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
    const starships = this.state.starships.map(starship => {
      return <StarshipCard starship={starship} key={starship.shipId} />;
    });
    const { error } = this.state;
    const total = Math.ceil(this.count / this.PAGE_SIZE);
    const paginationBar =
      !error && total ? (
        <PaginationBar current={this.page} total={total} goToPage={page => this.goToPage(page)} />
      ) : null;

    return (
      <React.Fragment>
        {paginationBar}
        {error && <AlertMessage error={error} close={() => this.closeMessage()} />}
        {this.isLoading ? <Loader /> : <div className="columns is-multiline is-centered">{starships}</div>}
        {!this.isLoading && paginationBar}
      </React.Fragment>
    );
  }
}

export default People;
