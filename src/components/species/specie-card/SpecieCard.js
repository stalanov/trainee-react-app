import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './SpecieCard.css';

function SpecieCard(props) {
  const { specie } = props;
  const link = '/species/' + specie.specieId;

  return (
    <Link to={link}>
      <div className="specie-card specie-card__width">
        <p className="title is-4 specie-card__title">{specie.name}</p>
        <div className="specie-card__content">
          <p>Classification: {specie.classification}</p>
          <p>Designation: {specie.designation}</p>
          <p>Average lifespan: {specie.average_lifespan}</p>
          <p>Language: {specie.language}</p>
        </div>
      </div>
    </Link>
  );
}

SpecieCard.propTypes = {
  specie: PropTypes.shape({
    name: PropTypes.string,
    designation: PropTypes.string,
    average_lifespan: PropTypes.string,
    language: PropTypes.string
  })
};

export default SpecieCard;
