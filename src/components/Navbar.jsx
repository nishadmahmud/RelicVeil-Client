import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../auth/AuthProvider';
import { toast } from 'react-hot-toast';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { user, logOut } = useContext(AuthContext);
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

    const handleLogout = async () => {
        try {
            await logOut();
            toast.success('Successfully logged out!');
            navigate('/');
        } catch (error) {
            toast.error('Error logging out');
        }
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    const navLinkStyles = (path) => `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
        isActive(path)
            ? 'text-[#DAA520] bg-[#2C1810]/5'
            : 'text-[#2C1810] hover:text-[#8B4513] hover:bg-[#F5F5DC]'
    }`;

    const mobileLinkStyles = (path) => `block px-3 py-2 rounded-md text-base font-medium ${
        isActive(path)
            ? 'text-[#DAA520] bg-[#2C1810]/5'
            : 'text-[#2C1810] hover:text-[#8B4513] hover:bg-[#F5F5DC]'
    }`;

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 font-[Cinzel] ${
            isScrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-sm'
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
                            <span className="text-2xl font-bold text-[#8B4513]">Relic</span>
                            <span className="text-2xl font-light text-[#DAA520]">Veil</span>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-4">
                            <Link to="/" className={navLinkStyles('/')}>
                                Home
                            </Link>
                            <Link to="/all-artifacts" className={navLinkStyles('/all-artifacts')}>
                                All Artifacts
                            </Link>
                            <Link to="/add-artifact" className={navLinkStyles('/add-artifact')}>
                                Add Artifact
                            </Link>
                        </div>
                    </div>

                    {/* Authentication Section */}
                    <div className="hidden md:block">
                        {!user && (
                            <div className="flex items-center space-x-4">
                                <Link
                                    to="/login"
                                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
                                        isActive('/login')
                                            ? 'text-white bg-[#8B4513]'
                                            : 'text-white bg-[#8B4513] hover:bg-[#654321]'
                                    } transition-colors duration-300`}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className={`inline-flex items-center px-4 py-2 border border-[#8B4513] text-sm font-medium rounded-md ${
                                        isActive('/register')
                                            ? 'bg-[#F5F5DC] text-[#8B4513]'
                                            : 'text-[#8B4513] hover:bg-[#F5F5DC]'
                                    } transition-colors duration-300`}
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                        {user && (
                            <div className="relative">
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="flex items-center space-x-2 focus:outline-none"
                                >
                                    <img
                                        src={user?.photoURL || '/default-avatar.png'}
                                        alt="Profile"
                                        className="h-8 w-8 rounded-full object-cover border-2 border-[#DAA520]"
                                    />
                                </button>

                                {/* Dropdown Menu */}
                                {isOpen && (
                                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-[#8B4513]/20 transform origin-top-right transition-transform duration-200 ease-out">
                                        <div className="py-1">
                                            <div className="px-4 py-2 text-sm text-[#2C1810] border-b border-[#8B4513]/20">
                                                {user?.displayName}
                                            </div>
                                            <Link
                                                to="/my-artifacts"
                                                className={`block px-4 py-2 text-sm ${
                                                    isActive('/my-artifacts')
                                                        ? 'text-[#DAA520] bg-[#2C1810]/5'
                                                        : 'text-[#2C1810] hover:bg-[#F5F5DC]'
                                                }`}
                                            >
                                                My Artifacts
                                            </Link>
                                            <Link
                                                to="/liked-artifacts"
                                                className={`block px-4 py-2 text-sm ${
                                                    isActive('/liked-artifacts')
                                                        ? 'text-[#DAA520] bg-[#2C1810]/5'
                                                        : 'text-[#2C1810] hover:bg-[#F5F5DC]'
                                                }`}
                                            >
                                                Liked Artifacts
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-[#2C1810] hover:bg-[#F5F5DC]"
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
                            className="inline-flex items-center justify-center p-2 rounded-md text-[#2C1810] hover:text-[#8B4513] hover:bg-[#F5F5DC] focus:outline-none"
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
                <div className="md:hidden bg-white shadow-lg border-t border-[#8B4513]/20">
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
                        {user && (
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
                                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-[#2C1810] hover:text-[#8B4513] hover:bg-[#F5F5DC]"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                        {!user && (
                            <div className="space-y-1">
                                <Link
                                    to="/login"
                                    className={`block px-3 py-2 rounded-md text-base font-medium text-white ${
                                        isActive('/login')
                                            ? 'bg-[#8B4513]'
                                            : 'bg-[#8B4513] hover:bg-[#654321]'
                                    }`}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                                        isActive('/register')
                                            ? 'bg-[#F5F5DC] text-[#8B4513] border border-[#8B4513]'
                                            : 'text-[#8B4513] border border-[#8B4513] hover:bg-[#F5F5DC]'
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