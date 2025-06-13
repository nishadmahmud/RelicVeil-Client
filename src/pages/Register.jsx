import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthProvider';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-hot-toast';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        photoURL: ''
    });
    const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Register - RelicVeil';
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validatePassword = (password) => {
        if (password.length < 6) {
            return 'Password must be at least 6 characters long';
        }
        if (!/[A-Z]/.test(password)) {
            return 'Password must contain at least one uppercase letter';
        }
        if (!/[a-z]/.test(password)) {
            return 'Password must contain at least one lowercase letter';
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const passwordError = validatePassword(formData.password);
        if (passwordError) {
            toast.error(passwordError);
            return;
        }

        try {
            const userCredential = await createUser(formData.email, formData.password);
            await updateUserProfile(formData.name, formData.photoURL);
            toast.success('Registration successful!');
            navigate('/');
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
            toast.success('Successfully registered with Google!');
            navigate('/');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F5DC] py-12 px-4 sm:px-6 lg:px-8 font-[Cinzel]">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-2xl border border-[#8B4513]/20">
                <div>
                    <h2 className="mt-4 text-center text-3xl font-bold text-[#2C1810]">
                        Join the RelicVeil Community
                    </h2>
                    <p className="mt-2 text-center text-sm text-[#5C4033]">
                        Begin your journey through history
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-[#2C1810]">
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-[#8B4513]/30 placeholder-[#8B7355] text-[#2C1810] rounded-md focus:outline-none focus:ring-2 focus:ring-[#DAA520] focus:border-[#DAA520] sm:text-sm"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[#2C1810]">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-[#8B4513]/30 placeholder-[#8B7355] text-[#2C1810] rounded-md focus:outline-none focus:ring-2 focus:ring-[#DAA520] focus:border-[#DAA520] sm:text-sm"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-[#2C1810]">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-[#8B4513]/30 placeholder-[#8B7355] text-[#2C1810] rounded-md focus:outline-none focus:ring-2 focus:ring-[#DAA520] focus:border-[#DAA520] sm:text-sm"
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <p className="mt-1 text-xs text-[#5C4033]">
                                Must be at least 6 characters with 1 uppercase & 1 lowercase letter
                            </p>
                        </div>
                        <div>
                            <label htmlFor="photoURL" className="block text-sm font-medium text-[#2C1810]">
                                Profile Photo URL
                            </label>
                            <input
                                id="photoURL"
                                name="photoURL"
                                type="url"
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-[#8B4513]/30 placeholder-[#8B7355] text-[#2C1810] rounded-md focus:outline-none focus:ring-2 focus:ring-[#DAA520] focus:border-[#DAA520] sm:text-sm"
                                placeholder="Enter photo URL (optional)"
                                value={formData.photoURL}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#8B4513] hover:bg-[#654321] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DAA520] transform transition-all duration-150 hover:scale-[1.02]"
                        >
                            Create Account
                        </button>
                    </div>
                </form>

                <div className="mt-6">
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

                    <div className="mt-6">
                        <button
                            onClick={handleGoogleSignIn}
                            className="w-full flex items-center justify-center px-4 py-2.5 border border-[#8B4513]/30 rounded-md shadow-sm text-sm font-medium text-[#2C1810] bg-white hover:bg-[#F5F5DC] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DAA520] transform transition-all duration-150 hover:scale-[1.02]"
                        >
                            <FcGoogle className="h-5 w-5 mr-2" />
                            Sign up with Google
                        </button>
                    </div>
                </div>

                <div className="text-sm text-center">
                    <span className="text-[#5C4033]">Already have an account?</span>{' '}
                    <Link
                        to="/login"
                        className="font-medium text-[#8B4513] hover:text-[#654321]"
                    >
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;