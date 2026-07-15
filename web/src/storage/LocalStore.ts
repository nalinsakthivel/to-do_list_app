import { STORAGE_KEYS } from './StorageKeys';
import type { User } from '@/types';

export const LocalStore = {
  getToken: (): string | null => localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN),
  setToken: (token: string): void => localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token),
  clearToken: (): void => localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN),

  getUser: (): User | null => {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    return raw ? (JSON.parse(raw) as User) : null;
  },
  setUser: (user: User): void => localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user)),
  clearUser: (): void => localStorage.removeItem(STORAGE_KEYS.USER),
};
