import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../auth/AuthProvider';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.title = 'Login - RelicVeil';
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            await signIn(email, password);
            toast.success('Successfully logged in!');
            navigate(from, { replace: true });
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
            toast.success('Successfully logged in with Google!');
            navigate(from, { replace: true });
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F5DC] pt-20 py-2 px-4 sm:px-6 lg:px-8 font-[Cinzel]">
            <div className="max-w-md w-full space-y-2 bg-white p-3 rounded-lg shadow-2xl border border-[#8B4513]/20">
                <div>
                    <h2 className="mt-2 text-center text-3xl font-bold text-[#2C1810]">
                        Welcome Back to RelicVeil
                    </h2>
                    <p className="mt-1 text-center text-sm text-[#5C4033]">
                        Discover the treasures of history
                    </p>
                </div>
                <form className="mt-2 space-y-2" onSubmit={handleLogin}>
                    <div className="rounded-md shadow-sm space-y-1">
                        <div>
                            <label htmlFor="email-address" className="block text-sm font-medium text-[#2C1810] mb-1">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                className="mt-0.5 appearance-none relative block w-full px-3 py-2 border border-[#8B4513]/30 placeholder-[#8B7355] text-[#2C1810] rounded-md focus:outline-none focus:ring-2 focus:ring-[#DAA520] focus:border-[#DAA520] sm:text-sm"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-[#2C1810] mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="mt-0.5 appearance-none relative block w-full px-3 py-2 border border-[#8B4513]/30 placeholder-[#8B7355] text-[#2C1810] rounded-md focus:outline-none focus:ring-2 focus:ring-[#DAA520] focus:border-[#DAA520] sm:text-sm"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mt-1">
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#8B4513] hover:bg-[#654321] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DAA520] transform transition-all duration-150 hover:scale-[1.02]"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <div className="mt-2">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[#8B4513]/20"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-[#5C4033]">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="mt-2">
                        <button
                            onClick={handleGoogleSignIn}
                            className="w-full flex items-center justify-center px-4 py-2 border border-[#8B4513]/30 rounded-md shadow-sm text-sm font-medium text-[#2C1810] bg-white hover:bg-[#F5F5DC] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DAA520] transform transition-all duration-150 hover:scale-[1.02]"
                        >
                            <FcGoogle className="h-5 w-5 mr-2" />
                            Sign in with Google
                        </button>
                    </div>
                </div>

                <div className="text-sm text-center mt-2">
                    <span className="text-[#5C4033]">Don't have an account?</span>{' '}
                    <Link
                        to="/register"
                        className="font-medium text-[#8B4513] hover:text-[#654321]"
                    >
                        Register now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;