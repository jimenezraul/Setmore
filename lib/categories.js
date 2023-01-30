class Categories {
  constructor(client) {
    this.client = client;
  }

  async getCategories() {
    const res = await this.client.fetchData(
      '/api/v1/bookingapi/services/categories'
    );

    return res;
  }
}

module.exports = Categories;
