import React from "react";

import { ErrorFallback } from "./ErrorFallback";

interface Props {
    children: React.ReactNode;
}

interface State {
    error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            error: undefined,
        };
    }

    static getDerivedStateFromError(error: Error): State {
        return { error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // eslint-disable-next-line no-console
        console.error("rmy errrorr:", error, errorInfo);

        // هنا ممكن تبعت error لـ logging service مستقبلاً
        // example:
        // logger.error(error)
    }

    reset = () => {
        this.setState({ error: undefined });

        window.location.reload();
    };

    render() {
        if (this.state.error) {
            return (
                <ErrorFallback
                    error={this.state.error}
                    reset={this.reset}
                />
            );
        }

        return this.props.children;
    }
}

