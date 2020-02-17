import getImageUrl from '../helpers/ImageFetcher';

class FilmsService {
  films = new Map();
  pages = new Map();
  count = 0;

  async getFilmsPage(page) {
    if (!this.pages.has(page)) {
      await this.fetchFilmsPage(page);
    }
    return this.pages.get(page);
  }

  async fetchFilmsPage(page) {
    const response = await fetch(`https://swapi.co/api/films/?page=${page}`);
    const data = await response.json();
    this.count = data.count;
    const films = data.results;
    await this.cacheFilms(films);
    this.pages.set(page, films);
  }

  async getFilmById(id) {
    if (!this.films.has(id)) {
      await this.fetchFilmById(id);
    }
    return this.films.get(id);
  }

  async cacheFilms(films) {
    const posterUrls = await this.takeImages(films);
    for (let i = 0; i < films.length; i++) {
      const film = films[i];
      film.posterUrl = posterUrls[i] || '../../broken-image.png';
      const id = +film.url.match(/\d+/)[0];
      film.filmId = id;
      this.films.set(id, film);
    }
  }

  async fetchFilmById(id) {
    const response = await fetch(`https://swapi.co/api/films/${id}/`);
    const film = await response.json();
    await this.cacheFilms(Array.of(film));
  }

  takeImages(films) {
    const urls = films.map(film => {
      return getImageUrl(`Star Wars ${film.episode_id}`);
    });
    return Promise.all(urls);
  }
}

export default FilmsService;
