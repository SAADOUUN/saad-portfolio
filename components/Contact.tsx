'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Send, Linkedin, Instagram, Mail, Github } from 'lucide-react';

export default function Contact() {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const socialLinks = [
    { icon: Linkedin, href: 'https://ma.linkedin.com/in/saad-el-filali-9168a5333', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/dr.saad_48/', label: 'Instagram' },
    { icon: Mail, href: 'mailto:saaad.elfilali@gmail.com', label: 'Email' },
    { icon: Github, href: 'https://github.com/SAADOUUN', label: 'GitHub' },
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 neon-red"
        >
          {t('title')}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="cyber-border p-8 bg-cyber-black-dark/50 backdrop-blur-sm"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-cyber-red font-mono text-sm mb-2">
                  {t('name')}
                </label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={status === 'loading'}
                  whileFocus={{ scale: 1.01 }}
                  className="w-full px-4 py-3 bg-cyber-black-dark border border-cyber-red text-cyber-gray font-mono focus:outline-none focus:border-cyber-red-light transition-all disabled:opacity-50"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-cyber-red font-mono text-sm mb-2">
                  {t('email')}
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={status === 'loading'}
                  whileFocus={{ scale: 1.01 }}
                  className="w-full px-4 py-3 bg-cyber-black-dark border border-cyber-red text-cyber-gray font-mono focus:outline-none focus:border-cyber-red-light transition-all disabled:opacity-50"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-cyber-red font-mono text-sm mb-2">
                  {t('message')}
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  disabled={status === 'loading'}
                  whileFocus={{ scale: 1.01 }}
                  className="w-full px-4 py-3 bg-cyber-black-dark border border-cyber-red text-cyber-gray font-mono focus:outline-none focus:border-cyber-red-light transition-all resize-none disabled:opacity-50"
                  placeholder="Your message..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-cyber-red text-black font-bold rounded-md hover:bg-cyber-red-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                <span>{status === 'loading' ? 'Sending...' : t('send')}</span>
              </motion.button>

              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-green-500 font-mono text-center"
                >
                  Message sent successfully!
                </motion.p>
              )}

              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 font-mono text-center"
                >
                  Failed to send message. Please try again.
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold text-cyber-red mb-8 font-mono text-center md:text-left">
              Connect With Me
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{
                      scale: 1.05,
                    }}
                    className="cyber-border p-6 bg-cyber-black-dark/50 backdrop-blur-sm flex flex-col items-center justify-center gap-3 group"
                  >
                    <Icon className="w-8 h-8 text-cyber-red group-hover:text-cyber-red-light transition-colors" />
                    <span className="text-sm font-mono text-cyber-gray group-hover:text-cyber-red transition-colors">
                      {social.label}
                    </span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

