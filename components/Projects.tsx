'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ExternalLink, FileText, Wrench, Target } from 'lucide-react';

export default function Projects() {
  const t = useTranslations('projects');

  const operations = [
    { key: 'cml', code: 'HONEYPOT-SHIELD' },
    { key: 'caldera', code: 'CALDERA-STRIKE' },
    { key: 'metasploit', code: 'METASPLOIT-RED' },
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <span className="text-xs font-mono text-cyber-red border border-cyber-red px-3 py-1">
              {t('classified')}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-cyber-red font-mono mt-4">
            {t('title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {operations.map((operation, index) => (
            <motion.div
              key={operation.key}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ 
                scale: 1.02,
              }}
              className="relative cyber-border bg-cyber-black-dark/80 backdrop-blur-sm overflow-hidden group"
            >
              {/* Classified Header */}
              <div className="border-b border-cyber-red bg-cyber-red-alpha/10 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyber-red rounded-full animate-pulse" />
                    <span className="text-xs font-mono text-cyber-red uppercase tracking-wider">
                      {t('operation')} {operation.code}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-cyber-gray/50">
                    {t('classified')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-cyber-red font-mono">
                  {t(`${operation.key}.operationName`)}
                </h3>
              </div>

              {/* Mission Report Content */}
              <div className="p-6 space-y-6">
                {/* Mission Briefing */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-4 h-4 text-cyber-red" />
                    <h4 className="text-sm font-mono text-cyber-red uppercase tracking-wider">
                      {t('missionBriefing')}
                    </h4>
                  </div>
                  <p className="text-sm font-mono text-cyber-gray leading-relaxed">
                    {t(`${operation.key}.missionBriefing`)}
                  </p>
                </div>

                {/* Tools / Exploits */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Wrench className="w-4 h-4 text-cyber-red" />
                    <h4 className="text-sm font-mono text-cyber-red uppercase tracking-wider">
                      {t('toolsExploits')}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {t(`${operation.key}.toolsExploits`).split(', ').map((tool, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-mono text-cyber-gray border border-cyber-red/30 px-2 py-1 bg-cyber-black"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Result / Impact */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-4 h-4 text-cyber-red" />
                    <h4 className="text-sm font-mono text-cyber-red uppercase tracking-wider">
                      {t('resultImpact')}
                    </h4>
                  </div>
                  <p className="text-sm font-mono text-cyber-gray leading-relaxed">
                    {t(`${operation.key}.resultImpact`)}
                  </p>
                </div>

                {/* Action Button */}
                <div className="pt-4 border-t border-cyber-red/30">
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 text-cyber-red hover:text-cyber-red-light transition-colors font-mono text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Full Report</span>
                  </motion.a>
                </div>
              </div>

              {/* Scanning line effect */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-red-alpha/5 to-transparent"
                  animate={{
                    y: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="cyber-border p-8 bg-cyber-black-dark/70 backdrop-blur-sm max-w-2xl mx-auto">
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <div className="w-2 h-2 bg-cyber-red rounded-full" />
              <div className="w-2 h-2 bg-cyber-red rounded-full" />
              <div className="w-2 h-2 bg-cyber-red rounded-full" />
            </motion.div>
            <p className="text-xl font-mono text-cyber-red">
              {t('comingSoon')}
            </p>
            <div className="mt-4 font-mono text-cyber-gray/70 text-sm">
              <span className="terminal-cursor">_</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
