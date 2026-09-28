import { Alert, Button } from 'antd';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <Alert
      type="error"
      showIcon
      title={message}
      style={{ margin: '32px 0' }}
      action={onRetry && (
        <Button size="small" danger onClick={onRetry}>
          Reintentar
        </Button>
      )}
    />
  );
}