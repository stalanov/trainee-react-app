import React from 'react';
import FilmCard from './film-card/FilmCard';
import Loader from '../shared/loader/Loader';
import { filmsService } from '../../App';
import AlertMessage from '../shared/alert-message/AlertMessage';

class Films extends React.Component {
  isLoading = true;

  constructor() {
    super();
    this.state = {
      films: [],
      count: 0,
      error: null
    };
  }

  componentDidMount() {
    filmsService
      .getFilmsPage(1)
      .then(films => {
        films.sort((a, b) => a.episode_id - b.episode_id);
        this.isLoading = false;
        this.setState({
          films,
          count: films.length
        });
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

  closeMessage() {
    this.setState({
      error: null
    });
  }

  render() {
    const filmCards = this.state.films.map(film => {
      return <FilmCard film={film} key={film.episode_id} />;
    });
    const { error } = this.state;

    return (
      <React.Fragment>
        {error && <AlertMessage error={error} close={() => this.closeMessage()} />}
        {this.isLoading ? <Loader /> : <div className="columns is-multiline is-centered">{filmCards}</div>}
      </React.Fragment>
    );
  }
}

export default Films;
