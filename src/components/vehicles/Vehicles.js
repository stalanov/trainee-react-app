import React from 'react';
import PaginationBar from '../shared/pagination-bar/PaginationBar';
import VehicleCard from './vehicles-card/VehicleCard';
import Loader from '../shared/loader/Loader';
import AlertMessage from '../shared/alert-message/AlertMessage';
import { vehiclesService } from '../../App';

class Vehicles extends React.Component {
  PAGE_SIZE = 10;
  isLoading = true;
  count = 0;
  page = 1;

  constructor() {
    super();
    this.state = {
      vehicles: [],
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
    vehiclesService
      .getVehiclesPage(page)
      .then(vehicles => {
        this.count = vehiclesService.count;
        this.isLoading = false;
        this.setState({
          vehicles: vehicles
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
    const vehicles = this.state.vehicles.map(vehicle => {
      return <VehicleCard vehicle={vehicle} key={vehicle.vehicleId} />;
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
        {this.isLoading ? <Loader /> : <div className="columns is-multiline is-centered">{vehicles}</div>}
        {!this.isLoading && paginationBar}
      </React.Fragment>
    );
  }
}

export default Vehicles;
