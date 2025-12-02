'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from '@/navigation';
import Image from 'next/image';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 cyber-grid opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-black-dark to-cyber-black" />

      {/* Scanline Effect */}
      <div className="absolute inset-0 scanline" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center md:text-left"
          >
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-cyber-red"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {t('title')}
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl lg:text-3xl mb-8 font-mono text-cyber-gray"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {t('slogan')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex gap-4 justify-center md:justify-start"
            >
              <Link href="/contact">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-cyber-red text-black font-bold rounded-md hover:bg-cyber-red-light transition-all duration-300 cursor-pointer"
                >
                  Get In Touch
                </motion.div>
              </Link>
              <Link href="/projects">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 border-2 border-cyber-red text-cyber-red font-bold rounded-md hover:bg-cyber-red-alpha/10 transition-all duration-300 cursor-pointer"
                >
                  View Projects
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 rounded-full border-2 border-cyber-red" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-cyber-red">
                <Image
                  src="/profile.jpg?v=2"
                  alt="Saad El Filali"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  style={{ 
                    objectPosition: 'center top'
                  }}
                  priority
                  unoptimized
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <Link href="/about">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex flex-col items-center text-cyber-red cursor-pointer"
            >
              <span className="text-sm font-mono mb-2">Explore</span>
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

