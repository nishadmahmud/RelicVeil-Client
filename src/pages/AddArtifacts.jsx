import React, { useState, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthProvider';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const AddArtifacts = () => {
    const { user, getToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Redirect if not authenticated
    if (!user) {
        toast.error('Please login to add artifacts');
        return <Navigate to="/login" replace />;
    }

    const initialFormState = {
        name: '',
        image: '',
        type: '',
        historicalContext: '',
        description: '',
        createdAt: '',
        discoveredAt: '',
        discoveredBy: '',
        presentLocation: '',
        adderName: user?.displayName || '',
        adderEmail: user?.email || ''
    };

    const [formData, setFormData] = useState(initialFormState);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Get the Firebase ID token
            const token = await getToken();
            
            const response = await fetch('http://localhost:5000/api/artifacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to add artifact');
            }

            const result = await response.json();
            
            if (result.success) {
                toast.success(`Artifact "${formData.name}" has been added successfully!`);
                // Reset form to initial state
                setFormData({
                    ...initialFormState,
                    adderName: user?.displayName || '',
                    adderEmail: user?.email || ''
                });
                // Navigate to my artifacts page after successful addition
                navigate('/my-artifacts');
            } else {
                throw new Error(result.message || 'Failed to add artifact');
            }
        } catch (error) {
            toast.error(error.message);
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F5DC] py-12 px-4 sm:px-6 lg:px-8 font-[Cinzel] pt-24">
            <Helmet>
                <title>Add Artifact - RelicVeil</title>
                <meta name="description" content="Contribute to history by adding a new artifact to our collection." />
            </Helmet>
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white rounded-lg shadow-xl p-8 border border-[#8B4513]/20"
                >
                    <h2 className="text-3xl font-bold text-center text-[#2C1810] mb-8">
                        Add a Historical Artifact
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-[#2C1810]">
                                    Artifact Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border border-[#8B4513]/30 py-2 px-3 text-[#2C1810] shadow-sm focus:border-[#DAA520] focus:ring focus:ring-[#DAA520]/50"
                                    placeholder="Enter artifact name"
                                />
                            </div>

                            <div>
                                <label htmlFor="image" className="block text-sm font-medium text-[#2C1810]">
                                    Artifact Image (URL) *
                                </label>
                                <input
                                    type="url"
                                    id="image"
                                    name="image"
                                    required
                                    value={formData.image}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border border-[#8B4513]/30 py-2 px-3 text-[#2C1810] shadow-sm focus:border-[#DAA520] focus:ring focus:ring-[#DAA520]/50"
                                    placeholder="Enter valid image URL"
                                />
                            </div>

                            <div>
                                <label htmlFor="type" className="block text-sm font-medium text-[#2C1810]">
                                    Artifact Type *
                                </label>
                                <select
                                    id="type"
                                    name="type"
                                    required
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border border-[#8B4513]/30 py-2 px-3 text-[#2C1810] shadow-sm focus:border-[#DAA520] focus:ring focus:ring-[#DAA520]/50"
                                >
                                    <option value="">Select artifact type</option>
                                    {artifactTypes.map((type) => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="createdAt" className="block text-sm font-medium text-[#2C1810]">
                                    Created At *
                                </label>
                                <input
                                    type="text"
                                    id="createdAt"
                                    name="createdAt"
                                    required
                                    value={formData.createdAt}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border border-[#8B4513]/30 py-2 px-3 text-[#2C1810] shadow-sm focus:border-[#DAA520] focus:ring focus:ring-[#DAA520]/50"
                                    placeholder="e.g., 100 BC"
                                />
                            </div>

                            <div>
                                <label htmlFor="discoveredAt" className="block text-sm font-medium text-[#2C1810]">
                                    Discovered At *
                                </label>
                                <input
                                    type="text"
                                    id="discoveredAt"
                                    name="discoveredAt"
                                    required
                                    value={formData.discoveredAt}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border border-[#8B4513]/30 py-2 px-3 text-[#2C1810] shadow-sm focus:border-[#DAA520] focus:ring focus:ring-[#DAA520]/50"
                                    placeholder="e.g., 1799"
                                />
                            </div>

                            <div>
                                <label htmlFor="discoveredBy" className="block text-sm font-medium text-[#2C1810]">
                                    Discovered By *
                                </label>
                                <input
                                    type="text"
                                    id="discoveredBy"
                                    name="discoveredBy"
                                    required
                                    value={formData.discoveredBy}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border border-[#8B4513]/30 py-2 px-3 text-[#2C1810] shadow-sm focus:border-[#DAA520] focus:ring focus:ring-[#DAA520]/50"
                                    placeholder="Enter discoverer's name"
                                />
                            </div>

                            <div>
                                <label htmlFor="presentLocation" className="block text-sm font-medium text-[#2C1810]">
                                    Present Location *
                                </label>
                                <input
                                    type="text"
                                    id="presentLocation"
                                    name="presentLocation"
                                    required
                                    value={formData.presentLocation}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border border-[#8B4513]/30 py-2 px-3 text-[#2C1810] shadow-sm focus:border-[#DAA520] focus:ring focus:ring-[#DAA520]/50"
                                    placeholder="Current location of the artifact"
                                />
                            </div>
                        </div>

                        {/* Description and Context */}
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="historicalContext" className="block text-sm font-medium text-[#2C1810]">
                                    Historical Context *
                                </label>
                                <textarea
                                    id="historicalContext"
                                    name="historicalContext"
                                    required
                                    rows={3}
                                    value={formData.historicalContext}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border border-[#8B4513]/30 py-2 px-3 text-[#2C1810] shadow-sm focus:border-[#DAA520] focus:ring focus:ring-[#DAA520]/50"
                                    placeholder="Describe the historical context of this artifact"
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-[#2C1810]">
                                    Short Description *
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    required
                                    rows={3}
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border border-[#8B4513]/30 py-2 px-3 text-[#2C1810] shadow-sm focus:border-[#DAA520] focus:ring focus:ring-[#DAA520]/50"
                                    placeholder="Provide a brief description of the artifact"
                                />
                            </div>
                        </div>

                        {/* User Information (Read-only) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-[#2C1810]">
                                    Artifact Adder Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.adderName}
                                    readOnly
                                    className="mt-1 block w-full rounded-md border border-[#8B4513]/30 py-2 px-3 bg-[#F5F5DC]/50 text-[#2C1810] cursor-not-allowed"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#2C1810]">
                                    Artifact Adder Email
                                </label>
                                <input
                                    type="email"
                                    value={formData.adderEmail}
                                    readOnly
                                    className="mt-1 block w-full rounded-md border border-[#8B4513]/30 py-2 px-3 bg-[#F5F5DC]/50 text-[#2C1810] cursor-not-allowed"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center pt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#8B4513] hover:bg-[#654321] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DAA520] transform transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                            >
                                {loading ? 'Adding Artifact...' : 'Add Artifact'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default AddArtifacts;