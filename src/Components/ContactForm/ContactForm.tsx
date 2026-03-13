"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassSurface from '../GlassSurface/GlassSurface';
import './ContactForm.css';

interface ContactFormProps {
  mode?: 'minimal' | 'detailed';
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ mode = 'minimal', className = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', company: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className={`contact-form-container ${className}`}>
      <GlassSurface
        width="100%"
        height={"auto" as any}
        borderRadius={24}
        borderWidth={0.1}
        brightness={40}
        opacity={0.8}
        blur={15}
        backgroundOpacity={0.1}
        className="p-8 md:p-12"
      >
        <motion.form
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="w-full space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants} className="space-y-2">
              <label htmlFor="name" className="text-[#E8F1FF]/70 text-sm font-medium ml-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="contact-input"
              />
            </motion.div>
            
            <motion.div variants={itemVariants} className="space-y-2">
              <label htmlFor="email" className="text-[#E8F1FF]/70 text-sm font-medium ml-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="contact-input"
              />
            </motion.div>
          </div>

          {mode === 'detailed' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants} className="space-y-2">
                <label htmlFor="company" className="text-[#E8F1FF]/70 text-sm font-medium ml-1">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Acme Corp"
                  className="contact-input"
                />
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-2">
                <label htmlFor="subject" className="text-[#E8F1FF]/70 text-sm font-medium ml-1">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Inquiry"
                  className="contact-input"
                />
              </motion.div>
            </div>
          )}

          <motion.div variants={itemVariants} className="space-y-2">
            <label htmlFor="message" className="text-[#E8F1FF]/70 text-sm font-medium ml-1">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="How can we help you?"
              className="contact-input resize-none"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="pt-4">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className={`submit-button ${status === 'success' ? 'success' : ''}`}
            >
              <span className="relative z-10 transition-colors duration-300">
                {status === 'idle' && 'Send Message'}
                {status === 'submitting' && 'Sending...'}
                {status === 'success' && 'Message Sent!'}
                {status === 'error' && 'Try Again'}
              </span>
              <div className="button-glow" />
            </button>
          </motion.div>
        </motion.form>
      </GlassSurface>
    </div>
  );
};

export default ContactForm;
