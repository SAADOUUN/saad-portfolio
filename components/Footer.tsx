'use client';

import { useTranslations } from 'next-intl';
import { useShutdown } from '@/components/ShutdownContext';
import { Power } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');
  const { triggerShutdown } = useShutdown();

  return (
    <footer className="relative border-t border-cyber-red py-8 px-4 sm:px-6 lg:px-8 bg-cyber-black z-10 md:ml-64">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-2 justify-center">
            <p className="text-cyber-gray font-mono text-sm md:text-base opacity-100">
              © {new Date().getFullYear()} Saad El Filali. {t('rights')}
            </p>
            <button
              onClick={triggerShutdown}
              className="text-red-900/20 hover:text-red-600 transition-all duration-500 animate-[pulse_3s_ease-in-out_infinite] hover:animate-none hover:opacity-100"
              aria-label="System Shutdown"
            >
              <Power size={12} />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}
