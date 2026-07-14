import {
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useScreen } from './useScreen';
import { AppStrings } from '@/constants/AppStrings';
import { keyboardAvoidingBehavior } from '@/utils/DeviceUtils';
import { navigate } from '@/routes/RootNavigation';
import { RouteEnum } from '@/enums/RouteEnum';

const RegisterScreen = () => {
  const { email, setEmail, password, setPassword, error, loading, handleRegister } = useScreen();

  return (
    <KeyboardAvoidingView style={styles.container} behavior={keyboardAvoidingBehavior}>
      <Text style={styles.title}>{AppStrings.register.title}</Text>

      <TextInput
        style={styles.input}
        placeholder={AppStrings.register.emailPlaceholder}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder={AppStrings.register.passwordPlaceholder}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>{AppStrings.register.registerButton}</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigate(RouteEnum.LOGIN)}>
        <Text style={styles.link}>{AppStrings.register.loginPrompt}</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#111',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  link: {
    textAlign: 'center',
    marginTop: 20,
    color: '#111',
  },
});

export default RegisterScreen;
