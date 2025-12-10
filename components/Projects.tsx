'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, FileText, Wrench, Target, Terminal, Play, X, Shield, Cpu, Lock } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function Projects() {
  const t = useTranslations('projects');

  const [activeSimulation, setActiveSimulation] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [simulationProgress, setSimulationProgress] = useState(0);

  const operations = [
    { key: 'cml', code: 'HONEYPOT-SHIELD' },
    { key: 'caldera', code: 'CALDERA-STRIKE' },
    { key: 'metasploit', code: 'METASPLOIT-RED' },
  ];

  useEffect(() => {
    if (!activeSimulation) {
      setLogs([]);
      setSimulationProgress(0);
      return;
    }

    const currentOp = operations.find(op => op.key === activeSimulation);
    const code = currentOp?.code || 'UNKNOWN';

    // specific scenarios for each project
    const scenarios: Record<string, { msg: string; delay: number }[]> = {
      cml: [
        { msg: `INITIALIZING CML TOPOLOGY...`, delay: 500 },
        { msg: `> Booting IOSv node (Router-Core-01)...`, delay: 1200 },
        { msg: `> Configuring GigabitEthernet1: ip address 192.168.10.1 255.255.255.0`, delay: 2000 },
        { msg: `> Starting Cowrie Honeypot container [Docker]...`, delay: 2800 },
        { msg: `> Monitoring port 22 (SSH) and 23 (Telnet)...`, delay: 3500 },
        { msg: `ALERT: INCOMING CONNECTION from 78.140.x.x`, delay: 4200 },
        { msg: `> Recording attacker keystrokes: "wget http://malware..."`, delay: 5000 },
        { msg: `> Payload isolated. Forensics snapshot saved.`, delay: 6000 },
      ],
      caldera: [
        { msg: `STARTING CALDERA SERVER (v4.0)...`, delay: 500 },
        { msg: `> Loading Adversary Profile: "Hunter"`, delay: 1200 },
        { msg: `> Generating Sandcat Agent (PowerShell command)...`, delay: 2000 },
        { msg: `> Beacon received: Host WORKSTATION-01 [PID: 4522]`, delay: 2800 },
        { msg: `> Executing T1082 (System Information Discovery)...`, delay: 3500 },
        { msg: `> Executing T1003 (Credential Dumping - LSASS)...`, delay: 4200 },
        { msg: `> Lateral movement to FILE-SERVER via SMB...`, delay: 5000 },
        { msg: `OPERATION COMPLETE. Generating TTP Report.`, delay: 6000 },
      ],
      metasploit: [
        { msg: `STARTING METASPLOIT FRAMEWORK...`, delay: 500 },
        { msg: `msf6 > db_nmap -sV -A 10.10.10.15`, delay: 1200 },
        { msg: `> Port 445/tcp OPEN (Windows 7 Ultimate SP1)`, delay: 2000 },
        { msg: `msf6 > use exploit/windows/smb/ms17_010_eternalblue`, delay: 2800 },
        { msg: `msf6 exploit(eternalblue) > set LHOST 10.10.14.3`, delay: 3500 },
        { msg: `> Sending stage (179779 bytes) to 10.10.10.15`, delay: 4200 },
        { msg: `> Meterpreter session 1 opened (10.10.14.3:4444 -> 10.10.10.15:49158)`, delay: 5000 },
        { msg: `meterpreter > hashdump // Admin hash retrieved.`, delay: 6000 },
      ]
    };

    const steps = scenarios[activeSimulation] || [
      { msg: `INITIALIZING ${code} PROTOCOL...`, delay: 500 },
      { msg: `> Establishing secure connection...`, delay: 1500 },
      { msg: `> Access granted.`, delay: 3000 },
    ];

    let timeouts: NodeJS.Timeout[] = [];

    steps.forEach((step) => {
      const timeout = setTimeout(() => {
        setLogs(prev => [...prev, step.msg]);
        setSimulationProgress(prev => Math.min(prev + (100 / steps.length), 100));
      }, step.delay);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [activeSimulation]);

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
                  <motion.button
                    onClick={() => setActiveSimulation(operation.key)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 text-cyber-red hover:text-cyber-red-light transition-colors font-mono text-sm group-hover:shadow-[0_0_10px_rgba(255,0,60,0.3)] px-4 py-2 border border-cyber-red/50 rounded bg-cyber-black/50"
                  >
                    <Terminal className="w-4 h-4" />
                    <span>{t('runSimulation')}</span>
                    <Play className="w-3 h-3 ml-1 fill-current opacity-70" />
                  </motion.button>
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

        {/* Simulation Modal */}
        <AnimatePresence>
          {activeSimulation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
              onClick={() => setActiveSimulation(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-2xl bg-cyber-black border border-cyber-red shadow-[0_0_50px_rgba(255,0,60,0.2)] overflow-hidden"
                onClick={e => e.stopPropagation()}
              >
                {/* Terminal Header */}
                <div className="flex items-center justify-between px-4 py-2 bg-cyber-red/10 border-b border-cyber-red/30">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-cyber-red" />
                    <span className="text-sm font-mono text-cyber-red font-bold">
                      TERMINAL_ACCESS // {operations.find(op => op.key === activeSimulation)?.code}
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveSimulation(null)}
                    className="text-cyber-red hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Terminal Content */}
                <div className="p-6 font-mono text-sm h-[400px] overflow-y-auto bg-black/90 text-green-500 selection:bg-cyber-red selection:text-white relative">
                  <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(0, 255, 60, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 60, 0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                  <div className="relative z-10 space-y-2">
                    {logs.map((log, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex mb-1"
                      >
                        <span className="mr-2 opacity-50">[{new Date().toLocaleTimeString()}]</span>
                        <span>{log}</span>
                      </motion.div>
                    ))}
                    {logs.length === 8 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-6 pt-4 border-t border-green-500/30 text-center"
                      >
                        <div className="inline-block p-2 border border-green-500 text-green-500 font-bold tracking-widest animate-pulse">
                          ACCESS GRANTED
                        </div>
                      </motion.div>
                    )}
                    <div ref={(el) => el?.scrollIntoView({ behavior: 'smooth' })} />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
