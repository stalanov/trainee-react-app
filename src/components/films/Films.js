import React from 'react';
import FilmCard from '../film-card/FilmCard';
import Film from '../film/Film';
import Loader from '../loader/Loader';
import { Switch, Route } from 'react-router-dom';
import { filmsService } from '../../App';

class Films extends React.Component {
  isLoading = true;

  constructor() {
    super();
    this.state = {
      films: [],
      count: 0
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
        console.log(error);
      });
  }

  render() {
    const filmCards = this.state.films.map(film => {
      return <FilmCard film={film} key={film.episode_id} />;
    });

    return (
      <Switch>
        <Route exact path="/films">
          {this.isLoading ? <Loader /> : <div className="columns is-multiline is-centered">{filmCards}</div>}
        </Route>
        <Route path="/films/:id" component={Film}></Route>
      </Switch>
    );
  }
}

export default Films;
