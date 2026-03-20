import { Component } from 'react';

class ErrorBoundary extends Component {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error("App error:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    fontFamily: 'Inter, sans-serif',
                    color: '#343434'
                }}>
                    <p style={{ fontSize: '20px', fontWeight: 300 }}>
                        Something went wrong. Please refresh the page.
                    </p>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;