'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, ZoomIn, Image as ImageIcon, Film } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface MediaItem {
    id: string;
    type: 'image' | 'video';
    src: string;
    thumbnail?: string; // For videos
    alt: string;
}

interface MediaGalleryProps {
    items: MediaItem[];
}

export default function MediaGallery({ items }: MediaGalleryProps) {
    const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
    const t = useTranslations('experiences.stadier'); // Adjust scope if needed

    return (
        <>
            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, zIndex: 10 }}
                        className="relative cursor-pointer group aspect-square overflow-hidden border border-cyber-red/30 bg-cyber-black-dark rounded-md shadow-lg shadow-cyber-red/10"
                        onClick={() => setSelectedMedia(item)}
                    >
                        {/* Thumbnail */}
                        {item.type === 'video' ? (
                            <div className="w-full h-full flex items-center justify-center bg-black relative">
                                {/* Video with reduced opacity/overlay until hover? Or just a play icon over a black bg if no thumbnail */}
                                <div className="absolute inset-0 bg-cyber-red/10 group-hover:bg-cyber-red/20 transition-colors" />
                                <Film className="w-12 h-12 text-cyber-red opacity-50 group-hover:opacity-100 transition-opacity" />
                                <span className="absolute bottom-2 right-2 text-xs font-mono text-cyber-red bg-black/80 px-1">VIDEO</span>
                            </div>
                        ) : (
                            <div className="w-full h-full relative">
                                <img
                                    src={item.src}
                                    alt={item.alt}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                />
                                <div className="absolute inset-0 bg-cyber-red/10 group-hover:bg-transparent transition-colors" />
                            </div>
                        )}

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 backdrop-blur-sm">
                            <ZoomIn className="w-8 h-8 text-cyber-red" />
                        </div>

                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyber-red opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyber-red opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyber-red opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyber-red opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                ))}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedMedia && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
                        onClick={() => setSelectedMedia(null)}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-6 right-6 text-cyber-red hover:text-white transition-colors z-50"
                            onClick={() => setSelectedMedia(null)}
                        >
                            <X size={32} />
                        </button>

                        {/* Content */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="relative max-w-5xl max-h-[90vh] w-full flex items-center justify-center bg-transparent shadow-[0_0_50px_rgba(255,0,60,0.2)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Cyber Border */}
                            <div className="absolute -inset-1 border border-cyber-red/50 opacity-50 pointer-events-none" />

                            {selectedMedia.type === 'video' ? (
                                <video
                                    src={selectedMedia.src}
                                    controls
                                    autoPlay
                                    className="max-w-full max-h-[85vh] rounded-sm border border-cyber-red/20"
                                />
                            ) : (
                                <img
                                    src={selectedMedia.src}
                                    alt={selectedMedia.alt}
                                    className="max-w-full max-h-[85vh] object-contain rounded-sm border border-cyber-red/20"
                                />
                            )}
                        </motion.div>

                        {/* Caption/Label */}
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-cyber-gray font-mono text-sm bg-black/80 px-4 py-2 rounded border border-cyber-red/30">
                            {selectedMedia.alt}
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
