import './GlassIcons.css';
import BlurText from "../../TextAnimations/BlurText";
import GlassSurface from '@/Components/GlassSurface/GlassSurface';

import { useState, useEffect } from 'react';

const gradientMapping = {
  blue: 'linear-gradient(hsl(223, 90%, 50%), hsl(208, 90%, 50%))',
  purple: 'linear-gradient(hsl(283, 90%, 50%), hsl(268, 90%, 50%))',
  red: 'linear-gradient(hsl(3, 90%, 50%), hsl(348, 90%, 50%))',
  indigo: 'linear-gradient(hsl(253, 90%, 50%), hsl(238, 90%, 50%))',
  orange: 'linear-gradient(hsl(43, 90%, 50%), hsl(28, 90%, 50%))',
  green: 'linear-gradient(hsl(123, 90%, 40%), hsl(108, 90%, 40%))'
};

const handleAnimationComplete = () => {
  console.log('Animation completed!');
};

const GlassIcons = ({ items, descriptions, className }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getBackgroundStyle = (color, index) => {
    let finalColor = color;
    
    // Reorder colors for mobile: 2 light, 2 middle, 2 dark
    if (isMobile) {
      const mobileColorOrder = ['#2762AD', '#2762AD', '#183D89', '#183D89', '#2A293A', '#2A293A'];
      finalColor = mobileColorOrder[index];
    }
    
    if (gradientMapping[finalColor]) {
      return { background: gradientMapping[finalColor] };
    }
    return { background: finalColor };
  };

  const handleClick = (index) => {
    setHoveredIndex(index);
  };

  return (
    <>
      <div className={`icon-btns ${className || ''}`}>
        {items.map((item, index) => (
          <button 
            key={index} 
            className={`icon-btn ${item.customClass || ''}`} 
            aria-label={item.label} 
            type="button"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleClick(index)}
          >
            <span className="icon-btn__back" style={getBackgroundStyle(item.color, index)}></span>
            
            {/* GlassSurface with explicit square dimensions */}
            <GlassSurface
              width={128}
              height={128}
              borderRadius={20}
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
              className="icon-btn__front"
            >
              <span className="icon-btn__icon" aria-hidden="true">
                {item.icon}
              </span>
            </GlassSurface>
            
            <span className="icon-btn__label">{item.label}</span>
          </button>
        ))}
      </div>
      
      {/* Dynamic Description Section - Responsive spacing */}
      <div className="mt-12 md:mt-20 max-w-4xl mx-auto px-6 min-h-[120px] w-full flex items-center justify-center">
        <BlurText
          key={hoveredIndex}
          text={descriptions[hoveredIndex] || ''}
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="text-3xl mb-8 text-center"
        />
      </div>
    </>
  );
};

export default GlassIcons;