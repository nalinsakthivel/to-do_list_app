import { LocalStore } from '@/storage/LocalStore';
import { useAuthStore } from '@/stores/hooks/useAuthStore';
import { useTaskStore } from '@/stores/hooks/useTaskStore';

export const logout = (): void => {
  LocalStore.clearToken();
  LocalStore.clearUser();
  useAuthStore.getState().clearAuth();
  useTaskStore.getState().setTasks([]);
};
