import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppStrings } from '@/constants/AppStrings';
import { Colors } from '@/constants/Colors';
import { Spacing, Radius, FontSize, FontWeight } from '@/constants/Theme';

type ErrorViewProps = {
  message?: string;
  onRetry?: () => void;
};

const ErrorView = ({ message, onRetry }: ErrorViewProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message ?? AppStrings.common.somethingWentWrong}</Text>
      {onRetry ? (
        <TouchableOpacity style={styles.button} onPress={onRetry}>
          <Text style={styles.buttonText}>{AppStrings.common.retry}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
    backgroundColor: Colors.background,
  },
  message: {
    color: Colors.danger,
    fontSize: FontSize.body,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.button,
    paddingVertical: Spacing.sm + Spacing.xs,
    paddingHorizontal: Spacing.lg,
    minHeight: 44,
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.onPrimary,
    fontSize: FontSize.body,
    fontWeight: FontWeight.semibold,
  },
});

export default ErrorView;
