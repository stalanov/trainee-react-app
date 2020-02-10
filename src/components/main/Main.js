import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../home/Home';
import Films from '../films/Films';
import './Main.css';

class Main extends React.Component {
  render() {
    return (
      <div className="main-background">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/films" component={Films} />
        </Switch>
      </div>
    );
  }
}

export default Main;
