import axios from 'axios';
import { BASE_URL } from '@/network/constants/ApiConstants';
import { LocalStore } from '@/storage/LocalStore';
import { logout } from '@/utils/SecurityUtils';

export const HttpsClient = axios.create({
  baseURL: BASE_URL,
});

HttpsClient.interceptors.request.use((config) => {
  const token = LocalStore.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

HttpsClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logout();
    }
    return Promise.reject(error);
  }
);
