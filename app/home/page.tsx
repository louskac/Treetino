"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import dynamic from 'next/dynamic';

const ColorBends = dynamic(
  () => import('@/Backgrounds/ColorBends/ColorBends'),
  { ssr: false }
);

import StaggeredMenu from '@/Components/StaggeredMenu/StaggeredMenu';
import GlassSurface from '@/Components/GlassSurface/GlassSurface';
import ScrollReveal from '@/TextAnimations/ScrollReveal/ScrollReveal';
import TiltedCard from '@/Components/TiltedCard/TiltedCard';
import ProfileCard from '@/Components/ProfileCard/ProfileCard'
import PerformanceMonitor from '@/Components/PerformanceMonitor';
import GlassIcons from '@/Components/GlassIcons/GlassIcons';
import RotatingText from '@/Components/RotatingText/RotatingText';
import Stepper, { Step } from '@/Components/Stepper/Stepper';

import { 
  GiWindTurbine,      // Wind turbine icon
  GiSolidLeaf,       // Solar panel icon  
  GiElectric,         // Lightning/electricity icon
  GiResize,           // Size/footprint icon
  GiFootprint,        // Footprint icon
  GiHouse             // House/household icon
} from 'react-icons/gi';

import Timeline from '@/Components/Timeline/Timeline';
import { treetinoTimeline } from '@/Components/Timeline/timelineData';

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

const items = [
  { icon: <GiSolidLeaf />, color: '#2762AD', label: '300' },
  { icon: <GiWindTurbine />, color: '#183D89', label: '12' },
  { icon: <GiElectric />, color: '#2A293A', label: '49 kW' },
  { icon: <GiResize />, color: '#2762AD', label: '400 m2' },
  { icon: <GiFootprint />, color: '#183D89', label: '1m2' },
  { icon: <GiHouse />, color: '#2A293A', label: '60' },
];

const descriptions = [
  'Of our state-of-the art solar leafs',
  'Transparent windturbines producing power even at night',
  'Perfectly picked to fit goverment subsidies limits',
  'Saved space equivalent to two tenis courts',
  'Ground space and picked to fit European no-license construction requirements',
  'Powering up to 60 modern households with combined solar and wind technology'
];


export default function Home() {
  // Create a ref for the intro section to track scroll
  const introRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the intro section
  const { scrollYProgress } = useScroll({
    target: introRef,
    offset: ["start end", "end start"]
  });

  // Different parallax speeds for each card
  // Card 1 (Left upper): Fast upward movement
  const card1Y = useTransform(scrollYProgress, [0, 1], [150, -200]);
  
  // Card 2 (Right): Medium speed downward movement
  const card2Y = useTransform(scrollYProgress, [0, 1], [-100, 150]);
  
  // Card 3 (Left lower): Slow upward movement
  const card3Y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Liquid Ether Background */}
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
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-[#E8F1FF]">
            The future of energy,
            <br />
            <span className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-4">
              <span className="whitespace-nowrap">rooted in</span>
              <RotatingText
                texts={['sustainability', 'green', 'renewable']}
                mainClassName="px-2 py-1 sm:px-3 sm:py-2 bg-gradient-to-r from-[#2762AD] via-[#183D89] to-[#2762AD] text-white rounded-lg text-3xl sm:text-4xl md:text-5xl lg:text-7xl"
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
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#E8F1FF]/60 max-w-2xl mx-auto font-light px-4">
            We are turning empty spaces that would normally only lose money into sustainable revenue generating assets
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 pointer-events-auto">
            <a
              href="/grant.pdf"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#2762AD] hover:bg-[#183D89] text-[#E8F1FF] font-semibold rounded-full transition-all duration-300 hover:scale-105 min-w-[180px] h-12 sm:h-14 flex items-center justify-center text-sm sm:text-base"
            >
              Gvernment funded
            </a>
            
            <a
              href="/whitepaper.pdf"
              className="w-full sm:w-auto relative group overflow-hidden rounded-full min-w-[180px]"
            >
              <GlassSurface 
                width="100%"
                height={48}
                borderRadius={28}
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
                className="border border-[#2762AD]/50 group-hover:border-[#2762AD] transition-all h-12 sm:h-14"
              >
                <span className="text-[#E8F1FF] font-semibold group-hover:text-white transition-colors text-sm sm:text-base">
                  Whitepaper
                </span>
              </GlassSurface>
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex items-center space-x-3 text-[#E8F1FF]/30 animate-bounce"
          >
            <div className="w-6 h-10 border-2 border-[#E8F1FF]/20 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-[#E8F1FF]/30 rounded-full mt-2 animate-pulse" />
            </div>
            <span className="text-base font-light">Learn more</span>
          </motion.div>
        </div>
      </div>

      {/* Intro Section */}
      <div ref={introRef} className="relative z-10 flex min-h-[80vh] items-center justify-center">
        <div className='max-w-7xl w-full mx-auto px-6 sticky top-1/3 -translate-y-1/3'>
          <div className="relative flex items-center justify-center">
            
            {/* Left Tilted Card - higher and tilted right - FAST PARALLAX */}
            <motion.div 
              className="absolute -left-32 top-20 -translate-y-[60%] z-0 pointer-events-auto" 
              style={{ 
                transform: 'translateY(-60%) rotateY(15deg) rotateX(-5deg)',
                y: card1Y
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

            {/* Center Text - in front, higher z-index */}
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

            {/* Right Tilted Card - lower and tilted left - MEDIUM PARALLAX */}
            <motion.div 
              className="absolute -right-32 top-1/2 -translate-y-[40%] z-0 pointer-events-auto" 
              style={{ 
                transform: 'translateY(-40%) rotateY(-15deg) rotateX(5deg)',
                y: card2Y
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
            
            {/* Left lower card - lower and tilted left - SLOW PARALLAX */}
            <motion.div 
              className="absolute -left-0 top-[45vh] -translate-y-[60%] z-0 pointer-events-auto" 
              style={{ 
                transform: 'translateY(-60%) rotateY(15deg) rotateX(-5deg)',
                y: card3Y
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
          </div>
        </div>
      </div>

      {/* 6 main numbers */}       
      <div className='relative mt-80'>
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-32 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-[#E8F1FF] flex items-center justify-center gap-2">
            <span>Main</span>
            <RotatingText
              texts={['Numbers', 'Information', 'Points']}
              mainClassName="px-2 py-1 sm:px-3 sm:py-2 bg-gradient-to-r from-[#2762AD] via-[#183D89] to-[#2762AD] text-white rounded-lg text-3xl sm:text-3xl md:text-5xl lg:text-5xl"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </h2>
                  
          <p className="text-lg text-[#E8F1FF]/60 max-w-2xl mx-auto">
            The most important information about our product
          </p>
        </div>
        <GlassIcons items={items} descriptions={descriptions} className="custom-class"/>        
      </div>

      {/* Timeline Section - Our Journey */}
      <div className="relative z-10 py-80 px-6">
        <div className="max-w-7xl w-full mx-auto">
                
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-[#E8F1FF] flex items-center justify-center gap-2">
              <span>Our</span>
              <RotatingText
                texts={['Journey', 'Roadpam', 'Timeline']}
                mainClassName="px-2 py-1 sm:px-3 sm:py-2 bg-gradient-to-r from-[#2762AD] via-[#183D89] to-[#2762AD] text-white rounded-lg text-3xl sm:text-3xl md:text-5xl lg:text-5xl"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              /> 
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
            <h2 className="text-4xl md:text-5xl font-bold text-[#E8F1FF] flex items-center justify-center gap-2">
              <span>Meet the</span>
              <RotatingText
                texts={['Innovators', 'Visionaries', 'Makers']}
                mainClassName="px-2 py-1 sm:px-3 sm:py-2 bg-gradient-to-r from-[#2762AD] via-[#183D89] to-[#2762AD] text-white rounded-lg text-3xl sm:text-3xl md:text-5xl lg:text-5xl"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              /> 
            </h2>
            
            <p className="text-lg text-[#E8F1FF]/60 max-w-2xl mx-auto">
              The minds behind the sustainable energy revolution
            </p>
          </div>

          {/* 3x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pointer-events-auto mb-8">
            {/* Row 1 */}
            <div className="flex justify-center">
              <ProfileCard
                name="Dominik"
                title="Founder & CEO"
                handle="dominik_masek"
                status="Founded Wattino"
                contactText="LinkedIn"
                avatarUrl="/team/dominik.png"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => window.open('https://www.linkedin.com/in/dominik-ma%C5%A1ek-b1b386245/', '_blank')}
                showBehindGradient={false}
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
                onContactClick={() => window.open('https://x.com/lustyk_jakub', '_blank')}
                showBehindGradient={false}
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
                onContactClick={() => window.open('https://www.fa.cvut.cz/cs/galerie/portfolio/32439-matej-cizek/atelierove-prace', '_blank')}
                showBehindGradient={false}
              />
            </div>

            {/* Row 2 */}
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
                onContactClick={() => window.open('https://tn.nova.cz/autor/457-monika-zverinova', '_blank')}
                showBehindGradient={false}
              />
            </div>

            <div className="flex justify-center">
              <ProfileCard
                name="Greta"
                title="Digital presence"
                handle="greta_bozkova"
                status="Social media"
                contactText="LinkedIn"
                avatarUrl="/team/greta.png"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => window.open('https://www.linkedin.com/in/gretabozkova/', '_blank')}
                showBehindGradient={false}
              />
            </div>

            <div className="flex justify-center">
              <ProfileCard
                name="Radim"
                title="Mechanical engineer"
                handle="radim_novotny"
                status="Product development"
                contactText="Contact Me"
                avatarUrl="/team/radim.png"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => window.open('mailto:info@treetino.com', '_blank')}
                showBehindGradient={true}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact minimal */}
      <div className="relative z-10 py-20 px-6">
        <div className="max-w-7xl w-full mx-auto">
        </div>
      </div>
    </main>
  );
}