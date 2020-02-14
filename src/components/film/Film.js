import React from 'react';
import { filmsService } from '../../App';
import Loader from '../loader/Loader';
import AlertMessage from '../alert-message/AlertMessage';
import './Film.css';

class Film extends React.Component {
  isLoading = true;

  constructor() {
    super();
    this.state = {
      film: null,
      error: null
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    filmsService
      .getFilmById(id)
      .then(film => {
        this.isLoading = false;
        this.setState({ film });
      })
      .catch(error => {
        this.isLoading = false;
        this.setState({
          error: {
            title: 'Ops, something wrong',
            text: 'Probably problem with network or API, please try again later. ',
            message: error.message
          }
        });
      });
  }

  render() {
    const { film } = this.state;
    const { error } = this.state;

    return (
      <React.Fragment>
        {error && <AlertMessage error={error} close={() => this.closeMessage()} />}
        {this.isLoading ? (
          <Loader />
        ) : (
          <div className="media film">
            <div className="media-left">
              <img className="film-card__poster" src={film.posterUrl || '../../broken-image.png'} alt="film poster" />
            </div>
            <div className="media-content film__content">
              <p className="title is-2 film__title">
                Star Wars: Episode {film.episode_id} - {film.title}
              </p>
              <p className="subtitle is-4 film__subtitle">Release date: {film.release_date}</p>
              <div className="content">
                <p>
                  Director <br />
                  {film.director}
                </p>
                <p>
                  Producers <br />
                  {film.producer}
                </p>
                <p>
                  Description <br />
                  {film.opening_crawl}
                </p>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Film;
