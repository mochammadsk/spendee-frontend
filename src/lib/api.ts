import axios from 'axios';

const api = axios.create({
  baseURL: 'https://spendee-api.vercel.app/api',
  withCredentials: true,
  timeout: 30000,
});

export default api;
