import { useState } from 'react';
import { useLoginMutation, useRegisterMutation } from '@/network/hooks/useAuthMutations';
import { LocalStore } from '@/storage/LocalStore';
import { useAuthStore } from '@/stores/hooks/useAuthStore';
import { parseAxiosError } from '@/utils/ErrorHandlerUtils';

export const useAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'login' | 'register'>('login');

  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();

  const onAuthSuccess = (data: { token: string; user: { id: string; email: string } }) => {
    LocalStore.setToken(data.token);
    LocalStore.setUser(data.user);
    useAuthStore.getState().setAuth(data.user, data.token);
  };

  const handleSubmit = () => {
    setError('');
    const mutation = mode === 'login' ? loginMutation : registerMutation;
    mutation.mutate(
      { email, password },
      {
        onSuccess: onAuthSuccess,
        onError: (err) => setError(parseAxiosError(err)),
      }
    );
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    mode,
    setMode,
    loading: loginMutation.isPending || registerMutation.isPending,
    handleSubmit,
  };
};
