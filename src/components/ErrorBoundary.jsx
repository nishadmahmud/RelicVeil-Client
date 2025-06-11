import { useRouteError } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const ErrorBoundary = () => {
    const error = useRouteError();

    return (
        <div className="min-h-screen bg-[#F5F5DC] flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
                <FaExclamationTriangle className="text-6xl text-[#8B4513] mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-[#2C1810] mb-4 font-[Cinzel]">
                    Oops! Something went wrong
                </h1>
                <p className="text-[#5C4033] mb-6">
                    {error?.message || "An unexpected error occurred"}
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-[#8B4513] text-white rounded-md hover:bg-[#654321] transition-colors duration-300"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
};

export default ErrorBoundary; 