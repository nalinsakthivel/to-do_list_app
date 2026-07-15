import axios from 'axios';

export const parseAxiosError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? 'Request failed';
  }
  return 'Something went wrong';
};
