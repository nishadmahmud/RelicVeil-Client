import React from 'react';
import Hero from '../components/Hero';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
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
                            Explore our carefully curated selection of historical artifacts that tell remarkable stories.
                        </p>
                    </motion.div>

                    {/* Featured Artifacts Grid - Placeholder for dynamic content */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((item) => (
                            <motion.div
                                key={item}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: item * 0.2, duration: 0.8 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
                            >
                                <div className="h-48 bg-[#8B4513]/20"></div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-[#2C1810] mb-2">
                                        Artifact Title
                                    </h3>
                                    <p className="text-[#5C4033] mb-4">
                                        Brief description of the artifact and its historical significance.
                                    </p>
                                    <Link
                                        to="/all-arrifacts"
                                        className="text-[#8B4513] hover:text-[#654321] font-medium"
                                    >
                                        Learn More →
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
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