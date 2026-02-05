import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Catches render errors in the tree and shows a fallback UI so the app doesn't white-screen.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 bg-background text-foreground">
          <h1 className="text-xl font-semibold">Something went wrong</h1>
          <p className="text-muted-foreground text-center max-w-md">
            An error occurred. Try refreshing the page. If it persists, check the console for details.
          </p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90"
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
