import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../home/Home';
import './Main.css';

class Main extends React.Component {
  render() {
    return (
      <div className="main-background">
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default Main;
