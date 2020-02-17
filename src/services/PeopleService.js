import getImageUrl from '../helpers/ImageFetcher';

class PeopleService {
  people = new Map();
  pages = new Map();
  count = 0;

  async getPeoplePage(page) {
    if (!this.pages.has(page)) {
      await this.fetchPeoplePage(page);
    }
    return this.pages.get(page);
  }

  async fetchPeoplePage(page) {
    const response = await fetch(`https://swapi.co/api/people/?page=${page}`);
    const data = await response.json();
    this.count = data.count;
    const people = data.results;
    await this.cachePeople(people);
    this.pages.set(page, people);
  }

  async getPersonById(id) {
    if (!this.people.has(id)) {
      await this.fetchPersonById(id);
    }
    return this.people.get(id);
  }

  async cachePeople(people) {
    const portraitUrls = await this.takeImages(people);
    for (let i = 0; i < people.length; i++) {
      const person = people[i];
      const portraitUrl = portraitUrls[i];
      person.portraitUrl =
        portraitUrl && portraitUrl !== 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg'
          ? portraitUrl
          : '../../anonymous.png';
      const id = +person.url.match(/\d+/)[0];
      person.personId = id;
      this.people.set(id, person);
    }
  }

  async fetchPersonById(id) {
    const response = await fetch(`https://swapi.co/api/people/${id}/`);
    const person = await response.json();
    await this.cacheFilms(Array.of(person));
  }

  takeImages(people) {
    const urls = people.map(person => {
      return getImageUrl(person.name);
    });
    return Promise.all(urls);
  }
}

export default PeopleService;
