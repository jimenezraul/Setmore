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

  async createCustomer({ given_name, family_name, email, picture, phone }) {
    const customer = {
      first_name: `${given_name}`,
      last_name: `${family_name}`,
      email_id: `${email}`,
      image_url: `${picture}`,
      cell_phone: `${phone}}`,
    };

    const res = await this.client.fetchData(
      '/api/v2/bookingapi/customer/create',
      {
        method: 'POST',
        body: JSON.stringify(customer),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return res;
  }
}

module.exports = Customers;
