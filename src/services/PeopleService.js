import getImageUrl from '../helpers/ImageFetcher';

class PeopleService {
  people = new Map();
  pageSize = 10;
  count = Infinity;

  constructor() {
    this.fetchPeoplePage(1);
  }

  async getPeoplePage(page) {
    const peoplePage = [];
    console.log('from ' + ((page - 1) * this.pageSize + 1) + ' to ' + Math.min(page * this.pageSize, this.count));
    for (let i = (page - 1) * this.pageSize + 1; i <= Math.min(page * this.pageSize, this.count); i++) {
      if (this.people.has(i)) {
        peoplePage.push(this.people.get(i));
      } else {
        return await this.fetchPeoplePage(page);
      }
    }
    return peoplePage;
  }

  async fetchPeoplePage(page) {
    const response = await fetch(`https://swapi.co/api/people/?page=${page}`);
    const data = await response.json();
    this.count = data.count;
    const people = data.results;
    const portraitUrls = await this.takeImages(people);
    for (let i = 0; i < people.length; i++) {
      const person = people[i];
      person.portraitUrl = portraitUrls[i];
      const id = +person.url.match(/\d+/)[0];
      person.personId = id;
      this.people.set(id, person);
    }
    return people;
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
