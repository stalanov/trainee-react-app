import React from 'react';
import Header from './components/header/Header';
import Main from './components/main/Main';

function App() {
  const categories = ['films', 'people', 'planets', 'species', 'starships', 'vehicles'];

  return (
    <div>
      <Header categories={categories} />
      <Main />
    </div>
  );
}

export default App;
