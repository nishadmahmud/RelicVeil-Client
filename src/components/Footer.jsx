import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaGithub, FaHeart } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[#2C1810] text-[#F5F5DC] py-12 font-[Cinzel]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div>
                        <h3 className="text-2xl font-bold text-[#DAA520] mb-4">RelicVeil</h3>
                        <p className="text-sm">
                            Preserving history, one artifact at a time. Join our community of history enthusiasts and help us document the world's cultural heritage.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-[#DAA520] mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/all-artifacts" className="hover:text-[#DAA520] transition-colors duration-300">
                                    Browse Artifacts
                                </Link>
                            </li>
                            <li>
                                <Link to="/add-artifact" className="hover:text-[#DAA520] transition-colors duration-300">
                                    Add Artifact
                                </Link>
                            </li>
                            <li>
                                <Link to="/liked-artifacts" className="hover:text-[#DAA520] transition-colors duration-300">
                                    Liked Artifacts
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-[#DAA520] mb-4">Connect With Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-[#DAA520] transition-colors duration-300">
                                <FaFacebook size={24} />
                            </a>
                            <a href="#" className="hover:text-[#DAA520] transition-colors duration-300">
                                <FaTwitter size={24} />
                            </a>
                            <a href="#" className="hover:text-[#DAA520] transition-colors duration-300">
                                <FaInstagram size={24} />
                            </a>
                            <a href="#" className="hover:text-[#DAA520] transition-colors duration-300">
                                <FaGithub size={24} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-[#8B4513] text-center">
                    <p className="text-sm">
                        Made with <FaHeart className="inline-block text-[#DAA520] mx-1" /> by RelicVeil Team © {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;