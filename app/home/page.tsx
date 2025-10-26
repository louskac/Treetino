"use client";

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import LiquidEther from '@/Backgrounds/LiquidEther/LiquidEther';
import StaggeredMenu from '@/Components/StaggeredMenu/StaggeredMenu';
import GlassSurface from '@/Components/GlassSurface/GlassSurface';
import PerformanceMonitor from '@/Components/PerformanceMonitor';

// Lazy load heavy components
const ScrollReveal = dynamic(() => import('@/TextAnimations/ScrollReveal/ScrollReveal'), {
  loading: () => <div className="min-h-[200px]" />
});
const TiltedCard = dynamic(() => import('@/Components/TiltedCard/TiltedCard'), {
  loading: () => <div className="w-[280px] h-[280px]" />
});
const Timeline = dynamic(() => import('@/Components/Timeline/Timeline'), {
  loading: () => <div className="h-96" />
});
const ProfileCard = dynamic(() => import('@/Components/ProfileCard'), {
  loading: () => <div className="w-full h-[400px]" />
});

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

export default function HomePage() {
  const router = useRouter();
  
  // Refs for intersection observers
  const introRef = useRef<HTMLDivElement>(null);
  const [isIntroInView, setIsIntroInView] = useState(false);
  
  // Track scroll progress ONLY when section is in view
  const { scrollYProgress } = useScroll({
    target: introRef,
    offset: ["start end", "end start"]
  });

  // Parallax transforms - only calculate when in view
  const card1Y = useTransform(scrollYProgress, [0, 1], [150, -200]);
  const card2Y = useTransform(scrollYProgress, [0, 1], [-100, 150]);
  const card3Y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // Intersection observer for intro section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntroInView(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '100px' }
    );
    
    if (introRef.current) {
      observer.observe(introRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  // Prefetch other pages on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      router.prefetch('/tree');
      router.prefetch('/web3');
      router.prefetch('/contact');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <PerformanceMonitor />
      
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

      {/* Hero Section */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 pointer-events-none">
        <div className="max-w-6xl w-full text-center space-y-8">
          
          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl font-bold text-[#E8F1FF] leading-tight tracking-tight">
            The future of energy,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2762AD] via-[#183D89] to-[#2762AD]">
              rooted in sustainability.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-[#E8F1FF]/60 max-w-2xl mx-auto font-light">
            We are turning empty spaces that would normally only loose money into sustainable revenue generating assets
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 pointer-events-auto">
            <a
              href="/grant.pdf"
              className="px-8 py-4 bg-[#2762AD] hover:bg-[#183D89] text-[#E8F1FF] font-semibold rounded-full transition-all duration-300 hover:scale-105 min-w-[180px]"
            >
              Government funded
            </a>
            
            <a
              href="/whitepaper.pdf"
              className="relative group overflow-hidden rounded-full min-w-[180px]"
            >
              <GlassSurface 
                height={"56"}
                className="px-8 py-4 flex items-center justify-center border border-[#2762AD]/50 group-hover:border-[#2762AD] transition-all w-full"
              >
                <span className="text-[#E8F1FF] font-semibold group-hover:text-white transition-colors">
                  Whitepaper
                </span>
              </GlassSurface>
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce pointer-events-none">
          <svg 
            className="w-6 h-6 text-[#E8F1FF]/40" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>

      {/* Intro Section - Parallax only calculates when in view */}
      <div ref={introRef} className="relative z-10 flex min-h-[100vh] items-center justify-center">
        <div className='max-w-7xl w-full mx-auto px-6 sticky top-1/3 -translate-y-1/3'>
          <div className="relative flex items-center justify-center">
            
            {/* Left Tilted Card - FAST PARALLAX */}
            {isIntroInView && (
              <motion.div 
                className="absolute -left-32 top-20 -translate-y-[60%] z-0 pointer-events-auto" 
                style={{ 
                  y: card1Y,
                  willChange: 'transform'
                }}
              >
                <TiltedCard
                  imageSrc="cards/first.jpg"
                  altText="Treetino Model Left"
                  captionText="Discussing with angel"
                  containerHeight="280px"
                  containerWidth="280px"
                  imageHeight="280px"
                  imageWidth="280px"
                  rotateAmplitude={12}
                  scaleOnHover={1.15}
                  showMobileWarning={false}
                  showTooltip={true}
                  displayOverlayContent={true}
                  overlayContent={
                    <div className="bg-black/70 text-white px-4 py-2 rounded-xl backdrop-blur-md shadow-lg mt-3 ml-3">
                      <p className="text-sm font-semibold whitespace-nowrap">
                        Founders
                      </p>
                    </div>
                  }
                />
              </motion.div>
            )}

            {/* Center Text */}
            <div className='max-w-5xl w-full text-center space-y-8 relative z-10'>
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={5}
                blurStrength={10}
                wordAnimationEnd="center center"
                rotationEnd="center center"
                textClassName="text-white"
              >
                In an ever more reliant world on electricity we are creating futuristic powerplants designed as trees with solar panels as leafs and transparent wind turbines to produce energy consistently. 
              </ScrollReveal>
            </div>

            {/* Right Tilted Card - MEDIUM PARALLAX */}
            {isIntroInView && (
              <motion.div 
                className="absolute -right-32 top-1/2 -translate-y-[40%] z-0 pointer-events-auto" 
                style={{ 
                  y: card2Y,
                  willChange: 'transform'
                }}
              >
                <TiltedCard
                  imageSrc="cards/second.jpeg"
                  altText="Treetino Model Right"
                  captionText="Presented at a show"
                  containerHeight="280px"
                  containerWidth="280px"
                  imageHeight="280px"
                  imageWidth="280px"
                  rotateAmplitude={12}
                  scaleOnHover={1.15}
                  showMobileWarning={false}
                  showTooltip={true}
                  displayOverlayContent={true}
                  overlayContent={
                    <div className="bg-black/70 text-white px-4 py-2 rounded-xl backdrop-blur-md shadow-lg mt-3 ml-3">
                      <p className="text-sm font-semibold whitespace-nowrap">
                        Model
                      </p>
                    </div>
                  }
                />
              </motion.div>
            )}
            
            {/* Left lower card - SLOW PARALLAX */}
            {isIntroInView && (
              <motion.div 
                className="absolute -left-0 top-[45vh] -translate-y-[60%] z-0 pointer-events-auto" 
                style={{ 
                  y: card3Y,
                  willChange: 'transform'
                }}
              >
                <TiltedCard
                  imageSrc="cards/third.jpg"
                  altText="Treetino Model Left"
                  captionText="Picked by Czech Invest"
                  containerHeight="280px"
                  containerWidth="280px"
                  imageHeight="280px"
                  imageWidth="280px"
                  rotateAmplitude={12}
                  scaleOnHover={1.15}
                  showMobileWarning={false}
                  showTooltip={true}
                  displayOverlayContent={true}
                  overlayContent={
                    <div className="bg-black/70 text-white px-4 py-2 rounded-xl backdrop-blur-md shadow-lg mt-3 ml-3">
                      <p className="text-sm font-semibold whitespace-nowrap">
                        Pitch
                      </p>
                    </div>
                  }
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Timeline Section - Our Journey */}
      <div className="relative z-10 py-80 px-6">
        <div className="max-w-7xl w-full mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-[#E8F1FF]">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2762AD] via-[#183D89] to-[#2762AD]">Journey</span>
            </h2>
            
            <p className="text-lg text-[#E8F1FF]/60 max-w-2xl mx-auto">
              From vision to reality - the milestones that shaped Treetino
            </p>
          </div>

          {/* Timeline Component */}
          <Timeline events={treetinoTimeline} />
        </div>
      </div>

      {/* Team Section - 3x2 Grid of Profile Cards */}
      <div className="relative z-10 py-20 px-6">
        <div className="max-w-7xl w-full mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-[#E8F1FF]">
              Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2762AD] via-[#183D89] to-[#2762AD]">Innovators</span>
            </h2>
            
            <p className="text-lg text-[#E8F1FF]/60 max-w-2xl mx-auto">
              The minds behind the sustainable energy revolution
            </p>
          </div>

          {/* 3x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pointer-events-auto mb-8">
            
            <div className="flex justify-center">
              <ProfileCard
                name="Dominik"
                title="Founder & CEO"
                handle="Dominik Masek"
                status="Founded Wattino"
                contactText="LinkedIn"
                avatarUrl="/team/dominik.png"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => console.log('Contact Dominik')}
              />
            </div>

            <div className="flex justify-center">
              <ProfileCard
                name="Jakub"
                title="Co-Founder & CTO"
                handle="jakub_lustyk"
                status="Founded Nocena"
                contactText="Twitter/X"
                avatarUrl="/team/jakub.png"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => console.log('Contact CTO')}
              />
            </div>

            <div className="flex justify-center">
              <ProfileCard
                name="Matěj"
                title="Architect"
                handle="matej_cizek"
                status="Technical design"
                contactText="Portfolio"
                avatarUrl="/team/matej.png"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => console.log('Contact Engineer')}
              />
            </div>

            <div className="flex justify-center">
              <ProfileCard
                name="Monika"
                title="Public relations"
                handle="monika_zverinova"
                status="TV moderator"
                contactText="Portfolio"
                avatarUrl="/team/monika.png"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => console.log('Contact Designer')}
              />
            </div>

            <div className="flex justify-center">
              <ProfileCard
                name="Greta"
                title="Digital presence"
                handle="geta_bozkhova"
                status="Social media"
                contactText="LinkedIn"
                avatarUrl="/team/greta.png"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => console.log('Contact Researcher')}
              />
            </div>

            <div className="flex justify-center">
              <ProfileCard
                name="Radim"
                title="Mehcanical engeneere"
                handle="radim_novotny"
                status="Product development"
                contactText="Contact Me"
                avatarUrl="/team/radim.png"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => console.log('Contact BD')}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}