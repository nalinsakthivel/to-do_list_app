import Config from 'react-native-config';

export const BASE_URL = Config.API_BASE_URL;

export const API = {
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  TASKS: '/api/tasks',
  TASK_BY_ID: (id: string) => `/api/tasks/${id}`,
};
