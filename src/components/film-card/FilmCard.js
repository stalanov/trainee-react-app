import React from 'react';

function FilmCard(props) {
  const { film } = props;
  return (
    <div className="column is-one-quarter">
      <img src={film.posterUrl} alt="film poster" />
      <h1>Title: {film.title}</h1>
      <h2>Episode: {film.episode_id}</h2>
      <h3>Director: {film.director}</h3>
      <h3>Release date: {film.release_date}</h3>
    </div>
  );
}

export default FilmCard;
