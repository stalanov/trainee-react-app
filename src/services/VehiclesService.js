class VehiclesService {
  vehicles = new Map();
  pages = new Map();
  count = 0;

  async getVehiclesPage(page) {
    if (!this.pages.has(page)) {
      await this.fetchVehiclesPage(page);
    }
    return this.pages.get(page);
  }

  async fetchVehiclesPage(page) {
    const response = await fetch(`https://swapi.dev/api/vehicles/?page=${page}`);
    const data = await response.json();
    this.count = data.count;
    const species = data.results;
    await this.cacheVehicles(species);
    this.pages.set(page, species);
  }

  async getVehicleById(id) {
    if (!this.vehicles.has(id)) {
      await this.fetchVehicleById(id);
    }
    return this.vehicles.get(id);
  }

  async cacheVehicles(vehicles) {
    for (let i = 0; i < vehicles.length; i++) {
      const vehicle = vehicles[i];
      const id = +vehicle.url.match(/\d+/)[0];
      vehicle.vehicleId = id;
      this.vehicles.set(id, vehicle);
    }
  }

  async fetchVehicleById(id) {
    const response = await fetch(`https://swapi.dev/api/vehicles/${id}/`);
    const vehicle = await response.json();
    await this.cacheVehicles(Array.of(vehicle));
  }
}

export default VehiclesService;
