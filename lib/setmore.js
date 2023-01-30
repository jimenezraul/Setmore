const Client = require('./Client');
const Appointments = require('./appointments');

class Setmore {
  constructor(refreshToken) {
    this.baseURL = 'https://developer.setmore.com';
    this.client = new Client(refreshToken, this.baseURL);
    this.appointments = new Appointments(this.client);
  }
}

module.exports = Setmore;
