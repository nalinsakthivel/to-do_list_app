import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useScreen } from './useScreen';
import { Colors } from '@/constants/Colors';
import { Spacing, FontSize, FontWeight } from '@/constants/Theme';
import { AppStrings } from '@/constants/AppStrings';
import { CheckmarkIcon } from '@/components/icons/Icons';

const SplashScreen = () => {
  useScreen();

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <View style={styles.logo}>
          <CheckmarkIcon size={40} color={Colors.primary} />
        </View>
        <Text style={styles.appName}>{AppStrings.splash.appName}</Text>
        <Text style={styles.tagline}>{AppStrings.splash.tagline}</Text>
      </View>

      <View style={styles.loaderWrap}>
        <ActivityIndicator color={Colors.onPrimary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: Spacing.lg,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  appName: {
    color: Colors.onPrimary,
    fontSize: FontSize.splashTitle,
    fontWeight: FontWeight.bold,
  },
  tagline: {
    color: Colors.primaryTint,
    fontSize: 14,
    marginTop: Spacing.sm,
  },
  loaderWrap: {
    position: 'absolute',
    bottom: Spacing.xl + Spacing.lg,
  },
});

export default SplashScreen;
