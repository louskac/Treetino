"use client";

import LiquidEther from '@/Backgrounds/LiquidEther/LiquidEther';
import StaggeredMenu from '@/Components/StaggeredMenu/StaggeredMenu';
import GlassSurface from '@/Components/GlassSurface/GlassSurface';
import PerformanceMonitor from '@/Components/PerformanceMonitor';
import Timeline from '@/Components/Timeline/Timeline';
import { treetinoTimeline } from '@/Components/Timeline/timelineData';

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

export default function TreePage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <PerformanceMonitor />
      {/* Liquid Ether Background */}
      <div className="absolute inset-0 z-0">
        <LiquidEther
          colors={['#2762AD', '#2762AD', '#2762AD']}
          mouseForce={20}
          cursorSize={150}
          isViscous={false}
          viscous={30}
          iterationsViscous={16}
          iterationsPoisson={16}
          resolution={0.25}
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
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="max-w-6xl w-full text-center space-y-8">
          
          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl font-bold text-[#E8F1FF] leading-tight tracking-tight">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2762AD] via-[#183D89] to-[#2762AD]">Treetino</span>
            <br />
            Technology
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-[#E8F1FF]/60 max-w-2xl mx-auto font-light">
            Discover how our innovative tree-inspired energy systems are revolutionizing renewable power generation
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 pointer-events-auto">
            <a
              href="/technical-specs.pdf"
              className="px-8 py-4 bg-[#2762AD] hover:bg-[#183D89] text-[#E8F1FF] font-semibold rounded-full transition-all duration-300 hover:scale-105 min-w-[180px]"
            >
              Technical Specs
            </a>
          </div>

          {/* Content Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pointer-events-auto">
            <GlassSurface className="p-8 border border-[#2762AD]/30 rounded-2xl">
              <h3 className="text-2xl font-bold text-[#E8F1FF] mb-4">Solar Efficiency</h3>
              <p className="text-[#E8F1FF]/70">
                Advanced solar panel leaf design maximizes energy capture throughout the day
              </p>
            </GlassSurface>

            <GlassSurface className="p-8 border border-[#2762AD]/30 rounded-2xl">
              <h3 className="text-2xl font-bold text-[#E8F1FF] mb-4">Wind Integration</h3>
              <p className="text-[#E8F1FF]/70">
                Transparent wind turbines seamlessly blend with the aesthetic design
              </p>
            </GlassSurface>

            <GlassSurface className="p-8 border border-[#2762AD]/30 rounded-2xl">
              <h3 className="text-2xl font-bold text-[#E8F1FF] mb-4">Smart Grid</h3>
              <p className="text-[#E8F1FF]/70">
                AI-powered energy distribution optimizes power delivery in real-time
              </p>
            </GlassSurface>
          </div>
        </div>
      </div>
    </main>
  );
}