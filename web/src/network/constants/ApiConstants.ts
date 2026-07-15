export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API = {
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  TASKS: '/api/tasks',
  TASK_BY_ID: (id: string) => `/api/tasks/${id}`,
};
