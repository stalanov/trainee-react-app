import getImageUrl from '../helpers/ImageFetcher';

class FilmsService {
  films = new Map();

  async getFilms() {
    const response = await fetch('https://swapi.co/api/films/');
    const data = await response.json();
    if (data.count !== this.films.size) {
      await this.cacheFilms(data.results);
    }
    return Array.from(this.films.values());
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
      film.posterUrl = posterUrls[i];
      const id = film.url.match(/\d+/)[0];
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
