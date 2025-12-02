'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/navigation';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', flag: '🇬🇧', name: 'EN' },
  { code: 'fr', flag: '🇫🇷', name: 'FR' },
  { code: 'ar', flag: '🇸🇦', name: 'AR' },
  { code: 'de', flag: '🇩🇪', name: 'DE' },
];

export default function LanguageSelector() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    router.push(pathWithoutLocale, { locale: newLocale as any });
  };

  const currentIndex = languages.findIndex((l) => l.code === locale);
  const currentLanguage = languages[currentIndex] || languages[0];

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % languages.length;
    handleLanguageChange(languages[nextIndex].code);
  };

  return (
    <div className="relative">
      <motion.button
        onClick={handleNext}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="cyber-border bg-cyber-black-dark px-4 py-2 flex items-center gap-2 group relative overflow-hidden"
      >
        {/* Animated Neon Globe Icon */}
        <div className="relative">
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="relative"
          >
            <Globe className="w-5 h-5 text-cyber-red"
              style={{
                filter: 'drop-shadow(0 0 4px rgba(255, 0, 0, 0.8)) drop-shadow(0 0 8px rgba(255, 0, 0, 0.6))',
              }} />
          </motion.div>

          {/* Pulsing glow effect */}
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 bg-cyber-red rounded-full blur-sm"
            style={{ opacity: 0.3 }}
          />
        </div>

        {/* Text */}
        <span className="text-xs font-mono text-cyber-gray group-hover:text-cyber-red transition-colors">
          CYBER TRANSLATOR
        </span>

        {/* Current Language Badge */}
        <div className="flex items-center gap-1 ml-1">
          <span className="text-sm">{currentLanguage.flag}</span>
          <span className="text-xs font-mono text-cyber-red">{currentLanguage.name}</span>
        </div>

        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 bg-cyber-red-alpha/10 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            boxShadow: 'inset 0 0 20px rgba(255, 0, 0, 0.2)',
          }}
        />
      </motion.button>

      {/* Tooltip on hover */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="bg-cyber-black-dark border border-cyber-red px-2 py-1 text-xs font-mono text-cyber-gray whitespace-nowrap">
          Click to switch: {languages.map(l => l.name).join(' / ')}
        </div>
      </div>
    </div>
  );
}
