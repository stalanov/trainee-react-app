import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './PersonCard.css';

function PersonCard(props) {
  const { person } = props;
  const link = '/people/' + person.personId;

  return (
    <Link to={link} className="person-card">
      <p className="title is-4 person-card__title">{person.name}</p>
      <div className="media person-card__width">
        <div className="media-left">
          <img className="person-card__poster" src={person.portraitUrl} alt="person portrait" />
        </div>
        <div className="media-content person-card__content">
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

PersonCard.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string,
    portraitUrl: PropTypes.string,
    birth_year: PropTypes.string,
    gender: PropTypes.string
  })
};

export default PersonCard;
