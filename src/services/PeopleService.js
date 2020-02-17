import getImageUrl from '../helpers/ImageFetcher';

class PeopleService {
  people = new Map();
  pages = new Map();
  count = 0;

  constructor() {
    this.fetchPeoplePage(1);
  }

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
    const portraitUrls = await this.takeImages(people);
    for (let i = 0; i < people.length; i++) {
      const person = people[i];
      const portraitUrl = portraitUrls[i];
      if (!portraitUrl || portraitUrl === 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg') {
        person.portraitUrl = '../../anonymous.png';
      } else {
        person.portraitUrl = portraitUrl;
      }
      const id = +person.url.match(/\d+/)[0];
      person.personId = id;
      this.people.set(id, person);
    }
    this.pages.set(page, people);
  }

  takeImages(people) {
    const urls = people.map(person => {
      return getImageUrl(person.name);
    });
    return Promise.all(urls);
  }

  getCount() {
    return this.count;
  }
}

export default PeopleService;
