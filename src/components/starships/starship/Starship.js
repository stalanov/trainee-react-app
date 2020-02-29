import React from 'react';
import { starshipsService } from '../../../App';
import Loader from '../../shared/loader/Loader';
import AlertMessage from '../../shared/alert-message/AlertMessage';
import './Starship.css';

class Person extends React.Component {
  isLoading = true;

  constructor() {
    super();
    this.state = {
      starship: null,
      error: null
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    starshipsService
      .getStarshipById(+id)
      .then(starship => {
        this.isLoading = false;
        this.setState({ starship });
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
    const { starship } = this.state;
    const { error } = this.state;

    return (
      <React.Fragment>
        {error && <AlertMessage error={error} close={() => this.closeMessage()} />}
        {this.isLoading ? (
          <Loader />
        ) : (
          !error &&
          starship && (
            <div className="columns is-centered">
              <div className="media starship">
                <div className="media-left">
                  <img className="starship__picture" src={starship.pictureUrl} alt="starship img" />
                </div>
                <div className="media-content starship__content">
                  <p className="title is-2 starship__title">{starship.name}</p>
                  <p className="subtitle is-6 starship__subtitle">Model: {starship.model}</p>
                  <div className="content">
                    <p>Manufacturer: {starship.manufacturer}</p>
                    <p>Class: {starship.starship_class}</p>
                    <p>Cost: {starship.cost_in_credits}</p>
                    <p>Length: {starship.length}</p>
                    <p>Max atmo speed: {starship.max_atmosphering_speed}</p>
                    <p>Crew: {starship.crew}</p>
                    <p>Passengers: {starship.passengers}</p>
                    <p>Cargo capacity: {starship.cargo_capacity}</p>
                    <p>Consumables: {starship.consumables}</p>
                    <p>Hyperdrive rating: {starship.hyperdrive_rating}</p>
                    <p>MGLT: {starship.MGLT}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </React.Fragment>
    );
  }
}

export default Person;
