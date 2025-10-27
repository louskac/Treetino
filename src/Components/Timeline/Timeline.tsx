"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import TiltedCard from '@/Components/TiltedCard/TiltedCard';
import { getIcon } from './timelineData';

export type TimelineEvent = {
  year: string;
  title: string;
  description: string;
  icon?: string;
  color?: string;
  images?: Array<{
    src: string;
    alt?: string;
    caption?: string;
    overlayText?: string;
    position?: string;
    offsetX?: string;
    offsetY?: string;
    parallaxSpeed?: string;
    size?: {
      width: string;
      height: string;
    };
  }>;
};

interface TimelineProps {
  events: TimelineEvent[];
}

export default function Timeline({ events }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const lineHeight = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  return (
    <div ref={containerRef} className="relative w-full py-32 px-6">
      <div className="max-w-[1400px] mx-auto relative">
        
        {/* Background line - desktop */}
        <div 
          className="hidden md:block absolute left-1/2 w-[3px] -translate-x-1/2 rounded-full pointer-events-none"
          style={{
            background: 'rgba(39, 98, 173, 0.2)',
            top: 0,
            height: '100%',
          }}
        />
        
        {/* Animated vertical line - desktop */}
        <motion.div 
          ref={lineRef}
          className="hidden md:block absolute left-1/2 w-[3px] -translate-x-1/2 rounded-full pointer-events-none origin-top"
          style={{
            background: 'linear-gradient(to bottom, #2762AD, #183D89)',
            top: 0,
            height: lineHeight,
            boxShadow: '0 0 20px rgba(39, 98, 173, 0.6)'
          }}
        />

        {/* Background line - mobile */}
        <div 
          className="md:hidden absolute left-6 w-[3px] rounded-full pointer-events-none"
          style={{
            background: 'rgba(39, 98, 173, 0.2)',
            top: 0,
            height: '100%',
          }}
        />
        
        {/* Animated vertical line - mobile */}
        <motion.div 
          className="md:hidden absolute left-6 w-[3px] rounded-full pointer-events-none origin-top"
          style={{
            background: 'linear-gradient(to bottom, #2762AD, #183D89)',
            top: 0,
            height: lineHeight,
            boxShadow: '0 0 20px rgba(39, 98, 173, 0.6)'
          }}
        />

        {/* Timeline events */}
        <div className="space-y-32 md:space-y-40">
          {events.map((event, index) => (
            <TimelineItem
              key={index}
              event={event}
              index={index}
              totalEvents={events.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface TimelineItemProps {
  event: TimelineEvent;
  index: number;
  totalEvents: number;
}

function TimelineItem({ event, index, totalEvents }: TimelineItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const isLeft = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const x = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isLeft ? [-100, 0, 0] : [100, 0, 0]
  );
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1]);

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const IconComponent = event.icon ? getIcon(event.icon) : null;

  return (
    <div ref={itemRef} className="relative flex items-center min-h-[500px] md:min-h-[600px]">
      
      {/* Background TiltedCard Images */}
      {event.images && event.images.map((image, imgIndex) => {
        const defaultPosition = image.position || (isLeft ? 'left' : 'right');
        const defaultOffsetX = image.offsetX || '2%';
        const defaultOffsetY = image.offsetY || '0%';
        const defaultWidth = image.size?.width || '350px';
        const defaultHeight = image.size?.height || '400px';
        
        const parallaxMultiplier = 
          image.parallaxSpeed === 'fast' ? 3 :
          image.parallaxSpeed === 'medium' ? 2 :
          1;
        
        const customImageY = useTransform(scrollYProgress, [0, 1], [50 * parallaxMultiplier, -50 * parallaxMultiplier]);

        let positionStyles: any = {
          y: customImageY,
        };

        if (defaultPosition === 'center') {
          positionStyles.left = '50%';
          positionStyles.transform = 'translate(-50%, -50%)';
        } else if (defaultPosition === 'left') {
          positionStyles.left = defaultOffsetX;
        } else {
          positionStyles.right = defaultOffsetX;
        }

        if (defaultOffsetY.includes('-')) {
          positionStyles.top = `calc(50% ${defaultOffsetY})`;
        } else if (defaultOffsetY === '0%') {
          positionStyles.top = '50%';
        } else {
          positionStyles.top = `calc(50% + ${defaultOffsetY})`;
        }

        return (
          <motion.div
            key={imgIndex}
            className={`hidden md:block absolute pointer-events-none`}
            style={{
              ...positionStyles,
              zIndex: 0,
              transform: defaultPosition === 'center' 
                ? 'translate(-50%, -50%)' 
                : 'translateY(-50%)',
            }}
          >
            <div className="opacity-100 pointer-events-auto">
              <TiltedCard
                imageSrc={image.src}
                altText={image.alt || event.title}
                captionText={image.caption}
                containerHeight={defaultHeight}
                containerWidth={defaultWidth}
                imageHeight={defaultHeight}
                imageWidth={defaultWidth}
                rotateAmplitude={8}
                scaleOnHover={1.08}
                showMobileWarning={false}
                showTooltip={!!image.caption}
                displayOverlayContent={!!image.overlayText}
                overlayContent={
                  image.overlayText ? (
                    <div className="bg-black/70 text-white px-4 py-2 rounded-xl backdrop-blur-md shadow-lg mt-3 ml-3">
                      <p className="text-sm font-semibold whitespace-nowrap">
                        {image.overlayText}
                      </p>
                    </div>
                  ) : undefined
                }
              />
            </div>
          </motion.div>
        );
      })}
      
      {/* Central dot with pulse animation */}
      <motion.div
        className="absolute left-6 md:left-1/2 md:-translate-x-1/2 z-20 top-1/2 -translate-y-1/2"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div
          className="relative"
          whileHover={{ scale: 1.3 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {/* Outer pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, ${event.color || '#2762AD'}60, transparent)`,
              filter: 'blur(12px)',
              width: '60px',
              height: '60px',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.6, 0.2, 0.6],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Icon container with gradient background */}
          <div
            className="w-16 h-16 md:w-20 md:h-20 rounded-full border-3 border-[#E8F1FF] relative z-10 flex items-center justify-center shadow-2xl"
            style={{
              background: `radial-gradient(circle, ${event.color || '#2762AD'}, ${event.color || '#183D89'})`,
              boxShadow: `0 0 30px ${event.color || '#2762AD'}90, 0 0 60px ${event.color || '#2762AD'}40`,
            }}
          >
            {IconComponent && (
              <IconComponent 
                className="w-8 h-8 md:w-10 md:h-10 text-white"
                strokeWidth={1.5}
              />
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Content card with PROPER glass morphism effect */}
      <motion.div
        className={`w-full pl-20 pr-4 md:pr-0 md:pl-0 md:w-[45%] relative z-10 ${
          isLeft ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
        }`}
        style={{ opacity, x, scale }}
      >
        <div 
          className="relative w-full p-8 md:p-10 rounded-2xl border-2 border-[#2762AD]/30 hover:border-[#2762AD]/70 transition-all duration-500 group cursor-pointer overflow-hidden"
          style={{
            background: 'rgba(39, 98, 173, 0.08)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            boxShadow: `
              0 8px 32px 0 rgba(39, 98, 173, 0.15),
              inset 0 1px 1px 0 rgba(255, 255, 255, 0.1),
              0 0 0 1px rgba(39, 98, 173, 0.1)
            `,
          }}
        >
          {/* Subtle gradient overlay for depth */}
          <div 
            className="absolute inset-0 opacity-50 pointer-events-none rounded-2xl"
            style={{
              background: `radial-gradient(circle at 50% 0%, ${event.color || '#2762AD'}15, transparent 70%)`,
            }}
          />
          
          {/* Glass shine effect */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 60%)',
            }}
          />

          <div className="relative z-10 flex flex-col space-y-6">
            {/* Year badge */}
            <motion.div
              className="inline-flex items-center self-start"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <span 
                className="px-4 py-2 rounded-full text-sm md:text-base font-bold tracking-wider border-2 backdrop-blur-sm"
                style={{
                  background: `linear-gradient(135deg, ${event.color || '#2762AD'}30, ${event.color || '#183D89'}15)`,
                  borderColor: `${event.color || '#2762AD'}60`,
                  color: '#E8F1FF',
                  boxShadow: `0 0 20px ${event.color || '#2762AD'}30`,
                }}
              >
                {event.year}
              </span>
            </motion.div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#E8F1FF] group-hover:text-white transition-colors leading-tight drop-shadow-lg">
              {event.title}
            </h3>

            {/* Decorative divider */}
            <motion.div
              className="h-1 w-20 md:w-24 rounded-full shadow-lg"
              style={{
                background: `linear-gradient(90deg, ${event.color || '#2762AD'}, transparent)`,
                boxShadow: `0 0 10px ${event.color || '#2762AD'}80`,
              }}
              initial={{ width: 0 }}
              whileInView={{ width: '6rem' }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />

            {/* Description */}
            <p className="text-base md:text-lg text-[#E8F1FF]/90 group-hover:text-[#E8F1FF] transition-colors leading-relaxed flex-grow drop-shadow-md">
              {event.description}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}