import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Message sent successfully! We will get back to you soon.');
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg p-8"
            >
                <h1 className="text-4xl font-[Cinzel] font-bold text-[#8B4513] mb-8 text-center">
                    Contact Us
                </h1>

                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-[Cinzel] font-semibold text-[#8B4513] mb-4">
                                Get in Touch
                            </h2>
                            <p className="text-[#2C1810]">
                                Have questions about artifacts or need assistance? We're here to help!
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start space-x-4">
                                <svg className="w-6 h-6 text-[#8B4513] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <div>
                                    <h3 className="font-semibold text-[#8B4513]">Email</h3>
                                    <p className="text-[#2C1810]">contact@relicveil.com</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <svg className="w-6 h-6 text-[#8B4513] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <div>
                                    <h3 className="font-semibold text-[#8B4513]">Phone</h3>
                                    <p className="text-[#2C1810]">+880 1712-345678</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <svg className="w-6 h-6 text-[#8B4513] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <div>
                                    <h3 className="font-semibold text-[#8B4513]">Location</h3>
                                    <p className="text-[#2C1810]">House 123, Road 12, Block B, Banani, Dhaka 1213, Bangladesh</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-[#2C1810]">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-[#8B4513]/20 shadow-sm focus:border-[#8B4513] focus:ring-[#8B4513] sm:text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[#2C1810]">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-[#8B4513]/20 shadow-sm focus:border-[#8B4513] focus:ring-[#8B4513] sm:text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-[#2C1810]">
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-[#8B4513]/20 shadow-sm focus:border-[#8B4513] focus:ring-[#8B4513] sm:text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-[#2C1810]">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-[#8B4513]/20 shadow-sm focus:border-[#8B4513] focus:ring-[#8B4513] sm:text-sm"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#8B4513] hover:bg-[#654321] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B4513] transition-colors duration-300"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default Contact; 