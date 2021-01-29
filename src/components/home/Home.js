import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="columns is-centered">
      <div className="column home-page">
        <img src="http://imageshack.com/a/img922/3783/oyvsRd.png" alt="star wars logo" />
        <h1 className="has-text-white is-size-2">Hi everyone!</h1>
        <p className="has-text-white is-size-5">
          This is small trainee project was made using React. It is web-application for{' '}
          <a href="https://swapi.dev/">The Star Wars API. </a>
          Source code could be found <a href="https://github.com/s-talanov/trainee-react-app">here</a>.
        </p>
      </div>
    </div>
  );
}

export default Home;
