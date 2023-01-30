class Staff {
  constructor(client) {
    this.client = client;
  }

  async getStaff() {
    const res = await this.client.fetchData('/api/v2/bookingapi/staffs');
    return res;
  }
}

module.exports = Staff;
