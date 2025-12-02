'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  Network, Server, Box, Code, Database,
  Shield, Lock, AlertTriangle, HardDrive, FileSearch, Zap,
  TrendingUp, Eye, Users,
  MessageSquare, Users2, Puzzle, Clock, RefreshCw,
  FileText
} from 'lucide-react';

interface SkillCardProps {
  icon: React.ComponentType<any>;
  title: string;
  index: number;
}

function SkillCard({ icon: Icon, title, index }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="group relative"
    >
      <div className="relative p-4 bg-[#0A0A0A] border border-cyber-red hacker-card">
        {/* Red Neon Glow Effect */}
        <div className="absolute inset-0 border border-cyber-red opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ boxShadow: '0 0 10px rgba(255, 0, 0, 0.5), inset 0 0 10px rgba(255, 0, 0, 0.1)' }} />

        <div className="relative z-10 flex items-center gap-3">
          <div className="flex-shrink-0 flex items-center justify-center w-12 h-12">
            <Icon className="w-8 h-8 text-cyber-red group-hover:text-cyber-red-light transition-colors"
              style={{ filter: 'drop-shadow(0 0 4px rgba(255, 0, 0, 0.9))' }} />
          </div>
          <h4 className="font-mono text-sm text-cyber-gray group-hover:text-cyber-red transition-colors flex-1 leading-tight">
            {title}
          </h4>
        </div>
      </div>
    </motion.div>
  );
}

interface SkillCategoryProps {
  title: string;
  skills: Array<{ icon: React.ComponentType<any>; key: string }>;
  translationKey: string;
  startIndex: number;
  operationCode: string;
}

function SkillCategory({ title, skills, translationKey, startIndex, operationCode }: SkillCategoryProps) {
  const t = useTranslations('skills');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-12"
    >
      {/* Classified Report Header */}
      <div className="cyber-border bg-cyber-black-dark/80 backdrop-blur-sm mb-6 overflow-hidden">
        <div className="border-b border-cyber-red bg-cyber-red-alpha/10 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyber-red rounded-full animate-pulse" />
              <span className="text-xs font-mono text-cyber-red uppercase tracking-wider">
                CLASSIFIED REPORT
              </span>
            </div>
            <span className="text-xs font-mono text-cyber-gray/50">
              {t('classified')}
            </span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-cyber-red font-mono">
              {title}
            </h3>
            <p className="text-xs font-mono text-cyber-gray/70 mt-1">
              Operation Code: {operationCode}
            </p>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-4 h-4 text-cyber-red" />
            <h4 className="text-sm font-mono text-cyber-red uppercase tracking-wider">
              {t('capabilities')}
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <SkillCard
                  key={skill.key}
                  icon={Icon}
                  title={t(`${translationKey}.${skill.key}`)}
                  index={startIndex + index}
                />
              );
            })}
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
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const t = useTranslations('skills');

  const infrastructureSkills = [
    { icon: Network, key: 'network' },
    { icon: Server, key: 'admin' },
    { icon: Box, key: 'virtualization' },
    { icon: Code, key: 'automation' },
    { icon: Database, key: 'systems' },
  ];

  const cybersecuritySkills = [
    { icon: Shield, key: 'fundamentals' },
    { icon: Lock, key: 'pentesting' },
    { icon: AlertTriangle, key: 'incident' },
    { icon: HardDrive, key: 'hardening' },
    { icon: Zap, key: 'security' },
    { icon: FileSearch, key: 'forensics' },
  ];

  const managementSkills = [
    { icon: TrendingUp, key: 'risks' },
    { icon: Eye, key: 'watch' },
    { icon: Users, key: 'culture' },
  ];

  const softSkills = [
    { icon: MessageSquare, key: 'communication' },
    { icon: Users2, key: 'teamwork' },
    { icon: Puzzle, key: 'problemSolving' },
    { icon: Clock, key: 'timeManagement' },
    { icon: RefreshCw, key: 'adaptability' },
  ];

  const infrastructureStart = 0;
  const cybersecurityStart = infrastructureStart + infrastructureSkills.length;
  const managementStart = cybersecurityStart + cybersecuritySkills.length;
  const softSkillsStart = managementStart + managementSkills.length;

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

        {/* Infrastructure & Systems */}
        <SkillCategory
          title={t('infrastructure.title')}
          skills={infrastructureSkills}
          translationKey="infrastructure"
          startIndex={infrastructureStart}
          operationCode="INFRA-SHIELD"
        />

        {/* Cybersecurity */}
        <SkillCategory
          title={t('cybersecurity.title')}
          skills={cybersecuritySkills}
          translationKey="cybersecurity"
          startIndex={cybersecurityStart}
          operationCode="CYBER-DEFENSE"
        />

        {/* Management & Methodology */}
        <SkillCategory
          title={t('management.title')}
          skills={managementSkills}
          translationKey="management"
          startIndex={managementStart}
          operationCode="MGMT-STRATEGY"
        />

        {/* Soft Skills */}
        <SkillCategory
          title={t('softSkills.title')}
          skills={softSkills}
          translationKey="softSkills"
          startIndex={softSkillsStart}
          operationCode="SOFT-OPS"
        />
      </div>
    </section>
  );
}
