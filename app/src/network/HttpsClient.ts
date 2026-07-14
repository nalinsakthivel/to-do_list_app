import { BASE_URL } from '@/network/constants/ApiConstants';
import { LocalStore } from '@/storage/LocalStore';
import { logout } from '@/utils/SecurityUtils';
import axios from 'axios';

export const HttpsClient = axios.create({
  baseURL: BASE_URL,
});

HttpsClient.interceptors.request.use(config => {
  const token = LocalStore.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log('config', config.baseURL);

  return config;
});

HttpsClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      logout();
    }
    return Promise.reject(error);
  },
);
