'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playCyberSound } from '@/utils/sounds';

export default function LoadingScreen({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Play startup sound
        playCyberSound('startup');

        // Progress animation
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 1;
            });
        }, 30); // 30ms * 100 = 3000ms = 3s

        // Remove loading screen after 3 seconds
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, []);

    return (
        <>
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 z-[200] bg-cyber-black flex flex-col items-center justify-center overflow-hidden"
                    >
                        {/* Background Effects */}
                        <div className="absolute inset-0 cyber-grid opacity-20" />
                        <div className="absolute inset-0 scanline opacity-30" />

                        <div className="relative z-10 w-full max-w-md px-6">
                            {/* Text Animation */}
                            <div className="mb-8 font-mono text-center">
                                <motion.h2
                                    animate={{ opacity: [1, 0.5, 1] }}
                                    transition={{ duration: 0.5, repeat: Infinity }}
                                    className="text-2xl font-bold text-cyber-red mb-2 glitch-text"
                                    data-text="INITIALIZING SYSTEM..."
                                >
                                    INITIALIZING SYSTEM...
                                </motion.h2>
                                <div className="flex justify-between text-xs text-cyber-gray">
                                    <span>LOADING ASSETS</span>
                                    <span>{progress}%</span>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="h-2 bg-cyber-black border border-cyber-red/30 p-[1px]">
                                <motion.div
                                    className="h-full bg-cyber-red shadow-[0_0_10px_rgba(255,0,0,0.5)]"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            {/* Console Output Effect */}
                            <div className="mt-4 font-mono text-xs text-cyber-gray/70 h-16 opacity-70">
                                <p>> Connecting to secure server...</p>
                                {progress > 30 && <p>> Verifying encryption keys...</p>}
                                {progress > 60 && <p>> Loading interface modules...</p>}
                                {progress > 90 && <p>> ACCESS GRANTED</p>}
                            </div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className={isLoading ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 transition-opacity duration-1000'}>
                {children}
            </div>
        </>
    );
}
