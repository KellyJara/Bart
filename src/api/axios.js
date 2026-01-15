import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.83:4000/api', // Android emulator
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
