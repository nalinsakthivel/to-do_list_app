import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppStrings } from '@/constants/AppStrings';

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
    padding: 24,
  },
  message: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#111',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default ErrorView;
