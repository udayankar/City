import React from "react";

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
        window.location.href = "/";
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary-cont" role="alert">
                    <h2>Something went wrong</h2>
                    <p>We encountered an unexpected error while rendering this page.</p>
                    <button className="error-reset-btn" onClick={this.handleReset}>
                        Return to Home
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

export const ErrorMessage = ({ message, onRetry }) => {
    if (!message) return null;
    return (
        <div className="error-message-box" role="alert">
            <span className="error-message-text">⚠️ {message}</span>
            {onRetry && (
                <button className="error-retry-btn" onClick={onRetry}>
                    Retry
                </button>
            )}
        </div>
    );
};

export default ErrorBoundary;
