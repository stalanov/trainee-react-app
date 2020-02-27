import React from 'react';
import { speciesService } from '../../../App';
import Loader from '../../shared/loader/Loader';
import AlertMessage from '../../shared/alert-message/AlertMessage';
import './Specie.css';

class Specie extends React.Component {
  isLoading = true;

  constructor() {
    super();
    this.state = {
      specie: null,
      error: null
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    speciesService
      .getSpecieById(+id)
      .then(specie => {
        this.isLoading = false;
        this.setState({ specie: specie });
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
    const { specie } = this.state;
    const { error } = this.state;

    return (
      <React.Fragment>
        {error && <AlertMessage error={error} close={() => this.closeMessage()} />}
        {this.isLoading ? (
          <Loader />
        ) : (
          !error &&
          specie && (
            <div className="columns is-centered">
              <div className="specie">
                <p className="title is-2 specie__title">{specie.name}</p>
                <div className="specie__content">
                  <p>Classification: {specie.classification}</p>
                  <p>Designation: {specie.designation}</p>
                  <p>Average height: {specie.average_height}</p>
                  <p>Average lifespan: {specie.average_lifespan}</p>
                  <p>Language: {specie.language}</p>
                  <p>Skin colors: {specie.skin_colors}</p>
                  <p>Hair colors: {specie.hair_colors}</p>
                  <p>Eye colors: {specie.eye_colors}</p>
                </div>
              </div>
            </div>
          )
        )}
      </React.Fragment>
    );
  }
}

export default Specie;
