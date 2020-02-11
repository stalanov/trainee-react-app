import React from 'react';
import FilmCard from '../film-card/FilmCard';
import getImageUrl from '../../helpers/ImageFetcher';
import Loader from '../loader/Loader';

class Film extends React.Component {
  isLoading = true;
  constructor() {
    super();
    this.state = {
      films: [],
      count: 0
    };
  }

  takeImages(films) {
    const urls = films.map(film => {
      return getImageUrl(`Star Wars ${film.episode_id}`);
    });
    return Promise.all(urls);
  }

  componentDidMount() {
    this.isLoading = true;
    fetch('https://swapi.co/api/films')
      .then(response => {
        return response.json();
      })
      .then(data => {
        const films = data.results.sort((a, b) => a.episode_id - b.episode_id);
        this.takeImages(films)
          .then(urls => {
            for (let i = 0; i < films.length; i++) {
              films[i].posterUrl = urls[i];
            }
            this.isLoading = false;
            this.setState({
              films,
              count: data.count
            });
          })
          .catch(error => {
            console.log(error);
          });
      });
  }

  render() {
    const filmCards = this.state.films.map(film => {
      return <FilmCard film={film} key={film.episode_id} />;
    });

    return (
      <React.Fragment>
        {this.isLoading ? <Loader /> : <div className="columns is-multiline is-centered">{filmCards}</div>}
      </React.Fragment>
    );
  }
}

export default Film;
