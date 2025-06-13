import React, { useState, useEffect, useContext } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { FaHeart, FaHeartBroken, FaMapMarkerAlt, FaCalendarAlt, FaUser, FaEnvelope } from 'react-icons/fa';
import { AuthContext } from '../auth/AuthProvider';
import { Helmet } from 'react-helmet-async';

const ArtifactDetails = () => {
    const { id } = useParams();
    const { user, getToken } = useContext(AuthContext);
    const [artifact, setArtifact] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasLiked, setHasLiked] = useState(false);
    const [hasDisliked, setHasDisliked] = useState(false);

    // Redirect if not authenticated
    if (!user) {
        toast.error('Please login to view artifact details');
        return <Navigate to="/login" replace />;
    }

    useEffect(() => {
        fetchArtifactDetails();
    }, [id]);

    useEffect(() => {
        // Check if user has liked or disliked this artifact
        const likedArtifacts = JSON.parse(localStorage.getItem('likedArtifacts') || '[]');
        const dislikedArtifacts = JSON.parse(localStorage.getItem('dislikedArtifacts') || '[]');
        setHasLiked(likedArtifacts.includes(id));
        setHasDisliked(dislikedArtifacts.includes(id));
    }, [id]);

    const fetchArtifactDetails = async () => {
        try {
            // Get the Firebase ID token
            const token = await getToken();
            
            const response = await fetch(`http://localhost:5000/api/artifacts/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch artifact details');
            }
            
            const data = await response.json();
            setArtifact(data);
        } catch (error) {
            toast.error('Failed to fetch artifact details');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLike = async () => {
        if (!user) {
            toast.error('Please login to like artifacts');
            return;
        }

        if (hasLiked) {
            return;
        }

        try {
            // Get the Firebase ID token
            const token = await getToken();
            
            const response = await fetch(`http://localhost:5000/api/artifacts/${id}/like`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ userEmail: user.email })
            });
            
            if (!response.ok) {
                throw new Error('Failed to like artifact');
            }
            
            const data = await response.json();
            
            if (data.success) {
                // Remove from disliked if it was disliked
                if (hasDisliked) {
                    const dislikedArtifacts = JSON.parse(localStorage.getItem('dislikedArtifacts') || '[]');
                    localStorage.setItem('dislikedArtifacts', 
                        JSON.stringify(dislikedArtifacts.filter(artifactId => artifactId !== id))
                    );
                    setHasDisliked(false);
                }

                // Update liked status
                const likedArtifacts = JSON.parse(localStorage.getItem('likedArtifacts') || '[]');
                localStorage.setItem('likedArtifacts', JSON.stringify([...likedArtifacts, id]));
                setHasLiked(true);
                setArtifact(prev => ({
                    ...prev,
                    likeCount: (prev.likeCount || 0) + (hasDisliked ? 2 : 1) // Add 2 if switching from dislike
                }));
                toast.success('Artifact liked successfully!');
            }
        } catch (error) {
            toast.error('Failed to update like status');
        }
    };

    const handleDislike = async () => {
        if (!user) {
            toast.error('Please login to dislike artifacts');
            return;
        }

        if (hasDisliked || (!hasLiked && !hasDisliked)) {
            return;
        }

        try {
            // Get the Firebase ID token
            const token = await getToken();
            
            const response = await fetch(`http://localhost:5000/api/artifacts/${id}/dislike`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ userEmail: user.email })
            });
            
            if (!response.ok) {
                throw new Error('Failed to dislike artifact');
            }
            
            const data = await response.json();
            
            if (data.success) {
                // Remove from liked since we were liked before
                const likedArtifacts = JSON.parse(localStorage.getItem('likedArtifacts') || '[]');
                localStorage.setItem('likedArtifacts', 
                    JSON.stringify(likedArtifacts.filter(artifactId => artifactId !== id))
                );
                setHasLiked(false);

                // Update disliked status
                const dislikedArtifacts = JSON.parse(localStorage.getItem('dislikedArtifacts') || '[]');
                localStorage.setItem('dislikedArtifacts', JSON.stringify([...dislikedArtifacts, id]));
                setHasDisliked(true);
                setArtifact(prev => ({
                    ...prev,
                    likeCount: Math.max(0, (prev.likeCount || 0) - 1)
                }));
                toast.success('Artifact disliked');
            }
        } catch (error) {
            toast.error('Failed to update dislike status');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F5F5DC] pt-24 flex items-center justify-center">
                <div className="text-2xl text-[#2C1810] font-[Cinzel]">Loading artifact details...</div>
            </div>
        );
    }

    if (!artifact) {
        return (
            <div className="min-h-screen bg-[#F5F5DC] pt-24 flex items-center justify-center">
                <div className="text-2xl text-[#2C1810] font-[Cinzel]">Artifact not found</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5F5DC] py-12 px-4 sm:px-6 lg:px-8 pt-24">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-lg shadow-xl overflow-hidden border border-[#8B4513]/20"
                >
                    <div className="relative h-96">
                        <img
                            src={artifact.image}
                            alt={artifact.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-4xl font-bold text-[#2C1810] font-[Cinzel]">
                                {artifact.name}
                            </h1>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={handleLike}
                                    disabled={hasLiked}
                                    className={`p-3 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 ${
                                        hasLiked 
                                            ? 'bg-[#8B4513] text-white cursor-not-allowed'
                                            : hasDisliked
                                                ? 'bg-white text-[#8B4513] hover:bg-[#F5F5DC] cursor-pointer'
                                                : 'bg-white text-[#8B4513] hover:bg-[#F5F5DC] cursor-pointer'
                                    }`}
                                >
                                    <FaHeart className="text-xl" />
                                    <span className="text-sm font-semibold">
                                        {hasLiked ? 'Liked' : 'Like'}
                                    </span>
                                </button>
                                <button
                                    onClick={handleDislike}
                                    disabled={!hasLiked && !hasDisliked}
                                    className={`p-3 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 ${
                                        hasDisliked 
                                            ? 'bg-[#8B4513] text-white cursor-not-allowed'
                                            : hasLiked
                                                ? 'bg-white text-[#8B4513] hover:bg-[#F5F5DC] cursor-pointer'
                                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                >
                                    <FaHeartBroken className="text-xl" />
                                    <span className="text-sm font-semibold">
                                        {hasDisliked ? 'Disliked' : 'Dislike'}
                                    </span>
                                </button>
                                <span className="bg-[#2C1810] text-[#F5F5DC] px-3 py-1 rounded-full text-sm">
                                    {artifact.likeCount || 0} likes
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="space-y-3">
                                <p className="flex items-center text-[#8B4513]">
                                    <FaMapMarkerAlt className="mr-2" />
                                    <span className="font-semibold">Location:</span>
                                    <span className="ml-2">{artifact.presentLocation}</span>
                                </p>
                                <p className="flex items-center text-[#8B4513]">
                                    <FaCalendarAlt className="mr-2" />
                                    <span className="font-semibold">Created:</span>
                                    <span className="ml-2">{artifact.createdAt}</span>
                                </p>
                                <p className="flex items-center text-[#8B4513]">
                                    <FaCalendarAlt className="mr-2" />
                                    <span className="font-semibold">Discovered:</span>
                                    <span className="ml-2">{artifact.discoveredAt}</span>
                                </p>
                            </div>
                            <div className="space-y-3">
                                <p className="flex items-center text-[#8B4513]">
                                    <FaUser className="mr-2" />
                                    <span className="font-semibold">Added by:</span>
                                    <span className="ml-2">{artifact.adderName}</span>
                                </p>
                                <p className="flex items-center text-[#8B4513]">
                                    <FaEnvelope className="mr-2" />
                                    <span className="font-semibold">Contact:</span>
                                    <span className="ml-2">{artifact.adderEmail}</span>
                                </p>
                                <p className="text-[#8B4513]">
                                    <span className="font-semibold">Type:</span>
                                    <span className="ml-2">{artifact.type}</span>
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-[#2C1810] mb-2 font-[Cinzel]">
                                    Historical Context
                                </h2>
                                <p className="text-[#2C1810] leading-relaxed">
                                    {artifact.historicalContext}
                                </p>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-[#2C1810] mb-2 font-[Cinzel]">
                                    Description
                                </h2>
                                <p className="text-[#2C1810] leading-relaxed">
                                    {artifact.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ArtifactDetails;