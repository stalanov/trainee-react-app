import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './FilmCard.css';

function FilmCard(props) {
  const { film } = props;
  const link = '/films/' + film.clientId;
  return (
    <Link to={link} className="film-card film-card__width">
      <div className="media">
        <div className="media-left">
          <img className="film-card__poster" src={film.posterUrl || '../../broken-image.png'} alt="film poster" />
        </div>
        <div className="media-content film-card__content">
          <p className="title is-4 film-card__title">{film.title}</p>
          <p className="subtitle is-6 film-card__subtitle">Episode: {film.episode_id}</p>
          <div className="content">
            <p>
              Director <br />
              {film.director}
            </p>
            <p>
              Release date <br />
              {film.release_date}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

FilmCard.propTypes = {
  film: PropTypes.shape({
    title: PropTypes.string,
    episode_id: PropTypes.number,
    director: PropTypes.string,
    release_date: PropTypes.string
  })
};

export default FilmCard;
