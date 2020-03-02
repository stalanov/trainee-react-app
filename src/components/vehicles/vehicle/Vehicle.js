import React from 'react';
import { vehiclesService } from '../../../App';
import Loader from '../../shared/loader/Loader';
import AlertMessage from '../../shared/alert-message/AlertMessage';
import './Vehicle.css';

class Vehicle extends React.Component {
  isLoading = true;

  constructor() {
    super();
    this.state = {
      vehicle: null,
      error: null
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    vehiclesService
      .getVehicleById(+id)
      .then(vehicle => {
        this.isLoading = false;
        this.setState({ vehicle });
      })
      .catch(error => {
        this.isLoading = false;
        this.setState({
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
    const { vehicle } = this.state;
    const { error } = this.state;

    return (
      <React.Fragment>
        {error && <AlertMessage error={error} close={() => this.closeMessage()} />}
        {this.isLoading ? (
          <Loader />
        ) : (
          !error &&
          vehicle && (
            <div className="columns is-centered">
              <div className="vehicle">
                <p className="title is-2 vehicle__title">{vehicle.name}</p>
                <p className="subtitle is-6 vehicle__subtitle">Model: {vehicle.model}</p>
                <div className="vehicle__content">
                  <p>Manufacturer: {vehicle.manufacturer}</p>
                  <p>Class: {vehicle.starship_class}</p>
                  <p>Cost: {vehicle.cost_in_credits}</p>
                  <p>Length: {vehicle.length}</p>
                  <p>Max atmo speed: {vehicle.max_atmosphering_speed}</p>
                  <p>Crew: {vehicle.crew}</p>
                  <p>Cargo capacity: {vehicle.cargo_capacity}</p>
                  <p>Consumables: {vehicle.consumables}</p>
                </div>
              </div>
            </div>
          )
        )}
      </React.Fragment>
    );
  }
}

export default Vehicle;
