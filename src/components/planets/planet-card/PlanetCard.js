import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './PlanetCard.css';

function FilmCard(props) {
  const { planet } = props;
  const link = '/planets/' + planet.planetId;

  return (
    <Link to={link} className="planet-card">
      <p className="title is-4 planet-card__title">{planet.name}</p>
      <div className="media planet-card__width">
        <div className="media-left">
          <img className="planet-card__picture" src={planet.pictureUrl} alt="planet img" />
        </div>
        <div className="media-content planet-card__content">
          <div className="content">
            <p>
              Diameter <br />
              {planet.diameter}
            </p>
            <p>
              Climate <br />
              {planet.climate}
            </p>
            <p>
              Gravity <br />
              {planet.gravity}
            </p>
            <p>
              Population <br />
              {planet.population}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

FilmCard.propTypes = {
  planet: PropTypes.shape({
    name: PropTypes.string,
    pictureUrl: PropTypes.string,
    diameter: PropTypes.string,
    climate: PropTypes.string,
    gravity: PropTypes.string,
    population: PropTypes.string
  })
};

export default FilmCard;
