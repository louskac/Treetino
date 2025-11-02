"use client";

import dynamic from 'next/dynamic';

const LiquidEther = dynamic(
  () => import('@/Backgrounds/LiquidEther/LiquidEther'),
  { ssr: false }
);

import StaggeredMenu from '@/Components/StaggeredMenu/StaggeredMenu';
import GlassSurface from '@/Components/GlassSurface/GlassSurface';

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

export default function Web3Page() {
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
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="max-w-6xl w-full text-center space-y-8">
          
          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl font-bold text-[#E8F1FF] leading-tight tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2762AD] via-[#183D89] to-[#2762AD]">Web3</span>
            <br />
            Protocol
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-[#E8F1FF]/60 max-w-2xl mx-auto font-light">
            Empowering decentralized energy trading through blockchain technology
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 pointer-events-auto">
            <a
              href="/tokenomics.pdf"
              className="px-8 py-4 bg-[#2762AD] hover:bg-[#183D89] text-[#E8F1FF] font-semibold rounded-full transition-all duration-300 hover:scale-105 min-w-[180px]"
            >
              Tokenomics
            </a>
            
            <a
              href="https://github.com/treetino"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group overflow-hidden rounded-full min-w-[180px]"
            >
              <GlassSurface 
                className="px-8 py-4 flex items-center justify-center border border-[#2762AD]/50 group-hover:border-[#2762AD] transition-all w-full"
              >
                <span className="text-[#E8F1FF] font-semibold group-hover:text-white transition-colors">
                  View on GitHub
                </span>
              </GlassSurface>
            </a>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 pointer-events-auto">
            <GlassSurface className="p-8 border border-[#2762AD]/30 rounded-2xl">
              <h3 className="text-2xl font-bold text-[#E8F1FF] mb-4">Energy NFTs</h3>
              <p className="text-[#E8F1FF]/70">
                Tokenize and trade renewable energy units as verifiable digital assets
              </p>
            </GlassSurface>

            <GlassSurface className="p-8 border border-[#2762AD]/30 rounded-2xl">
              <h3 className="text-2xl font-bold text-[#E8F1FF] mb-4">Smart Contracts</h3>
              <p className="text-[#E8F1FF]/70">
                Automated energy distribution agreements executed on-chain
              </p>
            </GlassSurface>

            <GlassSurface className="p-8 border border-[#2762AD]/30 rounded-2xl">
              <h3 className="text-2xl font-bold text-[#E8F1FF] mb-4">Carbon Credits</h3>
              <p className="text-[#E8F1FF]/70">
                Transparent tracking and trading of carbon offset certificates
              </p>
            </GlassSurface>

            <GlassSurface className="p-8 border border-[#2762AD]/30 rounded-2xl">
              <h3 className="text-2xl font-bold text-[#E8F1FF] mb-4">Community Governance</h3>
              <p className="text-[#E8F1FF]/70">
                Decentralized decision-making for network improvements
              </p>
            </GlassSurface>
          </div>
        </div>
      </div>
    </main>
  );
}