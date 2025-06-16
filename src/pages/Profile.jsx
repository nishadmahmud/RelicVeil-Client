import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../auth/AuthProvider';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { FaUser, FaEnvelope, FaCamera, FaCalendarAlt } from 'react-icons/fa';
import { GiEgyptianTemple, GiAncientColumns } from 'react-icons/gi';
import { Navigate } from 'react-router-dom';
import { getUserArtifacts, getLikedArtifacts } from '../utils/api';

const Profile = () => {
    const { user, updateUserProfile, getToken } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [stats, setStats] = useState({
        totalLiked: 0,
        totalAdded: 0,
        joinedDate: user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'
    });
    const [formData, setFormData] = useState({
        displayName: user?.displayName || '',
        photoURL: user?.photoURL || ''
    });

    useEffect(() => {
        document.title = 'Profile - RelicVeil';
    }, []);

    if (!user) {
        toast.error('Please login to access your profile');
        return <Navigate to="/login" replace />;
    }

    useEffect(() => {
        fetchUserStats();
    }, [user]);

    const fetchUserStats = async () => {
        if (!user?.email) return;

        try {
            const [likedData, addedData] = await Promise.all([
                getLikedArtifacts(getToken),
                getUserArtifacts(getToken)
            ]);

            setStats(prev => ({
                ...prev,
                totalLiked: Array.isArray(likedData) ? likedData.length : 0,
                totalAdded: Array.isArray(addedData) ? addedData.length : 0
            }));
        } catch (error) {
            console.error('Error fetching user stats:', error);
            toast.error('Failed to load user statistics');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUserProfile(formData.displayName, formData.photoURL);
            toast.success('Profile updated successfully!');
            setIsEditing(false);
        } catch (error) {
            toast.error('Failed to update profile');
            console.error('Error:', error);
        }
    };

    const StatCard = ({ icon: Icon, title, value, color }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
        >
            <div className="flex items-center p-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${color.replace('border', 'bg')}`}>
                    <Icon className="text-3xl text-white" />
                </div>
                <div className="ml-4">
                    <h3 className="text-lg font-medium text-[#8B4513]">{title}</h3>
                    <p className="text-3xl font-bold text-[#2C1810]">{value}</p>
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-[#F5F5DC] py-12 px-4 sm:px-6 lg:px-8 pt-24">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="bg-white rounded-lg shadow-xl p-8 border border-[#8B4513]/20"
                        >
                            <div className="text-center mb-8">
                                <div className="relative inline-block">
                                    <img
                                        src={user?.photoURL || '/default-avatar.png'}
                                        alt="Profile"
                                        className="w-32 h-32 rounded-full object-cover border-4 border-[#DAA520] mx-auto"
                                    />
                                    {isEditing && (
                                        <label className="absolute bottom-0 right-0 bg-[#2C1810] text-[#F5F5DC] p-2 rounded-full cursor-pointer hover:bg-[#8B4513] transition-colors duration-300">
                                            <FaCamera />
                                            <input
                                                type="url"
                                                className="hidden"
                                                value={formData.photoURL}
                                                onChange={(e) => setFormData({ ...formData, photoURL: e.target.value })}
                                            />
                                        </label>
                                    )}
                                </div>
                                <h1 className="text-3xl font-bold text-[#2C1810] mt-4 font-[Cinzel]">
                                    {user?.displayName || 'User Profile'}
                                </h1>
                                <div className="flex items-center justify-center gap-2 mt-2 text-[#8B4513]">
                                    <FaEnvelope className="text-sm" />
                                    <p className="text-sm">{user?.email}</p>
                                </div>
                                <div className="flex items-center justify-center gap-2 mt-2 text-[#5C4033]">
                                    <FaCalendarAlt className="text-sm" />
                                    <p className="text-sm">Joined {stats.joinedDate}</p>
                                </div>
                            </div>

                            {isEditing ? (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-[#2C1810] mb-2">
                                            Display Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.displayName}
                                            onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                            className="w-full px-4 py-2 border border-[#8B4513]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DAA520] focus:border-[#DAA520]"
                                            placeholder="Enter your display name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#2C1810] mb-2">
                                            Photo URL
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.photoURL}
                                            onChange={(e) => setFormData({ ...formData, photoURL: e.target.value })}
                                            className="w-full px-4 py-2 border border-[#8B4513]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DAA520] focus:border-[#DAA520]"
                                            placeholder="Enter photo URL"
                                        />
                                    </div>
                                    <div className="flex justify-end space-x-4">
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="px-4 py-2 border border-[#8B4513] text-[#8B4513] rounded-md hover:bg-[#F5F5DC] transition-colors duration-300"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-[#2C1810] text-[#F5F5DC] rounded-md hover:bg-[#8B4513] transition-colors duration-300"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="space-y-6">
                                    <div className="bg-[#F5F5DC] rounded-lg p-6">
                                        <div className="flex flex-col items-center space-y-4">
                                            <div className="w-full max-w-md">
                                                <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="p-2 bg-[#2C1810]/5 rounded-full">
                                                            <FaUser className="text-xl text-[#8B4513]" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-[#5C4033]">Account Status</p>
                                                            <p className="text-lg text-[#2C1810] font-semibold">Active Member</p>
                                                        </div>
                                                    </div>
                                                    <span className="px-3 py-1 bg-[#DAA520]/10 text-[#DAA520] rounded-full text-sm font-medium">
                                                        Verified
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="px-6 py-2 bg-[#2C1810] text-[#F5F5DC] rounded-md hover:bg-[#8B4513] transition-colors duration-300"
                                        >
                                            Edit Profile
                                        </button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <StatCard
                            icon={GiEgyptianTemple}
                            title="Artifacts Liked"
                            value={stats.totalLiked}
                            color="bg-[#DAA520]"
                        />
                        <StatCard
                            icon={GiAncientColumns}
                            title="Artifacts Added"
                            value={stats.totalAdded}
                            color="bg-[#8B4513]"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-white rounded-lg shadow-xl p-6 border border-[#8B4513]/20"
                        >
                            <h3 className="text-xl font-bold text-[#2C1810] mb-4 font-[Cinzel]">Quick Links</h3>
                            <div className="space-y-3">
                                <a
                                    href="/my-artifacts"
                                    className="block px-4 py-2 text-[#2C1810] hover:bg-[#F5F5DC] rounded-md transition-colors duration-300"
                                >
                                    View My Artifacts
                                </a>
                                <a
                                    href="/liked-artifacts"
                                    className="block px-4 py-2 text-[#2C1810] hover:bg-[#F5F5DC] rounded-md transition-colors duration-300"
                                >
                                    View Liked Artifacts
                                </a>
                                <a
                                    href="/add-artifact"
                                    className="block px-4 py-2 text-[#2C1810] hover:bg-[#F5F5DC] rounded-md transition-colors duration-300"
                                >
                                    Add New Artifact
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;