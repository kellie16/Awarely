import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-red-50 p-6 text-slate-800 font-sans">
                    <div className="max-w-2xl bg-white p-8 rounded-2xl shadow-xl border border-red-100">
                        <h1 className="text-3xl font-bold text-red-600 mb-4">Something went wrong</h1>
                        <p className="text-slate-600 mb-6">The application crashed. Here is the error details:</p>

                        <div className="bg-slate-900 text-red-300 p-4 rounded-lg overflow-auto text-sm font-mono mb-6">
                            <p className="font-bold mb-2">{this.state.error && this.state.error.toString()}</p>
                            <pre className="text-slate-400 whitespace-pre-wrap">
                                {this.state.errorInfo && this.state.errorInfo.componentStack}
                            </pre>
                        </div>

                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                        >
                            Reload Application
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
