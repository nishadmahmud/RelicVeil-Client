import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AllArtifacts = () => {
    const [artifacts, setArtifacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchArtifacts();
    }, []);

    const fetchArtifacts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/artifacts');
            const data = await response.json();
            setArtifacts(data);
        } catch (error) {
            toast.error('Failed to fetch artifacts');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F5F5DC] pt-24 flex items-center justify-center">
                <div className="text-2xl text-[#2C1810] font-[Cinzel]">Loading artifacts...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5F5DC] py-12 px-4 sm:px-6 lg:px-8 pt-24">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-[#2C1810] text-center mb-12 font-[Cinzel]">
                    Historical Artifacts Collection
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {artifacts.map((artifact) => (
                        <motion.div
                            key={artifact._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-lg shadow-xl overflow-hidden border border-[#8B4513]/20 hover:shadow-2xl transition-shadow duration-300"
                        >
                            <div className="relative h-64">
                                <img
                                    src={artifact.image}
                                    alt={artifact.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-[#2C1810] mb-2 font-[Cinzel]">
                                    {artifact.name}
                                </h2>
                                <div className="text-sm text-[#8B4513] mb-4">
                                    <span className="inline-flex items-center mr-4">
                                        <FaMapMarkerAlt className="mr-1" />
                                        {artifact.presentLocation}
                                    </span>
                                    <span className="inline-flex items-center">
                                        <FaCalendarAlt className="mr-1" />
                                        {artifact.createdAt}
                                    </span>
                                </div>
                                <p className="text-[#2C1810] mb-4 line-clamp-3">
                                    {artifact.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-[#8B4513]">
                                        Type: {artifact.type}
                                    </span>
                                    <Link 
                                        to={`/artifact-details/${artifact._id}`}
                                        className="text-[#DAA520] hover:text-[#8B4513] transition-colors duration-300 text-sm font-semibold"
                                    >
                                        View Details →
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {artifacts.length === 0 && (
                    <div className="text-center text-[#2C1810] text-xl font-[Cinzel] mt-8">
                        No artifacts found. Be the first to add one!
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllArtifacts;