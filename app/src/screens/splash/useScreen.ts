import { RouteEnum } from '@/enums/RouteEnum';
import { reset } from '@/routes/RootNavigation';
import { LocalStore } from '@/storage/LocalStore';
import { useAuthStore } from '@/stores/hooks/useAuthStore';
import { useEffect } from 'react';

export const useScreen = () => {
  useEffect(() => {
    const token = LocalStore.getToken();
    console.log('token >>', token);
    const user = LocalStore.getUser();
    console.log('user >>', user);

    if (token && user) {
      useAuthStore.getState().setAuth(user, token);
      reset(RouteEnum.TASK_LIST);
    } else {
      reset(RouteEnum.LOGIN);
    }
  }, []);
};
