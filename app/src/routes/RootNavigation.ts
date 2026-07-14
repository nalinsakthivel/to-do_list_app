import { createNavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from './NavigationParamList';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

type PendingAction = { type: 'navigate' | 'reset'; routeName: keyof RootStackParamList };

let pendingAction: PendingAction | null = null;

export const flushPendingNavigation = (): void => {
  if (!pendingAction || !navigationRef.isReady()) return;

  const action = pendingAction;
  pendingAction = null;

  if (action.type === 'navigate') {
    navigationRef.navigate(action.routeName as never);
  } else {
    navigationRef.reset({ index: 0, routes: [{ name: action.routeName as never }] });
  }
};

export const navigate = (name: keyof RootStackParamList): void => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never);
  } else {
    pendingAction = { type: 'navigate', routeName: name };
  }
};

export const reset = (routeName: keyof RootStackParamList): void => {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{ name: routeName as never }],
    });
  } else {
    pendingAction = { type: 'reset', routeName };
  }
};
