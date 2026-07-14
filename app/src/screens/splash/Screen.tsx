import { useScreen } from './useScreen';
import LoadingView from '@/components/common/LoadingView';

const SplashScreen = () => {
  useScreen();

  return <LoadingView />;
};

export default SplashScreen;
