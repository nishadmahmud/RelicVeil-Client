import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome } from 'react-icons/fa';

const NotFound = () => {
    useEffect(() => {
        document.title = '404 Not Found - RelicVeil';
    }, []);

    return (
        <div className="min-h-screen bg-[#F5F5DC] flex items-center justify-center px-4 font-[Cinzel]">
            <div className="text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-9xl font-bold text-[#2C1810]">404</h1>
                    <div className="mt-4 mb-8">
                        <h2 className="text-3xl font-semibold text-[#8B4513] mb-2">
                            Page Not Found
                        </h2>
                        <p className="text-[#5C4033]">
                            The artifact you're looking for seems to be lost in time...
                        </p>
                    </div>
                    <Link
                        to="/"
                        className="inline-flex items-center px-6 py-3 bg-[#2C1810] text-[#F5F5DC] rounded-lg hover:bg-[#8B4513] transition-colors duration-300"
                    >
                        <FaHome className="mr-2" />
                        Back to Home
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default NotFound;