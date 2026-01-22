import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://192.168.1.83:4000/api',
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

