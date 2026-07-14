import { createNavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from './NavigationParamList';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const navigate = (name: keyof RootStackParamList): void => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never);
  }
};

export const reset = (routeName: keyof RootStackParamList): void => {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{ name: routeName as never }],
    });
  }
};
