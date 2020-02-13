import React from 'react';
import FilmCard from '../film-card/FilmCard';
import Film from '../film/Film';
import Loader from '../loader/Loader';
import { Switch, Route } from 'react-router-dom';
import { filmsService } from '../../App';
import AlertMessage from '../alert-message/AlertMessage';

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
      .getFilms()
      .then(films => {
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
        <Switch>
          <Route exact path="/films">
            {this.isLoading ? <Loader /> : <div className="columns is-multiline is-centered">{filmCards}</div>}
          </Route>
          <Route path="/films/:id" component={Film}></Route>
        </Switch>
      </React.Fragment>
    );
  }
}

export default Films;
