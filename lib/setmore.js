const Client = require('./Client');
const Appointments = require('./appointments');
const Customers = require('./customers');
const Services = require('./services');
const Categories = require('./categories');
const Staff = require('./staff');

class Setmore {
  constructor(refreshToken) {
    this.baseURL = 'https://developer.setmore.com';
    this.client = new Client(refreshToken, this.baseURL);
    this.appointments = new Appointments(this.client);
    this.customers = new Customers(this.client);
    this.services = new Services(this.client);
    this.Categories = new Categories(this.client);
    this.staff = new Staff(this.client);
  }
}

module.exports = Setmore;
