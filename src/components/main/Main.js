import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../home/Home';
import Films from '../films/Films';
import Film from '../film/Film';
import People from '../people/People';
import './Main.css';

class Main extends React.Component {
  render() {
    return (
      <div className="main-background">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/films" component={Films} />
          <Route path="/films/:id" component={Film}></Route>
          <Route exact path="/people" component={People} />
        </Switch>
      </div>
    );
  }
}

export default Main;
