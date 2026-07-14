import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RouteEnum } from '@/enums/RouteEnum';
import { RootStackParamList } from './NavigationParamList';
import { navigationRef, flushPendingNavigation } from './RootNavigation';
import SplashScreen from '@/screens/splash/Screen';
import LoginScreen from '@/screens/login/Screen';
import RegisterScreen from '@/screens/register/Screen';
import TaskListScreen from '@/screens/taskList/Screen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Router = () => {
  return (
    <NavigationContainer ref={navigationRef} onReady={flushPendingNavigation}>
      <Stack.Navigator
        initialRouteName={RouteEnum.SPLASH}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name={RouteEnum.SPLASH} component={SplashScreen} />
        <Stack.Screen name={RouteEnum.LOGIN} component={LoginScreen} />
        <Stack.Screen name={RouteEnum.REGISTER} component={RegisterScreen} />
        <Stack.Screen name={RouteEnum.TASK_LIST} component={TaskListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
