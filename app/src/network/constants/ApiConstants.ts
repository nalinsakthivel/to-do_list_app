import { API_BASE_URL } from '@env';

export const BASE_URL = API_BASE_URL;

export const API = {
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  TASKS: '/api/tasks',
  TASK_BY_ID: (id: string) => `/api/tasks/${id}`,
};
