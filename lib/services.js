const Categories = require('./categories');

class Services extends Categories {
  constructor(client) {
    super(client);
    this.client = client;
  }

  async getServices() {
    const res = await this.client.fetchData('/api/v2/bookingapi/services');

    const data = await res.services;

    return data;
  }

  async getServicesWithCategory() {
    const categories = await this.getCategories();
    const services = await this.getServices();
   
    const servicesWithCategory = categories.service_categories
      .slice(1)
      .map((category) => {
        const services_in_category = services.filter((service) => {
          return category.serviceIdList.includes(service.key);
        });

        // sort services by price low to high
        services_in_category.sort((a, b) => {
          return a.cost - b.cost;
        });

        return {
          ...category,
          services: services_in_category,
        };
      });

    return servicesWithCategory;
  }
}

module.exports = Services;
