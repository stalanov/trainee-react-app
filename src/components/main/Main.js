import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../home/Home';
import Films from '../films/Films';
import Film from '../films/film/Film';
import People from '../people/People';
import Person from '../people/person/Person';
import Planets from '../planets/Planets';
import Planet from '../planets/planet/Planet';
import Species from '../species/Species';
import './Main.css';

class Main extends React.Component {
  render() {
    return (
      <div className="main-background">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/films" component={Films} />
          <Route path="/films/:id" component={Film} />
          <Route exact path="/people" component={People} />
          <Route path="/people/:id" component={Person} />
          <Route exact path="/planets" component={Planets} />
          <Route path="/planets/:id" component={Planet} />
          <Route exact path="/species" component={Species} />
        </Switch>
      </div>
    );
  }
}

export default Main;
