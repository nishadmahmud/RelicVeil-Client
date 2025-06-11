import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        // Add logout logic here
        setIsAuthenticated(false);
        setUser(null);
        navigate('/');
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    const navLinkStyles = (path) => `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
        isActive(path)
            ? 'text-blue-600 bg-blue-50'
            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
    }`;

    const mobileLinkStyles = (path) => `block px-3 py-2 rounded-md text-base font-medium ${
        isActive(path)
            ? 'text-blue-600 bg-blue-50'
            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
    }`;

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${
            isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and Brand */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex-shrink-0"
                    >
                        <Link to="/" className="flex items-center">
                            <span className="text-2xl font-bold text-blue-600">Relic</span>
                            <span className="text-2xl font-light text-blue-400">Veil</span>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-4">
                            <Link to="/" className={navLinkStyles('/')}>
                                Home
                            </Link>
                            <Link to="/all-arrifacts" className={navLinkStyles('/all-arrifacts')}>
                                All Artifacts
                            </Link>
                            <Link to="/add-artifact" className={navLinkStyles('/add-artifact')}>
                                Add Artifact
                            </Link>
                        </div>
                    </div>

                    {/* Authentication Section */}
                    <div className="hidden md:block">
                        {!isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                <Link
                                    to="/login"
                                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
                                        isActive('/login')
                                            ? 'text-white bg-blue-700'
                                            : 'text-white bg-blue-600 hover:bg-blue-700'
                                    } transition-colors duration-300`}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className={`inline-flex items-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-md ${
                                        isActive('/register')
                                            ? 'bg-blue-50 text-blue-700'
                                            : 'text-blue-600 hover:bg-blue-50'
                                    } transition-colors duration-300`}
                                >
                                    Register
                                </Link>
                            </div>
                        ) : (
                            <div className="relative">
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="flex items-center space-x-2 focus:outline-none"
                                >
                                    <img
                                        src={user?.photoURL || '/default-avatar.png'}
                                        alt="Profile"
                                        className="h-8 w-8 rounded-full object-cover"
                                    />
                                </button>

                                {/* Dropdown Menu */}
                                {isOpen && (
                                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transform origin-top-right transition-transform duration-200 ease-out">
                                        <div className="py-1">
                                            <div className="px-4 py-2 text-sm text-gray-700 border-b">
                                                {user?.displayName}
                                            </div>
                                            <Link
                                                to="/my-artifacts"
                                                className={`block px-4 py-2 text-sm ${
                                                    isActive('/my-artifacts')
                                                        ? 'text-blue-600 bg-blue-50'
                                                        : 'text-gray-700 hover:bg-gray-100'
                                                }`}
                                            >
                                                My Artifacts
                                            </Link>
                                            <Link
                                                to="/liked-artifacts"
                                                className={`block px-4 py-2 text-sm ${
                                                    isActive('/liked-artifacts')
                                                        ? 'text-blue-600 bg-blue-50'
                                                        : 'text-gray-700 hover:bg-gray-100'
                                                }`}
                                            >
                                                Liked Artifacts
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-lg">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            to="/"
                            className={mobileLinkStyles('/')}
                        >
                            Home
                        </Link>
                        <Link
                            to="/all-arrifacts"
                            className={mobileLinkStyles('/all-arrifacts')}
                        >
                            All Artifacts
                        </Link>
                        <Link
                            to="/add-artifact"
                            className={mobileLinkStyles('/add-artifact')}
                        >
                            Add Artifact
                        </Link>
                        {isAuthenticated && (
                            <>
                                <Link
                                    to="/my-artifacts"
                                    className={mobileLinkStyles('/my-artifacts')}
                                >
                                    My Artifacts
                                </Link>
                                <Link
                                    to="/liked-artifacts"
                                    className={mobileLinkStyles('/liked-artifacts')}
                                >
                                    Liked Artifacts
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                        {!isAuthenticated && (
                            <div className="space-y-1">
                                <Link
                                    to="/login"
                                    className={`block px-3 py-2 rounded-md text-base font-medium text-white ${
                                        isActive('/login')
                                            ? 'bg-blue-700'
                                            : 'bg-blue-600 hover:bg-blue-700'
                                    }`}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                                        isActive('/register')
                                            ? 'bg-blue-50 text-blue-700 border border-blue-600'
                                            : 'text-blue-600 border border-blue-600 hover:bg-blue-50'
                                    }`}
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;