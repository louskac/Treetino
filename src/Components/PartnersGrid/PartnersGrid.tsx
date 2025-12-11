"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import GlassSurface from '@/Components/GlassSurface/GlassSurface';
import Image from 'next/image';

interface Partner {
  name: string;
  logo: string;
  description: string;
}

interface PartnersStripProps {
  partners: Partner[];
}

export default function PartnersStrip({ partners }: PartnersStripProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative z-10 w-full mt-32">
      {/* Full-width container with side margins */}
      <div className="w-full px-8 md:px-16 lg:px-24">
        
        {/* Featured Support Section */}
        <div className="mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center space-y-6"
          >
            {/* Support Text - Czech Primary */}
            <div className="space-y-2">
              <p className="text-base md:text-lg text-[#E8F1FF] font-light max-w-3xl leading-relaxed">
                Tento projekt byl realizován za finanční podpory programu Technologická inkubace.
              </p>
              <p className="text-xs md:text-sm text-[#E8F1FF]/50 font-light max-w-3xl leading-relaxed italic">
                This project has been realized by the financial support from the Technologická inkubace program.
              </p>
            </div>
            
            {/* Featured Logo */}
            <div className="relative group pointer-events-auto">
              <Image
                src="/partners/image.png"
                alt="Technologická inkubace logo"
                width={400}
                height={100}
                className="object-contain h-full w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </motion.div>
        </div>

        {/* Horizontal Logo Strip */}
        <div className="flex flex-wrap items-center justify-between gap-8 md:gap-12 py-16">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              className="relative group pointer-events-auto flex-shrink-0"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              {/* Logo Container */}
              <div className="relative w-32 h-16 md:w-40 md:h-20 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  width={160}
                  height={80}
                  className="object-contain filter brightness-0 invert opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>

              {/* Hover Tooltip */}
              {hoveredIndex === index && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 pointer-events-none z-50"
                >
                  {/* Tooltip Content with integrated arrow */}
                  <div className="relative bg-gradient-to-br from-[#2762AD]/95 via-[#183D89]/95 to-[#2A293A]/95 backdrop-blur-md rounded-xl p-4 border border-[#2762AD]/30 shadow-2xl">
                    {/* Arrow using CSS clip-path - single element */}
                    <div 
                      className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-2 bg-gradient-to-br from-[#2762AD] to-[#183D89]"
                      style={{
                        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
                      }}
                    />
                    
                    <h3 className="text-sm font-semibold text-[#E8F1FF] mb-2">
                      {partner.name}
                    </h3>
                    <p className="text-xs text-[#E8F1FF]/80 leading-relaxed font-light">
                      {partner.description}
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
        
        {/* Government Grant Button Section */}
        {/* Adjusted padding (py-16) and removed min-h-screen to collapse vertical space. */}
        <div className="relative z-10 flex justify-center items-center py-16 px-6">
          <div className="max-w-6xl w-full text-center space-y-8">
            <a
              href="/grant.pdf"
              // Set to w-fit and inline-flex to ensure the button maintains its small width
              // even after the link has been visited.
              className="relative group overflow-hidden rounded-full min-w-[180px] w-fit inline-flex pointer-events-auto"
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
                  Goverment grant    
                </span>
              </GlassSurface>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}