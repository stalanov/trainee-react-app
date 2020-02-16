import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './PersonCard.css';

function FilmCard(props) {
  const { person } = props;
  const link = '/people/' + person.personId;
  return (
    <Link to={link} className="">
      <div className="media person-card">
        <div className="media-left">
          <img
            className="person-card__poster"
            src={person.portraitUrl || '../../broken-image.png'}
            alt="person portrait"
          />
        </div>
        <div className="media-content person-card__content">
          <p className="title is-4 person-card__title">{person.name}</p>
          <div className="content">
            <p>
              Birth year <br />
              {person.birth_year}
            </p>
            <p>
              Gender <br />
              {person.gender}
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
    birth_year: PropTypes.string,
    gender: PropTypes.string
  })
};

export default FilmCard;
