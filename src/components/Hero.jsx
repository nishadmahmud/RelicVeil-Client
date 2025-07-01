import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hero = () => {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
        cssEase: 'linear',
        pauseOnHover: true,
        dotsClass: "slick-dots custom-dots"
    };

    const slides = [
        {
            bgImage: "url('https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=2070')",
            title: "Discover the Stories Behind",
            subtitle: "Historical Treasures",
            description: "Explore a curated collection of artifacts that shaped history. Each piece tells a unique story of our shared past."
        },
        {
            bgImage: "url('https://images.unsplash.com/photo-1608924066819-930edc42986a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            title: "Journey Through Time With",
            subtitle: "Ancient Artifacts",
            description: "Uncover the mysteries and legends behind ancient civilizations through their preserved artifacts."
        },
        {
            bgImage: "url('https://images.unsplash.com/photo-1569511166187-97eb6e387e19?q=80&w=2070')",
            title: "Preserve and Share",
            subtitle: "Cultural Heritage",
            description: "Join our community in documenting and preserving the world's cultural heritage for future generations."
        }
    ];

    return (
        <div className="relative min-h-[90vh] min-h-[400px] mt-10 overflow-hidden font-[Cinzel]">
            <style jsx>{`
                .custom-dots {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    padding: 0;
                    margin: 0;
                    list-style: none;
                    text-align: center;
                    z-index: 20;
                }
                .custom-dots li {
                    display: inline-block;
                    margin: 0 4px;
                }
                .custom-dots li button {
                    width: 12px;
                    height: 12px;
                    padding: 0;
                    border: 2px solid #DAA520;
                    border-radius: 50%;
                    background: transparent;
                    text-indent: -9999px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .custom-dots li.slick-active button {
                    background: #DAA520;
                    transform: scale(1.2);
                }
            `}</style>

            <Slider {...sliderSettings}>
                {slides.map((slide, index) => (
                    <div key={index} className="relative min-h-[90vh] min-h-[400px] flex items-center justify-center pt-8">

                        <div 
                            className="absolute inset-0 z-0"
                            style={{
                                backgroundImage: slide.bgImage,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundAttachment: 'fixed'
                            }}
                        >
                            <div className="absolute inset-0 bg-[#2C1810]/60"></div>
                        </div>


                        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="mb-6"
                            >
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight">
                                    {slide.title}
                                    <span className="block text-[#DAA520] mt-2">{slide.subtitle}</span>
                                </h1>
                                <p className="text-base sm:text-lg md:text-xl text-[#F5F5DC] mb-5 max-w-3xl mx-auto leading-relaxed">
                                    {slide.description}
                                </p>

                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    <Link
                                        to="/all-artifacts"
                                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#8B4513] hover:bg-[#654321] transition-all duration-300 transform hover:scale-105"
                                    >
                                        Explore Collection
                                    </Link>
                                    <Link
                                        to="/add-artifact"
                                        className="inline-flex items-center px-6 py-3 border-2 border-[#DAA520] text-base font-medium rounded-md text-[#DAA520] hover:bg-[#DAA520]/10 transition-all duration-300 transform hover:scale-105"
                                    >
                                        Share an Artifact
                                    </Link>
                                </div>
                            </motion.div>


                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-6xl mx-auto mb-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.8 }}
                                    className="bg-white/10 backdrop-blur-sm p-4 rounded-lg"
                                >
                                    <h3 className="text-[#DAA520] text-xl font-semibold mb-2">Discover</h3>
                                    <p className="text-[#F5F5DC] text-base">Explore artifacts from different eras and cultures</p>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, duration: 0.8 }}
                                    className="bg-white/10 backdrop-blur-sm p-4 rounded-lg"
                                >
                                    <h3 className="text-[#DAA520] text-xl font-semibold mb-2">Learn</h3>
                                    <p className="text-[#F5F5DC] text-base">Uncover the stories and significance behind each piece</p>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6, duration: 0.8 }}
                                    className="bg-white/10 backdrop-blur-sm p-4 rounded-lg"
                                >
                                    <h3 className="text-[#DAA520] text-xl font-semibold mb-2">Share</h3>
                                    <p className="text-[#F5F5DC] text-base">Contribute your own artifacts to our growing collection</p>
                                </motion.div>
                            </div>
                        </div>


                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#2C1810] to-transparent z-10"></div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Hero;