'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Shield, MapPin, Calendar, CheckCircle } from 'lucide-react';
import MediaGallery from './MediaGallery';

export default function Experience() {
    const t = useTranslations('experiences');

    const galleryItems = [
        { id: '1', type: 'image' as const, src: '/images/can2025/can2025-01.jpg', alt: 'Stadier - CAN 2025' },
        { id: '2', type: 'image' as const, src: '/images/can2025/can2025-02.jpg', alt: 'Stade Atmosphere' },
        { id: '3', type: 'image' as const, src: '/images/can2025/can2025-03.jpg', alt: 'Security Check' },
        { id: '4', type: 'image' as const, src: '/images/can2025/can2025-04.jpg', alt: 'Crowd Management' },
        { id: '5', type: 'image' as const, src: '/images/can2025/can2025-05.jpg', alt: 'Team Briefing' },
        { id: '6', type: 'image' as const, src: '/images/can2025/can2025-06.jpg', alt: 'Event Moments' },
        { id: 'vid1', type: 'video' as const, src: '/images/can2025/can2025-video-01.mp4', alt: 'Live Action' },
        // Add second video if it exists after checking
    ];

    return (
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 min-h-screen">
            <div className="container mx-auto max-w-7xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-block mb-4">
                        <span className="text-xs font-mono text-cyber-red border border-cyber-red px-3 py-1">
                            PROFESSIONAL_LOG // AUTH_REQUIRED
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-cyber-red font-mono mt-4">
                        {t('title')}
                    </h2>
                </motion.div>

                {/* Experience Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="w-full bg-cyber-black-dark/80 backdrop-blur-sm border border-cyber-red/50 relative overflow-hidden"
                >
                    {/* Decorative Scan Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-red to-transparent opacity-50" />

                    <div className="p-6 md:p-8 lg:p-10">
                        {/* Job Header */}
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8 border-b border-cyber-red/20 pb-6">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <Shield className="w-6 h-6 text-cyber-red" />
                                    <h3 className="text-2xl font-bold font-mono text-white">
                                        {t('stadier.title')}
                                    </h3>
                                </div>
                                <div className="flex items-center gap-4 text-cyber-gray font-mono text-sm">
                                    <span className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        {t('stadier.location')}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        2025
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-10 space-y-4">
                            <p className="text-cyber-gray leading-relaxed font-mono border-l-2 border-cyber-red/30 pl-4">
                                {t('stadier.description')}
                            </p>
                        </div>

                        {/* Gallery Section */}
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-2 h-2 bg-cyber-red rounded-full animate-pulse" />
                                <h4 className="font-mono text-cyber-red uppercase tracking-wider">
                                    {t('stadier.gallery')}
                                </h4>
                                <div className="h-px bg-cyber-red/30 flex-1 ml-4" />
                            </div>

                            <MediaGallery items={galleryItems} />
                        </div>

                    </div>
                </motion.div>

            </div>
        </section>
    );
}
