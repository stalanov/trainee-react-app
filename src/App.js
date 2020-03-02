import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header/Header';
import Main from './components/main/Main';
import Footer from './components/footer/Footer';
import FilmsService from './services/FilmsService';
import PeopleService from './services/PeopleService';
import PlanetsService from './services/PlanetsService';
import SpeciesService from './services/SpeciesService';
import StarshipsService from './services/StarshipsService';
import VehiclesService from './services/VehiclesService';

export const filmsService = new FilmsService();
export const peopleService = new PeopleService();
export const planetsService = new PlanetsService();
export const speciesService = new SpeciesService();
export const starshipsService = new StarshipsService();
export const vehiclesService = new VehiclesService();

function App() {
  const categories = ['films', 'people', 'planets', 'species', 'starships', 'vehicles'];

  return (
    <BrowserRouter>
      <Header categories={categories} />
      <Main />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
