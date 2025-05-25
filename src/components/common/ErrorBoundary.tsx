import { Component, type ErrorInfo, type ReactNode } from 'react';
import styled from 'styled-components';
import { Button } from './Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  background: ${({ theme }) => theme.colors.secondary}10;
  border: 1px solid ${({ theme }) => theme.colors.secondary}30;
  border-radius: 12px;
  margin: 1rem;
`;

const ErrorTitle = styled.h2`
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const ErrorMessage = styled.pre`
  background: ${({ theme }) => theme.colors.primary}20;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  max-width: 100%;
  font-family: monospace;
  font-size: 0.875rem;
  margin: 1rem 0;
  white-space: pre-wrap;
  word-break: break-word;
`;

const ErrorStack = styled.pre`
  background: ${({ theme }) => theme.colors.primary}10;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  max-width: 100%;
  font-family: monospace;
  font-size: 0.75rem;
  margin: 1rem 0;
  white-space: pre-wrap;
  word-break: break-word;
  max-height: 200px;
  overflow-y: auto;
`;

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);

    // Call the onError callback if provided
    this.props.onError?.(error, errorInfo);
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // If a fallback is provided, use it
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Otherwise, render the default error UI
      return (
        <ErrorContainer>
          <ErrorTitle>Something went wrong</ErrorTitle>
          <ErrorMessage>{this.state.error?.message}</ErrorMessage>
          {process.env.NODE_ENV === 'development' && this.state.error?.stack && (
            <ErrorStack>{this.state.error.stack}</ErrorStack>
          )}
          <Button variant="secondary" onClick={this.handleReset} leftIcon="🔄">
            Try again
          </Button>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}
