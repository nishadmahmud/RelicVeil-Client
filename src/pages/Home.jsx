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

    useEffect(() => {
        document.title = 'RelicVeil - Discover Historical Treasures';
    }, []);

    useEffect(() => {
        const fetchArtifacts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/artifacts`);
                if (!response.ok) throw new Error('Failed to fetch artifacts');
                const data = await response.json();

                // Sort by likeCount descending
                const sorted = [...data].sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0));
                let featured = sorted.slice(0, 8);

                // If less than 8, fill with others not already included
                if (featured.length < 8) {
                    const ids = new Set(featured.map(a => a._id));
                    const fillers = data.filter(a => !ids.has(a._id)).slice(0, 8 - featured.length);
                    featured = [...featured, ...fillers];
                }

                setFeaturedArtifacts(featured);
            } catch (error) {
                setError(error.message);
                setFeaturedArtifacts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchArtifacts();
    }, []);

    const handleRetry = () => {
        fetchFeaturedArtifacts();
    };

    return (
        <div className="bg-[#F5F5DC] font-[Cinzel]">
            <Hero />

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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-stretch">
                            {featuredArtifacts.slice(0, 8).map((artifact, index) => (
                                <motion.div
                                    key={artifact._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.2, duration: 0.8 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] h-full flex flex-col"
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
                                    <div className="p-4 flex flex-col flex-1">
                                        <h3 className="text-xl font-bold text-[#2C1810] mb-2 line-clamp-1">
                                            {artifact.name}
                                        </h3>
                                        <p className="text-[#5C4033] mb-3 line-clamp-2 text-sm">
                                            {artifact.description}
                                        </p>
                                        <Link
                                            to={`/artifact-details/${artifact._id}`}
                                            className="inline-block text-[#DAA520] hover:text-[#8B4513] font-medium transition-colors duration-300 mt-auto text-sm font-semibold"
                                        >
                                            View Details →
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                    
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

            {/* Newsletter Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F5F5DC]">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#2C1810] mb-4 font-[Cinzel]">Join Our Newsletter</h2>
                    <p className="text-lg text-[#5C4033] mb-6">Get the latest updates, featured artifacts, and history news delivered to your inbox.</p>
                    <form className="flex flex-col sm:flex-row items-center justify-center gap-4" onSubmit={e => {
                        e.preventDefault();
                        const email = e.target.elements.newsletterEmail.value;
                        if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
                            toast.error('Please enter a valid email address.');
                            return;
                        }
                        toast.success('Thank you for joining our newsletter!');
                        e.target.reset();
                    }}>
                        <input
                            type="email"
                            name="newsletterEmail"
                            required
                            placeholder="Enter your email"
                            className="w-full sm:w-auto px-4 py-3 rounded-md border border-[#8B4513]/30 focus:outline-none focus:ring-2 focus:ring-[#DAA520] focus:border-[#DAA520] text-[#2C1810] placeholder-[#8B7355] bg-white"
                        />
                        <button
                            type="submit"
                            className="px-8 py-3 bg-[#8B4513] text-white rounded-md font-medium hover:bg-[#654321] transition-colors duration-300"
                        >
                            Join Newsletter
                        </button>
                    </form>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#2C1810] mb-8 text-center font-[Cinzel]">Frequently Asked Questions</h2>
                    <FAQ />
                </div>
            </section>
        </div>
    );
};

// FAQ component at the bottom of the file
const FAQ = () => {
    const [open, setOpen] = React.useState(null);
    const faqs = [
        {
            q: 'How do I add an artifact?',
            a: 'Simply register or log in, then click on "Add Artifact" in the navigation bar and fill out the form with your artifact details.'
        },
        {
            q: 'Is there a cost to join RelicVeil?',
            a: 'No, RelicVeil is completely free for all users who want to explore or contribute artifacts.'
        },
        {
            q: 'How are featured artifacts selected?',
            a: 'Featured artifacts are chosen based on the number of likes from the community.'
        },
        {
            q: 'Can I edit or delete my submitted artifacts?',
            a: 'Yes, you can manage your artifacts from the "My Artifacts" section after logging in.'
        },
        {
            q: 'How do I contact the RelicVeil team?',
            a: 'You can use the Contact page to send us a message, and we will get back to you as soon as possible.'
        }
    ];
    return (
        <div className="space-y-4">
            {faqs.map((faq, idx) => (
                <div key={idx} className="border border-[#8B4513]/20 rounded-md bg-[#F5F5DC]">
                    <button
                        className="w-full text-left px-6 py-4 focus:outline-none flex justify-between items-center text-[#2C1810] font-semibold text-lg"
                        onClick={() => setOpen(open === idx ? null : idx)}
                        aria-expanded={open === idx}
                    >
                        {faq.q}
                        <span className="ml-4 text-[#8B4513]">{open === idx ? '-' : '+'}</span>
                    </button>
                    {open === idx && (
                        <div className="px-6 pb-4 text-[#5C4033] text-base animate-fade-in">
                            {faq.a}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Home;