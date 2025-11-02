"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import StaggeredMenu from '@/Components/StaggeredMenu/StaggeredMenu';
import GlassSurface from '@/Components/GlassSurface/GlassSurface';

// Dynamic import for LiquidEther with SSR disabled
const LiquidEther = dynamic(
  () => import('@/Backgrounds/LiquidEther/LiquidEther'),
  { ssr: false }
);

type MenuItem = {
  label: string;
  ariaLabel: string;
  link: string;
};

const menuItems: MenuItem[] = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/home' },
  { label: 'Tree', ariaLabel: 'Learn about Treetino', link: '/tree' },
  { label: 'Web3', ariaLabel: 'Explore our Web3 protocol', link: '/web3' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
];

const socialItems: MenuItem[] = [
  { label: 'Twitter', ariaLabel: 'Visit our Twitter', link: 'https://twitter.com/treetino' },
  { label: 'Telegram', ariaLabel: 'Join our Telegram', link: 'https://t.me/treetino' },
  { label: 'LinkedIn', ariaLabel: 'Visit our LinkedIn', link: 'https://linkedin.com/company/treetino' }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Liquid Ether Background */}
      <div className="absolute inset-0 z-0">
        <LiquidEther
          colors={['#2762AD', '#2762AD', '#2762AD']}
          mouseForce={20}
          cursorSize={300}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      {/* Menu */}
      <div className="fixed inset-0 z-50 pointer-events-none" style={{ height: '100vh', background: 'transparent' }}>
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#E8F1FF"
          openMenuButtonColor="#212955"
          changeMenuColorOnOpen={true}
          colors={['#2762AD', '#183D89']}
          accentColor="#2762AD"
          onMenuOpen={() => console.log('Menu opened')}
          onMenuClose={() => console.log('Menu closed')}
        />
      </div>

      {/* Content Section */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-20">
        <div className="max-w-4xl w-full space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold text-[#E8F1FF] leading-tight tracking-tight">
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2762AD] via-[#183D89] to-[#2762AD]">Touch</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-[#E8F1FF]/60 max-w-2xl mx-auto font-light">
              Have questions about Treetino? We'd love to hear from you.
            </p>
          </div>

          {/* Contact Form */}
          <div className="pointer-events-auto">
            <GlassSurface className="p-8 md:p-12 border border-[#2762AD]/30 rounded-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-[#E8F1FF] font-semibold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#E8F1FF]/10 border border-[#2762AD]/30 rounded-lg text-[#E8F1FF] placeholder-[#E8F1FF]/40 focus:outline-none focus:border-[#2762AD] transition-colors"
                    placeholder="Your name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-[#E8F1FF] font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#E8F1FF]/10 border border-[#2762AD]/30 rounded-lg text-[#E8F1FF] placeholder-[#E8F1FF]/40 focus:outline-none focus:border-[#2762AD] transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-[#E8F1FF] font-semibold mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-[#E8F1FF]/10 border border-[#2762AD]/30 rounded-lg text-[#E8F1FF] placeholder-[#E8F1FF]/40 focus:outline-none focus:border-[#2762AD] transition-colors resize-none"
                    placeholder="Tell us about your inquiry..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-[#2762AD] hover:bg-[#183D89] text-[#E8F1FF] font-semibold rounded-full transition-all duration-300 hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </GlassSurface>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pointer-events-auto">
            <GlassSurface className="p-6 border border-[#2762AD]/30 rounded-2xl text-center">
              <h3 className="text-lg font-bold text-[#E8F1FF] mb-2">Email</h3>
              <a href="mailto:info@treetino.com" className="text-[#E8F1FF]/70 hover:text-[#2762AD] transition-colors">
                info@treetino.com
              </a>
            </GlassSurface>

            <GlassSurface className="p-6 border border-[#2762AD]/30 rounded-2xl text-center">
              <h3 className="text-lg font-bold text-[#E8F1FF] mb-2">Phone</h3>
              <a href="tel:+420123456789" className="text-[#E8F1FF]/70 hover:text-[#2762AD] transition-colors">
                +420 123 456 789
              </a>
            </GlassSurface>

            <GlassSurface className="p-6 border border-[#2762AD]/30 rounded-2xl text-center">
              <h3 className="text-lg font-bold text-[#E8F1FF] mb-2">Location</h3>
              <p className="text-[#E8F1FF]/70">
                Prague, Czech Republic
              </p>
            </GlassSurface>
          </div>
        </div>
      </div>
    </main>
  );
}