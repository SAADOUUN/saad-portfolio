'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/navigation';
import { motion } from 'framer-motion';
import { Download, X, Menu, Lock } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { playCyberSound } from '@/utils/sounds';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { key: 'home', href: '/' },
    { key: 'about', href: '/about' },
    { key: 'skills', href: '/skills' },
    { key: 'projects', href: '/projects' },
    { key: 'certifications', href: '/certifications' },
    { key: 'contact', href: '/contact' },
  ];

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/cv.pdf';
    link.download = 'Saad_El_Filali_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.nav
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-cyber-black border-r border-cyber-red z-50 flex-col"
      >
        {/* SAAD with Lock */}
        <div className="p-6 border-b border-cyber-red flex items-center justify-center">
          <Link href="/">
            <motion.div
              className="relative cursor-pointer group flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => playCyberSound('hover')}
              onClick={() => playCyberSound('click')}
            >
              <motion.span
                className="text-2xl font-bold neon-red relative z-10"
                whileHover={{
                  textShadow: [
                    '0 0 5px #ff0000, 0 0 10px #ff0000, 0 0 15px #ff0000',
                    '0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000',
                    '0 0 5px #ff0000, 0 0 10px #ff0000, 0 0 15px #ff0000'
                  ]
                }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                S
              </motion.span>

              <motion.div
                className="relative flex items-center justify-center"
                whileHover={{
                  rotate: [0, -10, 10, -10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 0.4 }}
              >
                <Lock className="w-6 h-6 text-cyber-red relative z-10" />
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    filter: [
                      'drop-shadow(0 0 3px #ff0000)',
                      'drop-shadow(0 0 8px #ff0000) drop-shadow(0 0 12px #ff0000)',
                      'drop-shadow(0 0 3px #ff0000)'
                    ]
                  }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  <Lock className="w-6 h-6 text-transparent" />
                </motion.div>
              </motion.div>

              <motion.span
                className="text-2xl font-bold neon-red relative z-10"
                whileHover={{
                  textShadow: [
                    '0 0 5px #ff0000, 0 0 10px #ff0000, 0 0 15px #ff0000',
                    '0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000',
                    '0 0 5px #ff0000, 0 0 10px #ff0000, 0 0 15px #ff0000'
                  ]
                }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                AD
              </motion.span>
            </motion.div>
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href === '/' && pathname === `/${locale}`);
            return (
              <Link key={item.key} href={item.href} onClick={() => playCyberSound('click')}>
                <motion.div
                  whileHover={{ x: 5 }}
                  onMouseEnter={() => playCyberSound('hover')}
                  className={`px-6 py-3 font-mono text-sm transition-colors relative ${isActive ? 'text-cyber-red' : 'text-cyber-gray hover:text-cyber-red'
                    }`}
                >
                  {t(item.key)}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-cyber-red"
                      initial={false}
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="p-6 border-t border-cyber-red space-y-4">
          <LanguageSelector />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownloadCV}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-cyber-red text-black font-bold rounded-md hover:bg-cyber-red-light transition-all duration-300"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm">{t('downloadCV')}</span>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Top Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="md:hidden fixed top-0 left-0 right-0 z-50 bg-cyber-black-dark/95 backdrop-blur-sm border-b border-cyber-red"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center flex-1 justify-center">
              {/* SAAD with Lock */}
              <Link href="/">
                <motion.div
                  className="relative cursor-pointer group flex items-center gap-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => playCyberSound('hover')}
                  onClick={() => playCyberSound('click')}
                >
                  <motion.span
                    className="text-xl font-bold neon-red relative z-10"
                    whileHover={{
                      textShadow: [
                        '0 0 5px #ff0000, 0 0 10px #ff0000, 0 0 15px #ff0000',
                        '0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000',
                        '0 0 5px #ff0000, 0 0 10px #ff0000, 0 0 15px #ff0000'
                      ]
                    }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    S
                  </motion.span>

                  <motion.div
                    className="relative flex items-center justify-center"
                    whileHover={{
                      rotate: [0, -10, 10, -10, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <Lock className="w-5 h-5 text-cyber-red relative z-10" />
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        filter: [
                          'drop-shadow(0 0 3px #ff0000)',
                          'drop-shadow(0 0 8px #ff0000) drop-shadow(0 0 12px #ff0000)',
                          'drop-shadow(0 0 3px #ff0000)'
                        ]
                      }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    >
                      <Lock className="w-5 h-5 text-transparent" />
                    </motion.div>
                  </motion.div>

                  <motion.span
                    className="text-xl font-bold neon-red relative z-10"
                    whileHover={{
                      textShadow: [
                        '0 0 5px #ff0000, 0 0 10px #ff0000, 0 0 15px #ff0000',
                        '0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000',
                        '0 0 5px #ff0000, 0 0 10px #ff0000, 0 0 15px #ff0000'
                      ]
                    }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    AD
                  </motion.span>
                </motion.div>
              </Link>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-cyber-red"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-cyber-red bg-cyber-black"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href === '/' && pathname === `/${locale}`);
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      playCyberSound('click');
                    }}
                    className={`block py-2 text-sm font-mono transition-colors ${isActive ? 'text-cyber-red' : 'text-cyber-gray hover:text-cyber-red'
                      }`}
                  >
                    {t(item.key)}
                  </Link>
                );
              })}
            </div>
            <div className="px-4 py-4 border-t border-cyber-red space-y-4">
              <LanguageSelector />
              <button
                onClick={handleDownloadCV}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-cyber-red text-black font-bold rounded-md"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm">{t('downloadCV')}</span>
              </button>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Spacer for desktop sidebar */}
      <div className="hidden md:block w-64" />
    </>
  );
}
