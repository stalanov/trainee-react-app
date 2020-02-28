import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function FilmCard(props) {
  const { starship } = props;
  const link = '/starships/' + starship.shipId;

  return (
    <Link to={link} className="person-card">
      <p className="title is-4 person-card__title">{starship.name}</p>
      <p className="subtitle is-6 film-card__subtitle">Model: {starship.model}</p>
      <div className="media person-card__width">
        <div className="media-left">
          <img className="person-card__poster" src={starship.pictureUrl} alt="starship img" />
        </div>
        <div className="media-content person-card__content">
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
  person: PropTypes.shape({
    name: PropTypes.string,
    model: PropTypes.string,
    starship_class: PropTypes.string,
    manufacturer: PropTypes.string,
    cost_in_credits: PropTypes.string
  })
};

export default FilmCard;
