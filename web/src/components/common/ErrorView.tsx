import { AppStrings } from '@/constants/AppStrings';

type ErrorViewProps = {
  message?: string;
  onRetry?: () => void;
};

const ErrorView = ({ message, onRetry }: ErrorViewProps) => {
  return (
    <div className="fullscreen">
      <span className="error-text">{message ?? AppStrings.common.somethingWentWrong}</span>
      {onRetry ? (
        <button className="btn-retry" onClick={onRetry}>
          {AppStrings.common.retry}
        </button>
      ) : null}
    </div>
  );
};

export default ErrorView;
