import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './SpecieCard.css';

function SpecieCard(props) {
  const { specie } = props;
  const link = '/species/' + specie.specieId;

  return (
    <Link to={link} className="person-card">
      <p className="title is-4 person-card__title">{specie.name}</p>
      <p className="subtitle is-6 film-card__subtitle">
        Classification: {specie.classification} <br /> Designation: {specie.designation}
      </p>
      <div className="media person-card__width">
        <div className="media-content person-card__content">
          <div className="content">
            <p>
              Average lifespan <br />
              {specie.average_lifespan}
            </p>
            <p>
              Language <br />
              {specie.language}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

SpecieCard.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string,
    designation: PropTypes.string,
    average_lifespan: PropTypes.string,
    language: PropTypes.string
  })
};

export default SpecieCard;
