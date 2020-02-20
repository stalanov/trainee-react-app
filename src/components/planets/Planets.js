import React from 'react';
import PlanetCard from './planet-card/PlanetCard';
import PaginationBar from '../shared/pagination-bar/PaginationBar';
import Loader from '../shared/loader/Loader';
import AlertMessage from '../shared/alert-message/AlertMessage';
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
    const planets = this.state.planets.map(planet => {
      return <PlanetCard planet={planet} key={planet.planetId} />;
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
        {this.isLoading ? <Loader /> : <div className="columns is-multiline is-centered">{planets}</div>}
        {paginationBar}
      </React.Fragment>
    );
  }
}

export default Planets;
