const axios = require('axios');
const axios_auth_refresh = require('axios-auth-refresh');

function client(baseURL, refreshToken) {
  if (!refreshToken) {
    throw new Error('Refresh Token is required');
  }

  let accessToken;

  const client = axios.create({
    baseURL,
  });

  const REFRESH_TOKEN_URL = '/api/v1/oauth/token';

  const addAuthHeader = (config) => {
    if (!accessToken) {
      accessToken = getAccessToken();
    }
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  };

  const getAccessToken = async () => {
    try {
      const response = await client.post(REFRESH_TOKEN_URL, {
        params: {
          refresh_token: refreshToken,
        },
      });

      if (!response.data.data.token) {
        throw new Error('Refresh Token is invalid');
      }

      return response.data.data.token.access_token;
    } catch (error) {
      throw new Error(error);
    }
  };

  const refreshAuthLogic = async (failedRequest) => {
    accessToken = await getAccessToken();
    addAuthHeader(failedRequest.config);
    return Promise.resolve();
  };

  axios_auth_refresh(client, refreshAuthLogic);

  client.interceptors.request.use((config) => {
    if (config.url === REFRESH_TOKEN_URL) {
      return addAuthHeader(config);
    }
    return config;
  });
}

export default client;
