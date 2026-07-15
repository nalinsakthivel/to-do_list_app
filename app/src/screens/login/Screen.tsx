import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useScreen } from './useScreen';
import { AppStrings } from '@/constants/AppStrings';
import { Colors } from '@/constants/Colors';
import { Spacing, Radius, FontSize, FontWeight } from '@/constants/Theme';
import { keyboardAvoidingBehavior } from '@/utils/DeviceUtils';
import { navigate } from '@/routes/RootNavigation';
import { RouteEnum } from '@/enums/RouteEnum';
import { EyeIcon } from '@/components/icons/Icons';

const LoginScreen = () => {
  const { email, setEmail, password, setPassword, error, loading, handleLogin } = useScreen();
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<'email' | 'password' | null>(null);

  return (
    <KeyboardAvoidingView style={styles.container} behavior={keyboardAvoidingBehavior}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>{AppStrings.login.title}</Text>
          <Text style={styles.heroSubtitle}>{AppStrings.login.subtitle}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>{AppStrings.login.emailLabel}</Text>
          <TextInput
            style={[styles.input, focused === 'email' && styles.inputFocused]}
            placeholder={AppStrings.login.emailPlaceholder}
            placeholderTextColor={Colors.textMuted}
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            onFocus={() => setFocused('email')}
            onBlur={() => setFocused(null)}
          />

          <Text style={[styles.label, styles.labelSpacing]}>{AppStrings.login.passwordLabel}</Text>
          <View style={[styles.passwordRow, focused === 'password' && styles.inputFocused]}>
            <TextInput
              style={styles.passwordInput}
              placeholder={AppStrings.login.passwordPlaceholder}
              placeholderTextColor={Colors.textMuted}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              onFocus={() => setFocused('password')}
              onBlur={() => setFocused(null)}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword((v) => !v)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <EyeIcon color={showPassword ? Colors.primary : Colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
            {loading ? (
              <ActivityIndicator color={Colors.onPrimary} />
            ) : (
              <Text style={styles.buttonText}>{AppStrings.login.loginButton}</Text>
            )}
          </TouchableOpacity>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TouchableOpacity style={styles.linkButton} onPress={() => navigate(RouteEnum.REGISTER)}>
            <Text style={styles.link}>{AppStrings.login.registerPrompt}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flexGrow: 1,
  },
  hero: {
    backgroundColor: Colors.primary,
    paddingTop: Spacing.xl * 2.5,
    paddingBottom: Spacing.xl * 2,
    paddingHorizontal: Spacing.lg,
  },
  heroTitle: {
    color: Colors.onPrimary,
    fontSize: FontSize.heading,
    fontWeight: FontWeight.bold,
  },
  heroSubtitle: {
    color: Colors.primaryTint,
    fontSize: 14,
    marginTop: Spacing.xs,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Spacing.lg,
    padding: Spacing.lg,
    marginHorizontal: Spacing.md,
    marginTop: -Spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  label: {
    fontSize: FontSize.caption,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
    fontWeight: FontWeight.medium,
  },
  labelSpacing: {
    marginTop: Spacing.md,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.input,
    paddingHorizontal: Spacing.md,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
    backgroundColor: Colors.surface,
  },
  inputFocused: {
    borderColor: Colors.primary,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.input,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.surface,
  },
  passwordInput: {
    flex: 1,
    fontSize: FontSize.body,
    color: Colors.textPrimary,
  },
  eyeButton: {
    paddingLeft: Spacing.sm,
    minWidth: 32,
    minHeight: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 52,
    backgroundColor: Colors.primary,
    borderRadius: Radius.button,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.lg,
  },
  buttonText: {
    color: Colors.onPrimary,
    fontSize: 16,
    fontWeight: FontWeight.semibold,
  },
  error: {
    color: Colors.danger,
    fontSize: FontSize.caption,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
  linkButton: {
    marginTop: Spacing.lg,
    alignItems: 'center',
    minHeight: 44,
    justifyContent: 'center',
  },
  link: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: FontWeight.medium,
  },
});

export default LoginScreen;
