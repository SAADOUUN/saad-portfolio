'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';

export default function Certifications() {
  const t = useTranslations('certifications');

  const certifications = [
    {
      key: 'python',
      color: 'from-yellow-500/20 to-cyber-red/20',
      credlyUrl: 'https://www.credly.com/badges/77f3ca2b-9373-4d58-ba37-3e668ad6e063/public_url',
    },
    {
      key: 'cybersecurity',
      color: 'from-blue-500/20 to-cyber-red/20',
      credlyUrl: 'https://www.credly.com/badges/806a28d7-b71f-4b96-881c-ea29afb596bc/public_url',
    },
    {
      key: 'hardware',
      color: 'from-green-500/20 to-cyber-red/20',
      credlyUrl: 'https://www.credly.com/badges/190fa8bd-96bc-46b3-bce2-86ff199c3a1c/public_url',
    },
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 neon-red"
        >
          {t('title')}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.key}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ 
                scale: 1.02,
              }}
              className={`relative cyber-border p-6 bg-gradient-to-br ${cert.color} backdrop-blur-sm`}
            >
              <div className="flex items-start justify-between mb-4">
                <Award className="w-8 h-8 text-cyber-red" />
                <motion.a
                  href={cert.credlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-cyber-red hover:text-cyber-red-light transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-xs font-mono">{t('viewCredly')}</span>
                </motion.a>
              </div>

              <h3 className="text-xl font-bold text-cyber-gray mb-2 font-mono">
                {t(`${cert.key}.title`)}
              </h3>
              <p className="text-cyber-red text-sm font-mono mb-2">
                {t(`${cert.key}.issuer`)}
              </p>
              <p className="text-cyber-gray/70 text-xs font-mono">
                {t(`${cert.key}.date`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

