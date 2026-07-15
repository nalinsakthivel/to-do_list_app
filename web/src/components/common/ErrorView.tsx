import { AppStrings } from '@/constants/AppStrings';

type ErrorViewProps = {
  message?: string;
  onRetry?: () => void;
};

const ErrorView = ({ message, onRetry }: ErrorViewProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        gap: 16,
      }}
    >
      <span style={{ color: 'red' }}>{message ?? AppStrings.common.somethingWentWrong}</span>
      {onRetry ? (
        <button onClick={onRetry} style={{ padding: '10px 20px' }}>
          {AppStrings.common.retry}
        </button>
      ) : null}
    </div>
  );
};

export default ErrorView;
