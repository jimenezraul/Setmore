class Customers {
  constructor(client) {
    this.client = client;
  }

  async getCustomer(user) {
    const customers = await this.client.fetchData(
      `/api/v2/bookingapi/customer?firstname=${user.givenName}&email=${user.email}`
    );
    
    const customer = customers.customer.filter((customer) => {
      return customer.email_id === user.email;
    });

    return customer;
  }
}

module.exports = Customers;
