import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHeart, FaSync } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const Home = () => {
    const [featuredArtifacts, setFeaturedArtifacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Set page title
    useEffect(() => {
        document.title = 'RelicVeil - Discover Historical Treasures';
    }, []);

    const fetchFeaturedArtifacts = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await fetch('http://localhost:5000/api/artifacts/top-liked');
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch featured artifacts');
            }
            
            const data = await response.json();
            // Ensure data is an array
            setFeaturedArtifacts(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
            toast.error(error.message);
            setFeaturedArtifacts([]); // Set empty array on error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeaturedArtifacts();
    }, []);

    // Function to handle retry
    const handleRetry = () => {
        fetchFeaturedArtifacts();
    };

    return (
        <div className="bg-[#F5F5DC] font-[Cinzel]">
            {/* Hero Section */}
            <Hero />

            {/* Featured Artifacts Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-[#2C1810] mb-4">
                            Featured Artifacts
                        </h2>
                        <p className="text-lg text-[#5C4033] max-w-2xl mx-auto">
                            Discover our most appreciated historical treasures, curated by our community.
                        </p>
                    </motion.div>

                    {loading ? (
                        <div className="text-center text-[#2C1810] text-xl">
                            <div className="animate-spin inline-block w-8 h-8 border-4 border-[#8B4513] border-t-transparent rounded-full mb-4"></div>
                            <p>Loading featured artifacts...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center">
                            <p className="text-[#2C1810] text-xl mb-4">{error}</p>
                            <button
                                onClick={handleRetry}
                                className="inline-flex items-center px-4 py-2 bg-[#8B4513] text-white rounded-md hover:bg-[#654321] transition-colors duration-300"
                            >
                                <FaSync className="mr-2" />
                                Try Again
                            </button>
                        </div>
                    ) : featuredArtifacts.length === 0 ? (
                        <div className="text-center text-[#2C1810] text-xl">
                            No featured artifacts available yet.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredArtifacts.map((artifact, index) => (
                                <motion.div
                                    key={artifact._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.2, duration: 0.8 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
                                >
                                    <div className="relative h-48">
                                        <img
                                            src={artifact.image}
                                            alt={artifact.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-4 right-4 bg-[#2C1810]/80 text-[#F5F5DC] px-3 py-1 rounded-full flex items-center gap-2">
                                            <FaHeart className="text-[#DAA520]" />
                                            <span>{artifact.likeCount || 0}</span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-[#2C1810] mb-2 line-clamp-1">
                                            {artifact.name}
                                        </h3>
                                        <p className="text-[#5C4033] mb-4 line-clamp-2">
                                            {artifact.description}
                                        </p>
                                        <Link
                                            to={`/artifact-details/${artifact._id}`}
                                            className="inline-block text-[#DAA520] hover:text-[#8B4513] font-medium transition-colors duration-300"
                                        >
                                            View Details →
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                    
                    {/* Show All Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <Link
                            to="/all-artifacts"
                            className="inline-flex items-center px-8 py-3 bg-[#2C1810] text-[#F5F5DC] rounded-lg hover:bg-[#8B4513] transition-colors duration-300 font-medium"
                        >
                            View All Artifacts
                            <svg 
                                className="w-5 h-5 ml-2" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M17 8l4 4m0 0l-4 4m4-4H3" 
                                />
                            </svg>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#2C1810]">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-[#DAA520] mb-4">
                            Have a Historical Artifact to Share?
                        </h2>
                        <p className="text-lg text-[#F5F5DC] mb-8 max-w-2xl mx-auto">
                            Join our community of history enthusiasts and share your artifacts with the world.
                        </p>
                        <Link
                            to="/add-artifact"
                            className="inline-flex items-center px-8 py-3 border-2 border-[#DAA520] text-base font-medium rounded-md text-[#DAA520] hover:bg-[#DAA520]/10 transition-all duration-300"
                        >
                            Share Your Artifact
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Why Choose RelicVeil Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-[#2C1810] mb-4">
                            Why Choose RelicVeil?
                        </h2>
                        <p className="text-lg text-[#5C4033] max-w-2xl mx-auto">
                            We're dedicated to preserving and sharing historical artifacts with the world.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                title: "Expert Curation",
                                description: "Each artifact is carefully verified and documented by history experts."
                            },
                            {
                                title: "Global Community",
                                description: "Connect with history enthusiasts from around the world."
                            },
                            {
                                title: "Detailed Documentation",
                                description: "Access comprehensive information about each artifact's history."
                            },
                            {
                                title: "Interactive Experience",
                                description: "Engage with artifacts through our immersive platform."
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2, duration: 0.8 }}
                                viewport={{ once: true }}
                                className="bg-white/50 backdrop-blur-sm p-6 rounded-lg"
                            >
                                <h3 className="text-xl font-semibold text-[#8B4513] mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-[#5C4033]">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;