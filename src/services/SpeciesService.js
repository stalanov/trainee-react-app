class SpeciesService {
  species = new Map();
  pages = new Map();
  count = 0;

  async getSpeciesPage(page) {
    if (!this.pages.has(page)) {
      await this.fetchSpeciesPage(page);
    }
    return this.pages.get(page);
  }

  async fetchSpeciesPage(page) {
    const response = await fetch(`https://swapi.dev/api/species/?page=${page}`);
    const data = await response.json();
    this.count = data.count;
    const species = data.results;
    await this.cacheSpecies(species);
    this.pages.set(page, species);
  }

  async getSpecieById(id) {
    if (!this.species.has(id)) {
      await this.fetchSpecieById(id);
    }
    return this.species.get(id);
  }

  async cacheSpecies(species) {
    for (let i = 0; i < species.length; i++) {
      const specie = species[i];
      const id = +specie.url.match(/\d+/)[0];
      specie.specieId = id;
      this.species.set(id, specie);
    }
  }

  async fetchSpecieById(id) {
    const response = await fetch(`https://swapi.dev/api/species/${id}/`);
    const specie = await response.json();
    await this.cacheSpecies(Array.of(specie));
  }
}

export default SpeciesService;
