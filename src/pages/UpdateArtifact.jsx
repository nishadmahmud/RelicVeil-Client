import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../auth/AuthProvider';

const UpdateArtifact = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, getToken } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Redirect if not authenticated
    if (!user) {
        toast.error('Please login to update artifacts');
        return <Navigate to="/login" replace />;
    }

    const [formData, setFormData] = useState({
        name: '',
        image: '',
        type: '',
        historicalContext: '',
        description: '',
        createdAt: '',
        discoveredAt: '',
        discoveredBy: '',
        presentLocation: ''
    });

    const artifactTypes = [
        'Tools',
        'Weapons',
        'Documents',
        'Writings',
        'Pottery',
        'Jewelry',
        'Clothing',
        'Religious Items',
        'Art',
        'Other'
    ];

    useEffect(() => {
        fetchArtifactDetails();
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
            setFormData({
                name: data.name || '',
                image: data.image || '',
                type: data.type || '',
                historicalContext: data.historicalContext || '',
                description: data.description || '',
                createdAt: data.createdAt || '',
                discoveredAt: data.discoveredAt || '',
                discoveredBy: data.discoveredBy || '',
                presentLocation: data.presentLocation || ''
            });
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to fetch artifact details');
            navigate('/my-artifacts');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            // Get the Firebase ID token
            const token = await getToken();
            
            const response = await fetch(`http://localhost:5000/api/artifacts/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to update artifact');
            }

            const data = await response.json();
            
            if (data.success) {
                toast.success('Artifact updated successfully!');
                navigate('/my-artifacts');
            } else {
                throw new Error(data.message || 'Failed to update artifact');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F5F5DC] pt-24 flex items-center justify-center">
                <div className="text-2xl text-[#2C1810] font-[Cinzel]">Loading artifact details...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5F5DC] py-12 px-4 sm:px-6 lg:px-8 pt-24">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white rounded-lg shadow-xl p-8 border border-[#8B4513]/20"
                >
                    <h2 className="text-3xl font-bold text-center text-[#2C1810] mb-8 font-[Cinzel]">
                        Update Artifact
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label className="block text-[#2C1810] font-semibold mb-2">
                                Artifact Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-[#8B4513]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA520]"
                            />
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="block text-[#2C1810] font-semibold mb-2">
                                Image URL
                            </label>
                            <input
                                type="url"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-[#8B4513]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA520]"
                            />
                        </div>

                        {/* Type */}
                        <div>
                            <label className="block text-[#2C1810] font-semibold mb-2">
                                Artifact Type
                            </label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-[#8B4513]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA520]"
                            >
                                <option value="">Select Type</option>
                                {artifactTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Historical Context */}
                        <div>
                            <label className="block text-[#2C1810] font-semibold mb-2">
                                Historical Context
                            </label>
                            <textarea
                                name="historicalContext"
                                value={formData.historicalContext}
                                onChange={handleChange}
                                required
                                rows="4"
                                className="w-full px-4 py-2 border border-[#8B4513]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA520]"
                            />
                        </div>

                        {/* Created At */}
                        <div>
                            <label className="block text-[#2C1810] font-semibold mb-2">
                                Created At (e.g., "100 BC")
                            </label>
                            <input
                                type="text"
                                name="createdAt"
                                value={formData.createdAt}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-[#8B4513]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA520]"
                            />
                        </div>

                        {/* Discovered At */}
                        <div>
                            <label className="block text-[#2C1810] font-semibold mb-2">
                                Discovered At (e.g., "1799")
                            </label>
                            <input
                                type="text"
                                name="discoveredAt"
                                value={formData.discoveredAt}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-[#8B4513]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA520]"
                            />
                        </div>

                        {/* Discovered By */}
                        <div>
                            <label className="block text-[#2C1810] font-semibold mb-2">
                                Discovered By
                            </label>
                            <input
                                type="text"
                                name="discoveredBy"
                                value={formData.discoveredBy}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-[#8B4513]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA520]"
                            />
                        </div>

                        {/* Present Location */}
                        <div>
                            <label className="block text-[#2C1810] font-semibold mb-2">
                                Present Location
                            </label>
                            <input
                                type="text"
                                name="presentLocation"
                                value={formData.presentLocation}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-[#8B4513]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA520]"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                disabled={submitting}
                                className={`px-8 py-3 bg-[#2C1810] text-[#F5F5DC] rounded-lg hover:bg-[#8B4513] transition-colors duration-300 ${
                                    submitting ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                {submitting ? 'Updating...' : 'Update Artifact'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default UpdateArtifact; 