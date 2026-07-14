import { useState } from 'react';
import { useLoginMutation } from '@/network/hooks/useAuthMutations';
import { LocalStore } from '@/storage/LocalStore';
import { useAuthStore } from '@/stores/hooks/useAuthStore';
import { RouteEnum } from '@/enums/RouteEnum';
import { reset } from '@/routes/RootNavigation';
import { parseAxiosError } from '@/utils/ErrorHandlerUtils';

export const useScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const loginMutation = useLoginMutation();

  const handleLogin = () => {
    setError('');
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          LocalStore.setToken(data.token);
          LocalStore.setUser(data.user);
          useAuthStore.getState().setAuth(data.user, data.token);
          reset(RouteEnum.TASK_LIST);
        },
        onError: (err) => {
          setError(parseAxiosError(err));
        },
      }
    );
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading: loginMutation.isPending,
    handleLogin,
  };
};
