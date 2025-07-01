import React, { useState, useEffect, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { FaHeart, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { AuthContext } from '../auth/AuthProvider';

const LikedArtifacts = () => {
    const { user, getToken } = useContext(AuthContext);
    const [artifacts, setArtifacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = 'Liked Artifacts - RelicVeil';
    }, []);

    if (!user) {
        toast.error('Please login to view your liked artifacts');
        return <Navigate to="/login" replace />;
    }

    useEffect(() => {
        if (user) {
            fetchLikedArtifacts();
        }
    }, [user]);

    const fetchLikedArtifacts = async () => {
        try {
            const token = await getToken();
            
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/artifacts/liked/${user.email}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch liked artifacts');
            }
            
            const data = await response.json();
            setArtifacts(data);
        } catch (error) {
            toast.error('Failed to fetch liked artifacts');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F5F5DC] pt-24 flex items-center justify-center">
                <div className="text-2xl text-[#2C1810] font-[Cinzel]">Loading your liked artifacts...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5F5DC] py-12 px-4 sm:px-6 lg:px-8 pt-24">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-[#2C1810] text-center mb-12 font-[Cinzel]">
                    Your Liked Artifacts
                </h1>

                {artifacts.length === 0 ? (
                    <div className="text-center text-[#2C1810] text-xl font-[Cinzel] mt-8">
                        You haven't liked any artifacts yet. 
                        <Link to="/all-artifacts" className="text-[#DAA520] hover:text-[#8B4513] ml-2">
                            Explore artifacts →
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-stretch">
                        {artifacts.map((artifact) => (
                            <motion.div
                                key={artifact._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white rounded-lg shadow-xl overflow-hidden border border-[#8B4513]/20 hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col"
                            >
                                <div className="relative h-48">
                                    <img
                                        src={artifact.image}
                                        alt={artifact.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="p-4 flex flex-col flex-1">
                                    <h2 className="text-xl font-bold text-[#2C1810] mb-2 font-[Cinzel]">
                                        {artifact.name}
                                    </h2>
                                    <div className="text-sm text-[#8B4513] mb-3">
                                        <span className="inline-flex items-center mr-4">
                                            <FaMapMarkerAlt className="mr-1" />
                                            {artifact.presentLocation}
                                        </span>
                                        <span className="inline-flex items-center">
                                            <FaCalendarAlt className="mr-1" />
                                            {artifact.createdAt}
                                        </span>
                                    </div>
                                    <p className="text-[#2C1810] mb-3 line-clamp-2 text-sm">
                                        {artifact.description}
                                    </p>
                                    <div className="flex items-center justify-between mt-auto">
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
                )}
            </div>
        </div>
    );
};

export default LikedArtifacts;