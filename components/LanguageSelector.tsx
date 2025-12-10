'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useState } from 'react';
import { useAutoTranslation } from './AutoTranslationProvider';

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
  const { setAutoLang, isLoading, autoLang } = useAutoTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [customLang, setCustomLang] = useState('');

  const currentLocaleCode = autoLang || locale;

  const handleStandardLanguageChange = (newLocale: string) => {
    setAutoLang(null); // Reset auto lang
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    router.push(pathWithoutLocale, { locale: newLocale as any });
    setIsOpen(false);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customLang.trim()) {
      setAutoLang(customLang.trim());
      setIsOpen(false);
      setCustomLang('');
    }
  };

  const currentLanguage = languages.find((l) => l.code === currentLocaleCode) || {
    code: 'auto',
    flag: '🤖',
    name: autoLang ? autoLang.toUpperCase().slice(0, 2) : 'AI'
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="cyber-border bg-cyber-black-dark px-4 py-2 flex items-center justify-between md:justify-start gap-2 group relative overflow-hidden w-full md:w-auto"
      >
        <div className="flex items-center gap-2">
          {/* Animated Neon Globe Icon */}
          <div className="relative">
            <motion.div
              animate={{
                rotate: isLoading ? 360 : 0,
              }}
              transition={{
                duration: 1,
                repeat: isLoading ? Infinity : 0,
                ease: 'linear',
              }}
              className="relative"
            >
              <Globe className={`w-5 h-5 ${isLoading ? 'text-yellow-400' : 'text-cyber-red'}`}
                style={{
                  filter: isLoading
                    ? 'drop-shadow(0 0 4px rgba(255, 255, 0, 0.8))'
                    : 'drop-shadow(0 0 4px rgba(255, 0, 0, 0.8))',
                }} />
            </motion.div>
          </div>

          {/* Text */}
          <span className="text-xs font-mono text-cyber-gray group-hover:text-cyber-red transition-colors">
            {isLoading ? 'TRANSLATING...' : 'CYBER TRANSLATOR'}
          </span>
        </div>

        {/* Current Language Badge */}
        <div className="flex items-center gap-1 ml-1">
          <span className="text-sm">{currentLanguage.flag}</span>
          <span className="text-xs font-mono text-cyber-red">{currentLanguage.name}</span>
        </div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full md:top-auto md:bottom-full left-0 mt-2 md:mt-0 md:mb-2 w-full md:w-64 bg-cyber-black-dark border border-cyber-red z-50 p-2 shadow-[0_0_20px_rgba(255,0,0,0.2)]"
          >
            <div className="grid grid-cols-2 gap-2 mb-4">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleStandardLanguageChange(lang.code)}
                  className={`flex items-center gap-2 p-2 hover:bg-cyber-red/10 transition-colors border ${currentLocaleCode === lang.code ? 'border-cyber-red' : 'border-transparent'
                    }`}
                >
                  <span>{lang.flag}</span>
                  <span className="text-xs font-mono text-cyber-gray">{lang.name}</span>
                </button>
              ))}
            </div>

            <div className="border-t border-cyber-gray/20 pt-2">
              <p className="text-[10px] text-cyber-gray mb-2 font-mono uppercase">Universal Translator</p>
              <form onSubmit={handleCustomSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={customLang}
                  onChange={(e) => setCustomLang(e.target.value)}
                  placeholder="Type any language..."
                  className="flex-1 bg-cyber-black border border-cyber-gray/30 text-xs text-cyber-gray px-2 py-1 focus:border-cyber-red focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!customLang.trim()}
                  className="bg-cyber-red/20 text-cyber-red border border-cyber-red px-2 py-1 text-xs hover:bg-cyber-red hover:text-white transition-colors disabled:opacity-50"
                >
                  GO
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
