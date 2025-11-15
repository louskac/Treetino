"use client";

import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import StaggeredMenu from '@/Components/StaggeredMenu/StaggeredMenu';
import RotatingText from '@/Components/RotatingText/RotatingText';
import GlassSurface from '@/Components/GlassSurface/GlassSurface';

const ColorBends = dynamic(
  () => import('@/Backgrounds/ColorBends/ColorBends'),
  { ssr: false }
);

const Scene = dynamic(() => import('@/Components/three/Scene'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-transparent" />
});

interface ScrollSection {
  id: string;
  title: string;
  content: string;
  cameraPosition: [number, number, number];
  stat: string;
  statLabel: string;
  lightBoost?: number;
}

const scrollSections: ScrollSection[] = [
  {
    id: 'foundation',
    title: 'Smart Foundation',
    content: 'Intelligent foundation systems house AI optimization cores and grid connection infrastructure.',
    cameraPosition: [77.61, -49.60, -76.92],
    stat: '30%',
    statLabel: 'cheaper energy',
    lightBoost: 1.0
  },
  {
    id: 'solar',
    title: 'Solar Canopy',
    content: 'Biomimetic solar leaves with AI-driven sun tracking maximize energy output throughout the day.',
    cameraPosition: [80, 40, 80],
    stat: '12.9kW',
    statLabel: 'peak solar',
    lightBoost: 1.0
  },
  {
    id: 'wind',
    title: 'Wind Capture',
    content: 'Vertical axis micro turbines efficiently harvest urban wind patterns day and night.',
    cameraPosition: [-53.82, 203.87, -147.30],
    stat: '12',
    statLabel: 'turbines',
    lightBoost: 2.2
  }
];

type MenuItem = {
  label: string;
  ariaLabel: string;
  link: string;
};

const menuItems: MenuItem[] = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
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
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrollMode, setIsScrollMode] = useState(false);
  const [shouldRender3D, setShouldRender3D] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [targetCameraPosition, setTargetCameraPosition] = useState<[number, number, number] | null>(null);
  const [lightBoost, setLightBoost] = useState(1.0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    setMounted(true);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const heroThreshold = windowHeight;
      const heroEndThreshold = windowHeight * (1.0 + scrollSections.length * 0.8);
      
      const wasScrollMode = isScrollMode;
      const newIsScrollMode = scrollTop > heroThreshold && scrollTop < heroEndThreshold;
      const newShouldRender3D = scrollTop >= heroThreshold * 0.5 && scrollTop < heroEndThreshold + windowHeight;
      const newShowModel = scrollTop >= heroThreshold && scrollTop < heroEndThreshold;
      
      setIsScrollMode(newIsScrollMode);
      setShowModel(newShowModel);
      
      if (newShouldRender3D !== shouldRender3D) {
        setShouldRender3D(newShouldRender3D);
      }

      if (newIsScrollMode) {
        const adjustedScroll = scrollTop - heroThreshold;
        const sectionHeight = windowHeight * 0.8;
        
        const rawSectionIndex = adjustedScroll / sectionHeight;
        const sectionIndex = Math.max(0, Math.min(Math.floor(rawSectionIndex), scrollSections.length - 1));
        
        if (!wasScrollMode && newIsScrollMode) {
          setCurrentSection(0);
          setTargetCameraPosition(scrollSections[0].cameraPosition);
          setLightBoost(scrollSections[0].lightBoost || 1.0);
        } else if (sectionIndex !== currentSection) {
          setCurrentSection(sectionIndex);
          setTargetCameraPosition(scrollSections[sectionIndex].cameraPosition);
          setLightBoost(scrollSections[sectionIndex].lightBoost || 1.0);
        }
      }
    };

    if (mounted) {
      window.addEventListener('scroll', handleScroll);
      handleScroll();
    }
    
    return () => {
      if (mounted) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [currentSection, isScrollMode, shouldRender3D, mounted]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ height: `${100 + scrollSections.length * 80 + 50}vh` }}
    >
      <div className="fixed inset-0 z-0">
        <ColorBends
          colors={['#2762AD', '#183D89', '#2A293A']}
          rotation={1}
          speed={0.5}
          scale={0.5}
          frequency={2}
          warpStrength={1}
          mouseInfluence={0.3}
          parallax={1}
          noise={0.08}
          transparent
        />
      </div>

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

      {shouldRender3D && (
        <div 
          className={`fixed inset-0 transition-opacity duration-700 ${
            showModel ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            pointerEvents: isScrollMode ? 'none' : 'auto',
            zIndex: 5
          }}
        >
          <Scene 
            targetPosition={targetCameraPosition} 
            isScrollMode={isScrollMode}
            shouldPause={!showModel}
            lightBoost={lightBoost}
          />
        </div>
      )}

      <section 
        className={`relative h-screen flex items-center transition-all duration-1000 ${
          isScrollMode ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={{ zIndex: 10 }}
      >
        <div className="relative w-full max-w-7xl mx-auto px-6 md:px-8" style={{ zIndex: 30 }}>
          <div className="text-center space-y-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#E8F1FF]"
            >
              The Future of<br />
              <span className="inline-flex items-center justify-center gap-2 mt-4">
                <RotatingText
                  texts={['Clean Energy', 'Solar Power', 'Wind Energy']}
                  mainClassName="px-2 py-1 sm:px-3 sm:py-2 bg-gradient-to-r from-[#2762AD] via-[#183D89] to-[#2762AD] text-white rounded-lg text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                />
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#E8F1FF]/60 max-w-2xl mx-auto font-light"
            >
              Tokenized energy infrastructure.<br />
              Real revenue. Real returns.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-4 pt-4 pointer-events-auto mx-auto"
            >
              <div className="relative overflow-hidden rounded-2xl group">
                <GlassSurface 
                  width="320px"
                  height={100}
                  borderRadius={16}
                  borderWidth={0.1}
                  brightness={50}
                  opacity={0.93}
                  blur={12}
                  displace={0.7}
                  backgroundOpacity={0.15}
                  saturation={1.2}
                  distortionScale={-180}
                  redOffset={0}
                  greenOffset={10}
                  blueOffset={20}
                  xChannel="R"
                  yChannel="G"
                  mixBlendMode="difference"
                  className="border border-[#2762AD]/30 group-hover:border-[#2762AD]/60 transition-all"
                >
                  <div className="flex items-start space-x-3 px-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#2762AD] to-[#183D89] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                      </svg>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-base font-semibold text-[#E8F1FF] mb-1">Czech Government</div>
                      <div className="text-xs text-[#E8F1FF]/60">Ministry of Industry and Trade grant</div>
                    </div>
                  </div>
                </GlassSurface>
              </div>

              <div className="relative overflow-hidden rounded-2xl group">
                <GlassSurface 
                  width="320px"
                  height={100}
                  borderRadius={16}
                  borderWidth={0.1}
                  brightness={50}
                  opacity={0.93}
                  blur={12}
                  displace={0.7}
                  backgroundOpacity={0.15}
                  saturation={1.2}
                  distortionScale={-180}
                  redOffset={0}
                  greenOffset={10}
                  blueOffset={20}
                  xChannel="R"
                  yChannel="G"
                  mixBlendMode="difference"
                  className="border border-[#2762AD]/30 group-hover:border-[#2762AD]/60 transition-all"
                >
                  <div className="flex items-start space-x-3 px-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#183D89] to-[#2A293A] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7L12 12L22 7L12 2M2 17L12 22L22 17V11L12 16L2 11V17Z"/>
                      </svg>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-base font-semibold text-[#E8F1FF] mb-1">Makeiton</div>
                      <div className="text-xs text-[#E8F1FF]/60">Top Czech HW accelerator program</div>
                    </div>
                  </div>
                </GlassSurface>
              </div>

              <div className="relative overflow-hidden rounded-2xl group">
                <GlassSurface 
                  width="320px"
                  height={100}
                  borderRadius={16}
                  borderWidth={0.1}
                  brightness={50}
                  opacity={0.93}
                  blur={12}
                  displace={0.7}
                  backgroundOpacity={0.15}
                  saturation={1.2}
                  distortionScale={-180}
                  redOffset={0}
                  greenOffset={10}
                  blueOffset={20}
                  xChannel="R"
                  yChannel="G"
                  mixBlendMode="difference"
                  className="border border-[#2762AD]/30 group-hover:border-[#2762AD]/60 transition-all"
                >
                  <div className="flex items-start space-x-3 px-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#2A293A] to-[#2762AD] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13 7H11V11H7V13H11V17H13V13H17V11H13V7M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"/>
                      </svg>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-base font-semibold text-[#E8F1FF] mb-1">ČSOB Seed Starter</div>
                      <div className="text-xs text-[#E8F1FF]/60">KBC Group acceleration</div>
                    </div>
                  </div>
                </GlassSurface>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex items-center justify-center space-x-3 text-[#E8F1FF]/30 pt-8"
            >
              <div className="w-6 h-10 border-2 border-[#E8F1FF]/20 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-[#E8F1FF]/30 rounded-full mt-2 animate-pulse" />
              </div>
              <span className="text-sm font-light">Scroll to explore</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scroll Sections - WITH GLASSSURFACE (min-height instead of fixed) */}
      {scrollSections.map((section, index) => (
        <section
          key={section.id}
          className="relative min-h-screen flex items-center"
          style={{ 
            paddingBottom: index === 2 ? '50vh' : '0',
            zIndex: 20
          }}
        >
          <div 
            className={`relative w-full max-w-5xl mx-auto px-6 md:px-8 transition-all duration-500 ${
              currentSection === index ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
            style={{ zIndex: 50 }}
          >
            {/* GlassSurface with min-height */}
            <div className="relative overflow-hidden rounded-3xl group">
              <GlassSurface 
                width="100%"
                height={400}
                borderRadius={24}
                borderWidth={0.1}
                brightness={40}
                opacity={0.85}
                blur={16}
                displace={0.8}
                backgroundOpacity={0.12}
                saturation={1.1}
                distortionScale={-200}
                redOffset={0}
                greenOffset={8}
                blueOffset={16}
                xChannel="R"
                yChannel="G"
                mixBlendMode="difference"
                className="border border-white/10 group-hover:border-white/20 transition-all shadow-2xl"
                style={{ minHeight: '400px' }}
              >
                <div className="flex flex-col items-center justify-center p-8 md:p-16 space-y-10 min-h-[400px]">
                  
                  <div className="text-center space-y-3">
                    <div className="text-6xl md:text-8xl font-bold text-white drop-shadow-lg">
                      {section.stat}
                    </div>
                    <div className="text-sm md:text-base text-[#4A9EFF] uppercase tracking-[0.2em] font-semibold">
                      {section.statLabel}
                    </div>
                  </div>
                  
                  <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  
                  <div className="text-center space-y-5 max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                      {section.title}
                    </h2>
                    <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </GlassSurface>
            </div>
          </div>
        </section>
      ))}

      {/* Progress Dots - With GlassSurface */}
      {isScrollMode && (
        <div className={`fixed ${isMobile ? 'bottom-8 left-1/2 -translate-x-1/2' : 'right-8 top-1/2 -translate-y-1/2'} z-50`}>
          <div className="relative overflow-hidden rounded-full">
            <GlassSurface 
              width={isMobile ? "150px" : "10px"}
              height={isMobile ? 60 : 180}
              borderRadius={9999}
              borderWidth={0.1}
              brightness={35}
              opacity={0.9}
              blur={12}
              displace={0.6}
              backgroundOpacity={0.15}
              saturation={1.0}
              distortionScale={-150}
              redOffset={0}
              greenOffset={6}
              blueOffset={12}
              xChannel="R"
              yChannel="G"
              mixBlendMode="difference"
              className="border border-[#2762AD]/40 shadow-xl"
            >
              <div className={`flex ${isMobile ? 'flex-row space-x-3 px-6' : 'flex-col space-y-3 py-6'} items-center justify-center`}>
                {scrollSections.map((_, idx) => (
                  <div
                    key={idx}
                    className={`${isMobile ? 'w-6 h-2' : 'w-2 h-6'} rounded-full transition-all duration-500 ${
                      idx === currentSection 
                        ? 'bg-[#2762AD] shadow-lg shadow-[#2762AD]/50' 
                        : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </GlassSurface>
          </div>
        </div>
      )}

      {/* Final CTA - With GlassSurface */}
      <section className="relative min-h-screen flex items-center" style={{ zIndex: 20 }}>
        <div className="w-full max-w-4xl mx-auto px-6 md:px-8" style={{ zIndex: 50 }}>
          <div className="relative overflow-hidden rounded-3xl">
            <GlassSurface 
              width="100%"
              height={400}
              borderRadius={24}
              borderWidth={0.1}
              brightness={40}
              opacity={0.85}
              blur={16}
              displace={0.8}
              backgroundOpacity={0.12}
              saturation={1.1}
              distortionScale={-200}
              redOffset={0}
              greenOffset={8}
              blueOffset={16}
              xChannel="R"
              yChannel="G"
              mixBlendMode="difference"
              className="border border-white/10 shadow-2xl"
              style={{ minHeight: '400px' }}
            >
              <div className="flex flex-col items-center justify-center p-8 md:p-16 space-y-12 text-center min-h-[400px]">
                <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                  Deploy Tomorrow's<br />Infrastructure Today
                </h2>
                
                <p className="text-lg md:text-xl text-white/70 font-light max-w-2xl leading-relaxed">
                  Join the DePIN revolution with proven technology generating measurable returns.
                </p>
                
                <div className={`flex ${isMobile ? 'flex-col w-full' : 'flex-row'} items-center gap-4`}>
                  <button className={`${isMobile ? 'w-full' : ''} px-10 py-4 bg-gradient-to-r from-[#2762AD] to-[#183D89] text-white rounded-xl font-semibold hover:scale-105 transition-transform shadow-xl`}>
                    Investor Call
                  </button>
                  
                  <button className={`${isMobile ? 'w-full' : ''} px-10 py-4 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all`}>
                    Pitch Deck
                  </button>
                </div>
              </div>
            </GlassSurface>
          </div>
        </div>
      </section>
    </div>
  );
}