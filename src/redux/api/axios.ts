import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {URL_BACKEND} from '@env';

const api = axios.create({
  baseURL: URL_BACKEND,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');

    console.log('TOKEN ENVIADO DESDE AXIOS:', token);

    if (token && config.headers) {
      config.headers['x-access-token'] = token; // ✅ STRING
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

