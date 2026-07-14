import { useEffect } from 'react';
import { LocalStore } from '@/storage/LocalStore';
import { useAuthStore } from '@/stores/hooks/useAuthStore';
import { RouteEnum } from '@/enums/RouteEnum';
import { reset } from '@/routes/RootNavigation';

export const useScreen = () => {
  useEffect(() => {
    const token = LocalStore.getToken();
    const user = LocalStore.getUser();

    if (token && user) {
      useAuthStore.getState().setAuth(user, token);
      reset(RouteEnum.TASK_LIST);
    } else {
      reset(RouteEnum.LOGIN);
    }
  }, []);
};
