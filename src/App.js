import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header/Header';
import Main from './components/main/Main';

function App() {
  const categories = ['films', 'people', 'planets', 'species', 'starships', 'vehicles'];

  return (
    <BrowserRouter>
      <Header categories={categories} />
      <Main />
    </BrowserRouter>
  );
}

export default App;
