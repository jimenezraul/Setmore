const axios = require('axios');

class Client {
  constructor(refreshToken, baseUrl) {
    this.refreshToken = refreshToken;
    this.auth = null;
    this.baseUrl = baseUrl || '';
    this.authPath = '/api/v2/o/oauth2/token?refreshToken=';
  }

  async fetchData(url, options) {
    try {
      const response = await axios(this.baseUrl + url, {
        headers: {
          Authorization: `Bearer ${this.auth}`,
          ...options?.headers,
        },
        method: options?.method || 'GET',
        data: options?.body,
      });

      const data = await response.data;

      return data.data;
    } catch (error) {
      if (error?.response?.statusText === 'Unauthorized') {
        await this.refreshAccessToken();
        return this.fetchData(url, options);
      } else {
        console.log(error);
      }
    }
  }

  setAuth(auth) {
    this.auth = auth;
  }

  async refreshAccessToken() {
    try {
      const response = await axios(
        this.baseUrl + this.authPath + this.refreshToken,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.data;
      this.setAuth(data.data.token.access_token);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Client;
