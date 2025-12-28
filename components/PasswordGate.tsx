'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Lock, AlertCircle } from 'lucide-react';

import { playCyberSound } from '@/utils/sounds';

const PASSWORDS = ['127.0.0.1', 'home', 'localhost'];
const HINT = 'there is no place like';

export default function PasswordGate({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    playCyberSound('startup');
    // Check if already authenticated
    const isAuthenticated = sessionStorage.getItem('cyber_auth');
    if (isAuthenticated === 'true') {
      onSuccess();
      return;
    }

    // Focus input on mount
    setTimeout(() => {
      inputRef.current?.focus();
    }, 500);
  }, [onSuccess]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (PASSWORDS.includes(password.trim().toLowerCase())) {
      sessionStorage.setItem('cyber_auth', 'true');
      setError(false);
      playCyberSound('access-granted');
      onSuccess();
    } else {
      setError(true);
      playCyberSound('access-denied');
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts > 3) {
        setShowWarning(true);
      }

      setPassword('');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-cyber-black flex items-center justify-center overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-cyber-red-alpha/10 via-transparent to-cyber-black" />

        {/* Scanline Effect */}
        <div className="absolute inset-0 scanline opacity-30" />

        {/* Main Content */}
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative z-10 w-full max-w-2xl mx-4"
        >
          {/* Terminal Window */}
          <div className="cyber-border p-8 bg-cyber-black-dark/90 backdrop-blur-sm">
            {/* Terminal Header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-cyber-red">
              <Terminal className="w-6 h-6 text-cyber-red" />
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-cyber-red font-mono">
                  CYBER ACCESS PROTOCOL
                </h1>
                <p className="text-xs text-cyber-gray font-mono mt-1">
                  Secure Terminal v2.0.1
                </p>
              </div>
              <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="flex gap-1"
              >
                <div className="w-2 h-2 bg-cyber-red rounded-full" />
                <div className="w-2 h-2 bg-cyber-red rounded-full" />
                <div className="w-2 h-2 bg-cyber-red rounded-full" />
              </motion.div>
            </div>

            {/* Terminal Content */}
            <div className="space-y-6">
              {/* Welcome Message */}
              <div className="font-mono text-sm">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-cyber-gray mb-2"
                >
                  <span className="text-cyber-red">root@cyberspace:~$</span> Initializing access protocol...
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-cyber-gray mb-2"
                >
                  <span className="text-cyber-red">[INFO]</span> Authentication required to access secure systems.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="text-cyber-gray mb-4"
                >
                  <span className="text-cyber-red">[WARNING]</span> Unauthorized access will be logged and reported.
                </motion.p>
              </div>

              {/* Password Input */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <label className="block text-cyber-red font-mono text-sm mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Enter Access Code:
                  </label>
                  <div className="relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError(false);
                      }}
                      onKeyPress={handleKeyPress}
                      className={`w-full px-4 py-3 bg-cyber-black border-2 font-mono text-cyber-red focus:outline-none transition-all ${error
                        ? 'border-cyber-red animate-glitch'
                        : 'border-cyber-red focus:border-cyber-red-light'
                        }`}
                      placeholder=">_"
                      autoComplete="off"
                      autoFocus
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-cyber-red font-mono text-sm terminal-cursor">
                      |
                    </span>
                  </div>
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-cyber-red font-mono text-sm"
                    >
                      <AlertCircle className="w-4 h-4" />
                      <span>Access denied. Invalid credentials. Attempts: {attempts}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Hint and Skip Buttons */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setShowHint(!showHint)}
                      className="text-cyber-gray hover:text-cyber-red font-mono text-xs transition-colors flex items-center gap-2"
                    >
                      <span>Need a hint?</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        sessionStorage.setItem('cyber_auth', 'true');
                        playCyberSound('access-granted');
                        onSuccess();
                      }}
                      className="text-cyber-gray hover:text-cyber-red font-mono text-xs transition-colors underline"
                    >
                      Skip →
                    </button>
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-cyber-red text-black font-bold font-mono hover:bg-cyber-red-light transition-all"
                  >
                    AUTHENTICATE →
                  </motion.button>
                </div>
              </form>

              {/* Hint Display */}
              <AnimatePresence>
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="cyber-border p-4 bg-cyber-red-alpha/10"
                  >
                    <div className="flex items-start gap-2">
                      <Terminal className="w-4 h-4 text-cyber-red mt-0.5 flex-shrink-0" />
                      <div className="font-mono text-xs text-cyber-gray">
                        <p className="text-cyber-red mb-1">[HINT]</p>
                        <p className="italic">&quot;{HINT}&quot;</p>
                        <p className="text-cyber-gray/70 mt-2">
                          Think about where you are right now...
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Warning Dialog */}
              <AnimatePresence>
                {showWarning && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                  >
                    <div className="bg-cyber-black border-2 border-cyber-red p-6 max-w-sm w-full relative overflow-hidden">
                      <div className="absolute inset-0 cyber-grid opacity-10" />
                      <div className="relative z-10 text-center space-y-4">
                        <AlertCircle className="w-12 h-12 text-cyber-red mx-auto animate-pulse" />
                        <h3 className="text-xl font-bold text-cyber-red font-mono">SECURITY BREACH DETECTED</h3>
                        <p className="text-cyber-gray font-mono text-sm">
                          Multiple failed access attempts detected. System override initiated.
                        </p>
                        <div className="bg-cyber-red/10 p-3 border border-cyber-red/50">
                          <p className="text-xs text-cyber-red font-mono mb-1">RECOVERY KEY:</p>
                          <p className="text-lg font-bold text-white font-mono tracking-wider">127.0.0.1</p>
                        </div>
                        <button
                          onClick={() => setShowWarning(false)}
                          className="w-full py-2 bg-cyber-red text-black font-bold font-mono hover:bg-cyber-red-light transition-colors"
                        >
                          ACKNOWLEDGE
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Terminal Footer */}
              <div className="pt-4 border-t border-cyber-red/50">
                <p className="text-xs text-cyber-gray/50 font-mono text-center">
                  [SYSTEM] All access attempts are monitored and logged
                </p>
              </div>
            </div>
          </div>

          {/* Glitch Effect on Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              className="absolute inset-0 bg-cyber-red pointer-events-none"
              style={{ mixBlendMode: 'screen' }}
            />
          )}
        </motion.div>

        {/* Matrix-like falling code effect (optional decorative element) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -100, opacity: 0 }}
              animate={{
                y: '100vh',
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'linear',
              }}
              className="absolute text-cyber-red/20 font-mono text-xs"
              style={{
                left: `${Math.random() * 100}%`,
                fontFamily: 'monospace',
              }}
            >
              {Math.random().toString(36).substring(7)}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
