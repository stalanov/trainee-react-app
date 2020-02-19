import getImageUrl from '../helpers/ImageFetcher';

class PlanetsService {
  planets = new Map();
  pages = new Map();
  count = 0;

  async getPlanetsPage(page) {
    if (!this.pages.has(page)) {
      await this.fetchPlanetsPage(page);
    }
    return this.pages.get(page);
  }

  async fetchPlanetsPage(page) {
    const response = await fetch(`https://swapi.co/api/planets/?page=${page}`);
    const data = await response.json();
    this.count = data.count;
    const planets = data.results;
    await this.cachePlanets(planets);
    this.pages.set(page, planets);
  }

  async cachePlanets(planets) {
    const pictureUrls = await this.takeImages(planets);
    for (let i = 0; i < planets.length; i++) {
      const planet = planets[i];
      const pictureUrl = pictureUrls[i];
      planet.pictureUrl = pictureUrl ? pictureUrl : '../../anonymous.png';
      const id = +planet.url.match(/\d+/)[0];
      planet.planetsId = id;
      this.planets.set(id, planet);
    }
  }

  takeImages(planets) {
    const urls = planets.map(planet => {
      return getImageUrl(planet.name);
    });
    return Promise.all(urls);
  }
}

export default PlanetsService;
