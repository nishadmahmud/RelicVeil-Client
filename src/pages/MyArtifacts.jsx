import React, { useState, useEffect, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { FaEdit, FaTrash, FaMapMarkerAlt, FaCalendarAlt, FaArchway } from 'react-icons/fa';
import { AuthContext } from '../auth/AuthProvider';
import Swal from 'sweetalert2';

const MyArtifacts = () => {
    const { user, getToken } = useContext(AuthContext);
    const [artifacts, setArtifacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = 'My Artifacts - RelicVeil';
    }, []);

    if (!user) {
        toast.error('Please login to view your artifacts');
        return <Navigate to="/login" replace />;
    }

    useEffect(() => {
        fetchMyArtifacts();
    }, [user]);

    const fetchMyArtifacts = async () => {
        try {
            const token = await getToken();
            
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/artifacts/user/${user.email}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch artifacts');
            }
            
            const data = await response.json();
            setArtifacts(data);
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to fetch your artifacts');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, artifactName) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete "${artifactName}"? This action cannot be undone.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2C1810',
            cancelButtonColor: '#8B4513',
            confirmButtonText: 'Yes, delete it!',
            background: '#F5F5DC',
            color: '#2C1810',
            customClass: {
                popup: 'font-[Cinzel]',
                title: 'text-2xl',
                confirmButton: 'bg-[#2C1810] text-[#F5F5DC] px-4 py-2 rounded-lg hover:bg-[#8B4513] transition-colors duration-300',
                cancelButton: 'bg-[#8B4513] text-[#F5F5DC] px-4 py-2 rounded-lg hover:bg-[#2C1810] transition-colors duration-300'
            }
        });

        if (result.isConfirmed) {
            try {
                const token = await getToken();
                
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/artifacts/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();

                if (data.success) {
                    await Swal.fire({
                        title: 'Deleted!',
                        text: 'Your artifact has been deleted.',
                        icon: 'success',
                        confirmButtonColor: '#2C1810',
                        background: '#F5F5DC',
                        color: '#2C1810',
                        customClass: {
                            popup: 'font-[Cinzel]',
                            confirmButton: 'bg-[#2C1810] text-[#F5F5DC] px-4 py-2 rounded-lg hover:bg-[#8B4513] transition-colors duration-300'
                        }
                    });
                    
                    setArtifacts(artifacts.filter(artifact => artifact._id !== id));
                } else {
                    throw new Error(data.message || 'Failed to delete artifact');
                }
            } catch (error) {
                console.error('Error:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to delete artifact',
                    icon: 'error',
                    confirmButtonColor: '#2C1810',
                    background: '#F5F5DC',
                    color: '#2C1810',
                    customClass: {
                        popup: 'font-[Cinzel]',
                        confirmButton: 'bg-[#2C1810] text-[#F5F5DC] px-4 py-2 rounded-lg hover:bg-[#8B4513] transition-colors duration-300'
                    }
                });
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F5F5DC] pt-24 flex items-center justify-center">
                <div className="text-2xl text-[#2C1810] font-[Cinzel]">Loading your artifacts...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5F5DC] py-12 px-4 sm:px-6 lg:px-8 pt-24">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-[#2C1810] mb-4 font-[Cinzel]">
                        My Artifacts Collection
                    </h1>
                    <p className="text-lg text-[#5C4033]">
                        Manage and update your contributed artifacts
                    </p>
                </div>

                {artifacts.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center py-16 bg-white rounded-lg shadow-xl"
                    >
                        <FaArchway className="mx-auto text-6xl text-[#8B4513] mb-4" />
                        <h2 className="text-2xl font-bold text-[#2C1810] mb-4 font-[Cinzel]">
                            No Artifacts Added Yet
                        </h2>
                        <p className="text-[#5C4033] mb-8">
                            Start building your collection by adding your first artifact.
                        </p>
                        <Link
                            to="/add-artifact"
                            className="inline-flex items-center px-6 py-3 bg-[#2C1810] text-[#F5F5DC] rounded-lg hover:bg-[#8B4513] transition-colors duration-300"
                        >
                            Add Your First Artifact
                        </Link>
                    </motion.div>
                ) : (
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
                                    <div className="flex items-center justify-between mt-4">
                                        <Link
                                            to={`/update-artifact/${artifact._id}`}
                                            className="inline-flex items-center px-4 py-2 bg-[#DAA520] text-white rounded-lg hover:bg-[#8B4513] transition-colors duration-300"
                                        >
                                            <FaEdit className="mr-2" />
                                            Update
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(artifact._id, artifact.name)}
                                            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
                                        >
                                            <FaTrash className="mr-2" />
                                            Delete
                                        </button>
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

export default MyArtifacts;