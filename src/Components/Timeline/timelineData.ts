// Timeline data for Treetino with image positioning, captions, and parallax speeds
// Icon mapper for timeline icons
import { 
    Lightbulb, 
    Sprout, 
    Handshake, 
    Building2, 
    DollarSign, 
    Trophy, 
    Globe, 
    Zap, 
    Sparkles,
    LucideIcon
  } from 'lucide-react'
  
  export const iconMap: Record<string, LucideIcon> = {
    Lightbulb,
    Sprout,
    Handshake,
    Building2,
    DollarSign,
    Trophy,
    Globe,
    Zap,
    Sparkles,
  }
  
  // Helper function to get icon component
  export const getIcon = (iconName: string): LucideIcon | null => {
    return iconMap[iconName] || null
  }
  
  export const treetinoTimeline = [
    {
      year: "2022",
      title: "The Vision",
      description: "Treetino was founded with a revolutionary idea: transform empty urban spaces into sustainable energy-generating assets that look like art.",
      icon: "Lightbulb",
      color: "#2762AD",
      // 3 images with varied parallax speeds
      images: [
        {
          src: "/timeline/vision.jpg",
          alt: "Vision concept",
          caption: "Initial concept art",
          overlayText: "Founders",
          position: "left",
          offsetX: "3%",
          offsetY: "-35%",
          parallaxSpeed: "fast",
          size: {
            width: "320px",
            height: "370px"
          }
        },
        {
          src: "/timeline/government.jpeg",
          alt: "Government meeting",
          caption: "First pitch meeting",
          overlayText: "Partnership",
          position: "center",
          offsetY: "25%",
          parallaxSpeed: "slow",
          size: {
            width: "280px",
            height: "320px"
          }
        },
        {
          src: "/timeline/prototype.jpg",
          alt: "Early concept sketch",
          caption: "Design sketches",
          overlayText: "Concept",
          position: "right",
          offsetX: "3%",
          offsetY: "0%",
          parallaxSpeed: "medium",
          size: {
            width: "300px",
            height: "350px"
          }
        }
      ]
    },
    {
      year: "2023",
      title: "First Prototype",
      description: "Developed our first working model combining solar panels as leaves and transparent wind turbines. Presented at innovation shows across Europe.",
      icon: "Sprout",
      color: "#183D89",
      // 3 images with varied parallax speeds
      images: [
        {
          src: "/timeline/prototype.jpg",
          alt: "First prototype",
          caption: "Working model v1",
          overlayText: "Prototype",
          position: "left",
          offsetX: "2%",
          offsetY: "0%",
          parallaxSpeed: "medium",
          size: {
            width: "330px",
            height: "380px"
          }
        },
        {
          src: "/timeline/vision.jpg",
          alt: "Prototype testing",
          caption: "Testing phase",
          overlayText: "Innovation",
          position: "right",
          offsetX: "3%",
          offsetY: "-30%",
          parallaxSpeed: "fast",
          size: {
            width: "290px",
            height: "340px"
          }
        },
        {
          src: "/timeline/government.jpeg",
          alt: "Team with prototype",
          caption: "Team collaboration",
          overlayText: "Development",
          position: "right",
          offsetX: "35%",
          offsetY: "28%",
          parallaxSpeed: "slow",
          size: {
            width: "270px",
            height: "310px"
          }
        }
      ]
    },
    {
      year: "2023",
      title: "Government Partnership",
      description: "Secured partnership with European governments to pilot Treetino installations in public spaces.",
      icon: "Handshake",
      color: "#2762AD",
      // 1 image
      images: [
        {
          src: "/timeline/government.jpeg",
          alt: "Government partnership",
          caption: "Official ceremony",
          overlayText: "Partnership",
          position: "right",
          offsetX: "5%",
          offsetY: "-20%",
          parallaxSpeed: "medium",
          size: {
            width: "340px",
            height: "390px"
          }
        }
      ]
    },
    {
      year: "2024",
      title: "First Installation",
      description: "Completed our first commercial installation in a major European city, generating clean energy for 50 homes.",
      icon: "Building2",
      color: "#183D89",
      // 2 images with different speeds
      images: [
        {
          src: "/timeline/prototype.jpg",
          alt: "Installation in progress",
          caption: "Construction site",
          overlayText: "Building",
          position: "left",
          offsetX: "4%",
          offsetY: "25%",
          parallaxSpeed: "slow",
          size: {
            width: "310px",
            height: "360px"
          }
        },
        {
          src: "/timeline/vision.jpg",
          alt: "Completed installation",
          caption: "Final result",
          overlayText: "Complete",
          position: "right",
          offsetX: "6%",
          offsetY: "-28%",
          parallaxSpeed: "fast",
          size: {
            width: "330px",
            height: "380px"
          }
        }
      ]
    },
    {
      year: "2024",
      title: "Series A Funding",
      description: "Raised €15M in Series A funding to scale production and expand to new markets.",
      icon: "DollarSign",
      color: "#2762AD",
      // 1 image
      images: [
        {
          src: "/timeline/vision.jpg",
          alt: "Investor presentation",
          caption: "Pitch deck presentation",
          overlayText: "Investment",
          position: "left",
          offsetX: "3%",
          offsetY: "0%",
          parallaxSpeed: "medium",
          size: {
            width: "350px",
            height: "400px"
          }
        }
      ]
    },
    {
      year: "2024",
      title: "Technology Award",
      description: "Won the European Innovation Award for sustainable urban technology and design excellence.",
      icon: "Trophy",
      color: "#183D89",
      // 2 images with different speeds
      images: [
        {
          src: "/timeline/government.jpeg",
          alt: "Award ceremony",
          caption: "Award ceremony",
          overlayText: "Recognition",
          position: "right",
          offsetX: "4%",
          offsetY: "-25%",
          parallaxSpeed: "fast",
          size: {
            width: "320px",
            height: "370px"
          }
        },
        {
          src: "/timeline/prototype.jpg",
          alt: "Award trophy",
          caption: "Trophy showcase",
          overlayText: "Achievement",
          position: "left",
          offsetX: "3%",
          offsetY: "22%",
          parallaxSpeed: "slow",
          size: {
            width: "300px",
            height: "350px"
          }
        }
      ]
    },
    {
      year: "2025",
      title: "Global Expansion",
      description: "Launched operations in 15 countries across Europe, Asia, and North America with over 200 installations planned.",
      icon: "Globe",
      color: "#2762AD",
      // 1 image
      images: [
        {
          src: "/timeline/vision.jpg",
          alt: "Global map",
          caption: "Worldwide presence",
          overlayText: "Global",
          position: "right",
          offsetX: "2%",
          offsetY: "20%",
          parallaxSpeed: "medium",
          size: {
            width: "340px",
            height: "390px"
          }
        }
      ]
    },
    {
      year: "2025",
      title: "Smart Grid Integration",
      description: "Integrated AI-powered smart grid technology, optimizing energy distribution in real-time across all installations.",
      icon: "Zap",
      color: "#183D89",
      // 1 image
      images: [
        {
          src: "/timeline/prototype.jpg",
          alt: "Smart grid dashboard",
          caption: "AI dashboard",
          overlayText: "Technology",
          position: "left",
          offsetX: "4%",
          offsetY: "-22%",
          parallaxSpeed: "fast",
          size: {
            width: "330px",
            height: "380px"
          }
        }
      ]
    },
    {
      year: "2025",
      title: "Community Impact",
      description: "Reached milestone of powering 10,000 homes with clean energy while beautifying urban landscapes worldwide.",
      icon: "Sparkles",
      color: "#2762AD",
      // 2 images with different speeds
      images: [
        {
          src: "/timeline/government.jpeg",
          alt: "Community celebration",
          caption: "Community event",
          overlayText: "Impact",
          position: "left",
          offsetX: "3%",
          offsetY: "0%",
          parallaxSpeed: "slow",
          size: {
            width: "340px",
            height: "390px"
          }
        },
        {
          src: "/timeline/vision.jpg",
          alt: "Impact statistics",
          caption: "Results dashboard",
          overlayText: "Milestone",
          position: "right",
          offsetX: "5%",
          offsetY: "24%",
          parallaxSpeed: "fast",
          size: {
            width: "310px",
            height: "360px"
          }
        }
      ]
    }
  ];