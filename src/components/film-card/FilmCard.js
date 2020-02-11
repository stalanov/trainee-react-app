import React from 'react';
import './FilmCard.css';

function FilmCard(props) {
  const { film } = props;
  return (
    <div className="film-card film-card__width">
      <div className="media">
        <div className="media-left">
          <img className="film-card__poster" src={film.posterUrl} alt="film poster" />
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
    </div>
  );
}

export default FilmCard;
