import React from 'react';
import { peopleService } from '../../App';
import Loader from '../loader/Loader';
import AlertMessage from '../alert-message/AlertMessage';
import './Person.css';

class Person extends React.Component {
  isLoading = true;

  constructor() {
    super();
    this.state = {
      person: null,
      error: null
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    peopleService
      .getPersonById(+id)
      .then(person => {
        this.isLoading = false;
        this.setState({ person });
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
    const { person } = this.state;
    const { error } = this.state;

    return (
      <React.Fragment>
        {error && <AlertMessage error={error} close={() => this.closeMessage()} />}
        {this.isLoading ? (
          <Loader />
        ) : (
          !error &&
          person && (
            <div className="columns is-centered">
              <div className="media person">
                <div className="media-left">
                  <img className="person__portrait" src={person.portraitUrl} alt="person portrait" />
                </div>
                <div className="media-content person__content">
                  <p className="title is-2 person__title">{person.name}</p>
                  <div className="content">
                    <p>Birth year: {person.birth_year}</p>
                    <p>Gender: {person.gender}</p>
                    <p>Height: {person.height}</p>
                    <p>Mass: {person.mass}</p>
                    <p>Hair color: {person.hair_color}</p>
                    <p>Skin color: {person.skin_color}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </React.Fragment>
    );
  }
}

export default Person;
