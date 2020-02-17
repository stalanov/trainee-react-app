import React from 'react';
import PaginationBar from '../pagination-bar/PaginationBar';
import PersonCard from '../person-card/PersonCard';
import Loader from '../loader/Loader';
import AlertMessage from '../alert-message/AlertMessage';
import { peopleService } from '../../App';

class People extends React.Component {
  PAGE_SIZE = 10;
  isLoading = true;
  count = 0;
  page = 1;

  constructor() {
    super();
    this.state = {
      people: [],
      error: null
    };
  }

  componentDidMount() {
    this.goToPage(this.page);
  }

  goToPage(page) {
    this.isLoading = true;
    this.setState({});
    this.page = page;
    peopleService
      .getPeoplePage(page)
      .then(people => {
        this.count = peopleService.count;
        this.isLoading = false;
        this.setState({
          people
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
    const people = this.state.people.map(person => {
      return <PersonCard person={person} key={person.personId} />;
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
        {this.isLoading ? <Loader /> : <div className="columns is-multiline is-centered">{people}</div>}
        {paginationBar}
      </React.Fragment>
    );
  }
}

export default People;
