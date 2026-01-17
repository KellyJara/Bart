import axios,{ AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.83:4000/api', // Android emulator
  headers: {
    'Content-Type': 'application/json',
  },
});

/*api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem('token');

  if (token && config.headers) {
    config.headers['x-access-token'] = token;
  }

  return config;
});*/

export default api;
