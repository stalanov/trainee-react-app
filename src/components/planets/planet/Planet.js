import React from 'react';
import { planetsService } from '../../../App';
import Loader from '../../shared/loader/Loader';
import AlertMessage from '../../shared/alert-message/AlertMessage';
import './Planet.css';

class Planet extends React.Component {
  isLoading = true;

  constructor() {
    super();
    this.state = {
      planet: null,
      error: null
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    planetsService
      .getPlanetById(+id)
      .then(planet => {
        this.isLoading = false;
        this.setState({ planet });
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
    const { planet } = this.state;
    const { error } = this.state;

    return (
      <React.Fragment>
        {error && <AlertMessage error={error} close={() => this.closeMessage()} />}
        {this.isLoading ? (
          <Loader />
        ) : (
          !error &&
          planet && (
            <div className="columns is-centered">
              <div className="media planet">
                <div className="media-left">
                  <img className="planet__picture" src={planet.pictureUrl} alt="planet img" />
                </div>
                <div className="media-content planet__content">
                  <p className="title is-2 planet__title">{planet.name}</p>
                  <div className="content">
                    <p>Rotation period: {planet.rotation_period}</p>
                    <p>Orbital period: {planet.orbital_period}</p>
                    <p>Diameter: {planet.diameter}</p>
                    <p>Climate: {planet.climate}</p>
                    <p>Gravity: {planet.gravity}</p>
                    <p>Terrain: {planet.terrain}</p>
                    <p>Surface water: {planet.surface_water}</p>
                    <p>Population: {planet.population}</p>
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

export default Planet;
