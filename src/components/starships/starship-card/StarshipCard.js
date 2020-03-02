import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './StarshipCard.css';

function FilmCard(props) {
  const { starship } = props;
  const link = '/starships/' + starship.shipId;

  return (
    <Link to={link} className="starship-card">
      <p className="title is-4 starship-card__title">{starship.name}</p>
      <p className="subtitle is-6 starship-card__subtitle">Model: {starship.model}</p>
      <div className="media starship-card__width">
        <div className="media-left">
          <img className="starship-card__picture" src={starship.pictureUrl} alt="starship img" />
        </div>
        <div className="media-content starship-card__content">
          <div className="content">
            <p>
              Class <br />
              {starship.starship_class}
            </p>
            <p>
              Manufacturer <br />
              {starship.manufacturer}
            </p>
            <p>
              Cost <br />
              {starship.cost_in_credits}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

FilmCard.propTypes = {
  starship: PropTypes.shape({
    name: PropTypes.string,
    model: PropTypes.string,
    starship_class: PropTypes.string,
    manufacturer: PropTypes.string,
    cost_in_credits: PropTypes.string
  })
};

export default FilmCard;
