class Setmore {
  constructor(refreshToken) {
    this.baseURL = 'https://developer.setmore.com';
    this.client = client(this.baseURL, refreshToken);
  }
}

export default Setmore;
