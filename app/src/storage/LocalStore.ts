import { STORAGE_KEYS } from './StorageKeys';
import { User } from '@/types';
import { storage } from './MMKV';

export const LocalStore = {
  getToken: (): string | null =>
    storage.getString(STORAGE_KEYS.AUTH_TOKEN) ?? null,
  setToken: (token: string): void =>
    storage.set(STORAGE_KEYS.AUTH_TOKEN, token),
  clearToken: (): void => {
    storage.remove(STORAGE_KEYS.AUTH_TOKEN);
  },

  getUser: (): User | null => {
    const raw = storage.getString(STORAGE_KEYS.USER);
    return raw ? (JSON.parse(raw) as User) : null;
  },
  setUser: (user: User): void =>
    storage.set(STORAGE_KEYS.USER, JSON.stringify(user)),
  clearUser: (): void => {
    storage.remove(STORAGE_KEYS.USER);
  },
};
