import getImageUrl from '../helpers/ImageFetcher';

class FilmsService {
  async getFilms() {
    if (!this.films) {
      await this.fetchFilms();
    }
    return this.films;
  }

  async fetchFilms() {
    const response = await fetch('https://swapi.co/api/films/');
    const data = await response.json();
    const films = data.results.sort((a, b) => a.episode_id - b.episode_id);
    const posterUrls = await this.takeImages(films);
    for (let i = 0; i < films.length; i++) {
      films[i].posterUrl = posterUrls[i];
    }
    this.films = films;
  }

  takeImages(films) {
    const urls = films.map(film => {
      return getImageUrl(`Star Wars ${film.episode_id}`);
    });
    return Promise.all(urls);
  }
}

export default FilmsService;
