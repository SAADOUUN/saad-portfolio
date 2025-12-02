'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

export default function About() {
  const t = useTranslations('about');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const text = t('description');
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, [text]);

  // Matrix effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrix = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff00';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillStyle = y < canvas.height * 0.3 ? '#ff0000' : '#00ff00';
        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 35);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex items-start pt-32">
      {/* Matrix Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
      />
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative cyber-border p-8 md:p-12 bg-cyber-black-dark/50 backdrop-blur-sm">

            {/* Terminal Header */}
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-cyber-red">
              <Terminal className="w-5 h-5 text-cyber-red" />
              <h2 className="text-3xl md:text-4xl font-bold neon-red">
                {t('title')}
              </h2>
            </div>

            {/* Typing Effect */}
            <div className="relative">
              <p className="text-lg md:text-xl leading-relaxed font-mono text-cyber-gray whitespace-pre-wrap">
                {displayedText}
                {isTyping && (
                  <span className="terminal-cursor inline-block ml-1">|</span>
                )}
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

