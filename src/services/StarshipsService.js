import getImageUrl from '../helpers/ImageFetcher';

class StarshipsService {
  starships = new Map();
  pages = new Map();
  count = 0;

  async getStarshipsPage(page) {
    if (!this.pages.has(page)) {
      await this.fetchStarshipsPage(page);
    }
    return this.pages.get(page);
  }

  async fetchStarshipsPage(page) {
    const response = await fetch(`https://swapi.co/api/starships/?page=${page}`);
    const data = await response.json();
    this.count = data.count;
    const starships = data.results;
    await this.cachePlanets(starships);
    this.pages.set(page, starships);
  }

  async cachePlanets(starships) {
    const pictureUrls = await this.takeImages(starships);
    for (let i = 0; i < starships.length; i++) {
      const starship = starships[i];
      const pictureUrl = pictureUrls[i];
      starship.pictureUrl = pictureUrl;
      if (starship.name === 'Executor') {
        starship.pictureUrl = 'https://upload.wikimedia.org/wikipedia/en/d/d9/ImperialstarDestroyer480ppx.png';
      }
      const id = +starship.url.match(/\d+/)[0];
      starship.shipId = id;
      this.starships.set(id, starship);
    }
  }

  takeImages(starships) {
    const urls = starships.map(starship => {
      return getImageUrl(starship.name);
    });
    return Promise.all(urls);
  }
}

export default StarshipsService;
