'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="relative border-t border-cyber-red py-8 px-4 sm:px-6 lg:px-8 bg-cyber-black z-10 md:ml-64">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-cyber-gray font-mono text-sm md:text-base opacity-100">
            © {new Date().getFullYear()} Saad El Filali. {t('rights')}
          </p>
          <p className="text-cyber-red font-mono text-xs md:text-sm mt-2 opacity-100">
            Built with Next.js + TailwindCSS + Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}

