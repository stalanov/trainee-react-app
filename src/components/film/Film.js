import React from 'react';
import { filmsService } from '../../App';
import Loader from '../loader/Loader';

class Film extends React.Component {
  isLoading = true;

  constructor() {
    super();
    this.state = {
      film: null
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    filmsService.getFilmById(id - 1).then(film => {
      this.isLoading = false;
      this.setState({ film });
      console.log(film);
    });
  }
  render() {
    return (
      <React.Fragment>{this.isLoading ? <Loader /> : <div>Film {this.state.film.episode_id}</div>}</React.Fragment>
    );
  }
}

export default Film;
