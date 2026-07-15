import { useAuth } from '@/hooks/useAuth';
import { AppStrings } from '@/constants/AppStrings';

const Login = () => {
  const { email, setEmail, password, setPassword, error, mode, setMode, loading, handleSubmit } =
    useAuth();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div style={{ width: 320 }}>
        <h1 style={{ textAlign: 'center', marginBottom: 32 }}>{AppStrings.login.title}</h1>

        <input
          style={{ width: '100%', padding: 12, marginBottom: 12, borderRadius: 8, border: '1px solid #ccc' }}
          placeholder={AppStrings.login.emailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={{ width: '100%', padding: 12, marginBottom: 12, borderRadius: 8, border: '1px solid #ccc' }}
          type="password"
          placeholder={AppStrings.login.passwordPlaceholder}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error ? <p style={{ color: 'red', textAlign: 'center' }}>{error}</p> : null}

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: '100%',
            padding: 14,
            borderRadius: 8,
            background: '#111',
            color: '#fff',
            fontWeight: 600,
            marginTop: 8,
          }}
        >
          {loading ? '…' : mode === 'login' ? AppStrings.login.loginButton : 'Sign Up'}
        </button>

        <p
          onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
          style={{ textAlign: 'center', marginTop: 20, cursor: 'pointer' }}
        >
          {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Login'}
        </p>
      </div>
    </div>
  );
};

export default Login;
