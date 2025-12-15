import axios from 'axios';
import { useToast } from 'vue-toast-notification';

const api = axios.create({
  baseURL: 'https://spendee-api.vercel.app/api',
  withCredentials: true,
  timeout: 30000,
});

// Interceptors
const toast = useToast();
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (!err.response) {
      toast.error('Terjadi kesalahan. Silakan coba lagi.', {
        position: 'top',
        duration: 2500,
      });
    } else {
      // Nothing
    }
    return Promise.reject(err);
  },
);

export default api;
