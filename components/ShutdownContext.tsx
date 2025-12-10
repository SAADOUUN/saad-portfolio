'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import useSound from 'use-sound';

interface ShutdownContextType {
    isShutdown: boolean;
    triggerShutdown: () => void;
}

const ShutdownContext = createContext<ShutdownContextType | undefined>(undefined);

export function ShutdownProvider({ children }: { children: React.ReactNode }) {
    const [isShutdown, setIsShutdown] = useState(false);
    const [inputBuffer, setInputBuffer] = useState('');

    // Sounds (optional, but requested in previous conversations, might add flavor later)
    // For now focusing on logic.

    useEffect(() => {
        // Check local storage on mount
        const savedState = localStorage.getItem('site_shutdown_state');
        if (savedState === 'true') {
            setIsShutdown(true);
        }
    }, []);

    useEffect(() => {
        if (isShutdown) {
            localStorage.setItem('site_shutdown_state', 'true');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        } else {
            localStorage.setItem('site_shutdown_state', 'false');
            document.body.style.overflow = 'unset';
        }
    }, [isShutdown]);

    // Key listener for recovery code "saad"
    useEffect(() => {
        if (!isShutdown) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            const char = e.key.toLowerCase();
            // Allow only letters to be added to buffer
            if (/^[a-z]$/.test(char)) {
                setInputBuffer((prev) => {
                    const newBuffer = (prev + char).slice(-4); // Keep last 4 chars
                    if (newBuffer === 'saad') {
                        setIsShutdown(false);
                        return '';
                    }
                    return newBuffer;
                });
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isShutdown]);

    const triggerShutdown = () => {
        setIsShutdown(true);
    };

    return (
        <ShutdownContext.Provider value={{ isShutdown, triggerShutdown }}>
            {children}
            {isShutdown && (
                <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center cursor-none select-none">
                    <div className="text-center font-mono space-y-4">
                        <h1 className="text-red-600 text-4xl md:text-6xl font-black tracking-widest animate-pulse">
                            SYSTEM FAIL
                        </h1>
                        <p className="text-red-500/80 text-xl tracking-wider">
                            CONNECTION LOST
                        </p>
                        <div className="text-red-900/40 text-sm mt-8">
                            FATAL ERROR: 0x000000
                        </div>
                    </div>
                </div>
            )}
        </ShutdownContext.Provider>
    );
}

export function useShutdown() {
    const context = useContext(ShutdownContext);
    if (context === undefined) {
        throw new Error('useShutdown must be used within a ShutdownProvider');
    }
    return context;
}
