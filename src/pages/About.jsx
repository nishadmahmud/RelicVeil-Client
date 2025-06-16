import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg p-8"
            >
                <h1 className="text-4xl font-[Cinzel] font-bold text-[#8B4513] mb-8 text-center">
                    About RelicVeil
                </h1>
                
                <div className="space-y-6 text-[#2C1810]">
                    <p className="text-lg leading-relaxed">
                        Welcome to RelicVeil, your premier platform for discovering, sharing, and preserving the world's most fascinating artifacts. Our mission is to connect artifact enthusiasts, collectors, and historians in a vibrant community dedicated to cultural heritage.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-8 mt-12">
                        <div className="bg-[#F5F5DC]/50 p-6 rounded-lg">
                            <h2 className="text-2xl font-[Cinzel] font-semibold text-[#8B4513] mb-4">Our Vision</h2>
                            <p className="text-[#2C1810]">
                                To create a global platform where artifacts can be documented, shared, and appreciated while preserving their historical significance for future generations.
                            </p>
                        </div>
                        
                        <div className="bg-[#F5F5DC]/50 p-6 rounded-lg">
                            <h2 className="text-2xl font-[Cinzel] font-semibold text-[#8B4513] mb-4">Our Mission</h2>
                            <p className="text-[#2C1810]">
                                To facilitate meaningful connections between artifact enthusiasts and provide a secure, user-friendly platform for documenting and sharing cultural heritage.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12">
                        <h2 className="text-2xl font-[Cinzel] font-semibold text-[#8B4513] mb-6">What We Offer</h2>
                        <ul className="grid md:grid-cols-3 gap-6">
                            <li className="bg-[#F5F5DC]/30 p-4 rounded-lg">
                                <h3 className="font-semibold text-[#8B4513] mb-2">Artifact Documentation</h3>
                                <p>Comprehensive tools for documenting and cataloging artifacts with detailed descriptions and images.</p>
                            </li>
                            <li className="bg-[#F5F5DC]/30 p-4 rounded-lg">
                                <h3 className="font-semibold text-[#8B4513] mb-2">Community Engagement</h3>
                                <p>A vibrant community where enthusiasts can share knowledge and appreciation for historical artifacts.</p>
                            </li>
                            <li className="bg-[#F5F5DC]/30 p-4 rounded-lg">
                                <h3 className="font-semibold text-[#8B4513] mb-2">Secure Platform</h3>
                                <p>A safe and reliable platform for managing and sharing your artifact collections.</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default About; 