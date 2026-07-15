import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AppStrings } from '@/constants/AppStrings';

const Login = () => {
  const { email, setEmail, password, setPassword, error, mode, setMode, loading, handleSubmit } =
    useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const isLogin = mode === 'login';

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">✓</div>
        <h1 className="login-title">
          {isLogin ? AppStrings.login.title : AppStrings.login.registerTitle}
        </h1>
        <p className="login-subtitle">
          {isLogin ? AppStrings.login.subtitle : AppStrings.login.registerSubtitle}
        </p>

        <label className="field-label" htmlFor="email">
          {AppStrings.login.emailLabel}
        </label>
        <input
          id="email"
          className="field-input"
          placeholder={AppStrings.login.emailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="field-label field-spacing" htmlFor="password">
          {AppStrings.login.passwordLabel}
        </label>
        <div className="password-row">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder={AppStrings.login.passwordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
          <button
            type="button"
            className="eye-button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label="Toggle password visibility"
          >
            👁
          </button>
        </div>

        <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
          {loading ? '…' : isLogin ? AppStrings.login.loginButton : AppStrings.login.registerButton}
        </button>

        {error ? <p className="auth-error">{error}</p> : null}

        <button className="auth-link" onClick={() => setMode(isLogin ? 'register' : 'login')}>
          {isLogin ? AppStrings.login.toRegister : AppStrings.login.toLogin}
        </button>
      </div>
    </div>
  );
};

export default Login;
