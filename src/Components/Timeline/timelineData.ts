// Timeline data for Treetino - Updated to match actual development roadmap
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
  Cog,
  Target,
  Layers,
  Network,
  TreePine,
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
  Cog,
  Target,
  Layers,
  Network,
  TreePine,
}

// Helper function to get icon component
export const getIcon = (iconName: string): LucideIcon | null => {
  return iconMap[iconName] || null
}

const color = {
  light: "#2762AD",
  middle: "#183D89",
  dark: "#2A293A",
}

export const treetinoTimeline = [
  {
    year: "Q2 2021 - Q3 2023",
    title: "Foundation & Operational Setup",
    description: "Establishing Treetino s.r.o. operations, legal framework, and initial business development. Built the foundation for our renewable energy infrastructure vision.",
    icon: "Building2",
    color: color.light,
    images: [
      {
        src: "/timeline/founded.jpg",
        alt: "Company foundation",
        caption: "Treetino s.r.o. establishment",
        overlayText: "Founded",
        position: "left",
        offsetX: "-2%",
        offsetY: "-55%",
        parallaxSpeed: "fast",
        size: {
          width: "320px",
          height: "370px"
        }
      },
      {
        src: "/timeline/established.JPG",
        alt: "Legal framework",
        caption: "Founders showing of solar leaf",
        overlayText: "Founders",
        position: "right",
        offsetX: "10%",
        offsetY: "25%",
        parallaxSpeed: "slow",
        size: {
          width: "300px",
          height: "350px"
        }
      }
    ]
  },
  {
    year: "Q3 2023 - Q1 2024",
    title: "Technology Development Phase",
    description: "Research and development of proprietary solar panel and wind turbine technologies for optimal integration. Creating the core technology that makes Treetino unique.",
    icon: "Cog",
    color: color.light,
    images: [
      {
        src: "/timeline/innovation.jpg",
        alt: "Technology research",
        caption: "Founders pitching",
        overlayText: "Innovation",
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
        src: "/timeline/development.jpg",
        alt: "Solar and wind tech",
        caption: "Transparent windturbines",
        overlayText: "Development",
        position: "right",
        offsetX: "-15%",
        offsetY: "-30%",
        parallaxSpeed: "fast",
        size: {
          width: "290px",
          height: "340px"
        }
      }
    ]
  },
  {
    year: "Q1 2024 - Q3 2024",
    title: "Environmental Impact Modeling",
    description: "Advanced tree projection systems, environmental impact assessment, and sustainability metrics development. Ensuring our solution benefits both energy generation and the environment.",
    icon: "Target",
    color: color.light,
    images: [
      {
        src: "/timeline/sustainability.jpg",
        alt: "Environmental assessment",
        caption: "Leafs have aluminium frame that protects them",
        overlayText: "Sustainability",
        position: "left",
        offsetX: "20%",
        offsetY: "25%",
        parallaxSpeed: "slow",
        size: {
          width: "310px",
          height: "360px"
        }
      },
      {
        src: "/timeline/analysis.jpg",
        alt: "Tree projection systems",
        caption: "Advanced modeling",
        overlayText: "Pitch day",
        position: "right",
        offsetX: "-5%",
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
    year: "Q4 2024 - Q2 2025",
    title: "Strategic Investment Acquisition",
    description: "Successful securing of Czech Government backing through Czech Invest and private investor engagement. Critical funding milestone for prototype development and testing.",
    icon: "Handshake",
    color: color.light,
    images: [
      {
        src: "/timeline/investment.png",
        alt: "Government partnership",
        caption: "Czech Invest backing",
        overlayText: "Investment",
        position: "right",
        offsetX: "20%",
        offsetY: "20%",
        parallaxSpeed: "medium",
        size: {
          width: "340px",
          height: "390px"
        }
      },
      {
        src: "/timeline/funding.jpg",
        alt: "Investor engagement",
        caption: "Won 300k EUR from Czech Goverment",
        overlayText: "Funding",
        position: "left",
        offsetX: "3%",
        offsetY: "22%",
        parallaxSpeed: "fast",
        size: {
          width: "300px",
          height: "350px"
        }
      }
    ]
  },
  {
    year: "Q2 2025 - Q4 2025",
    title: "Government-Funded Prototype Testing",
    description: "Czech Invest funded comprehensive prototype validation, field testing, and performance optimization. Currently in progress - bringing our technology to life.",
    icon: "Sprout",
    color: color.light,
    images: [
      {
        src: "/timeline/prototype.jpg",
        alt: "Prototype testing",
        caption: "Field validation",
        overlayText: "Testing",
        position: "left",
        offsetX: "3%",
        offsetY: "0%",
        parallaxSpeed: "medium",
        size: {
          width: "350px",
          height: "400px"
        }
      },
      {
        src: "/timeline/team.jpg",
        alt: "Performance optimization",
        caption: "Team catching a quick break between pitches",
        overlayText: "Team",
        position: "right",
        offsetX: "4%",
        offsetY: "-25%",
        parallaxSpeed: "fast",
        size: {
          width: "320px",
          height: "370px"
        }
      }
    ]
  },
  {
    year: "Q3 2025 - Q1 2026",
    title: "Blockchain Integration & Capital Raise",
    description: "Decentralized fundraising platform launch, tokenomics implementation, and first renewable energy tree installation. Democratizing access to clean energy investment.",
    icon: "Layers",
    color: color.middle,
    images: [
      {
        src: "/timeline/government.jpeg",
        alt: "Blockchain platform",
        caption: "DeFi launch",
        overlayText: "Blockchain",
        position: "right",
        offsetX: "4%",
        offsetY: "20%",
        parallaxSpeed: "slow",
        size: {
          width: "340px",
          height: "390px"
        }
      },
      {
        src: "/timeline/artiffine.jpg",
        alt: "External Artiffine team - experts at Web3",
        caption: "First tree installation",
        overlayText: "Artffine",
        position: "left",
        offsetX: "3%",
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
    year: "Q1 2026 - Q4 2026",
    title: "Initial Network Deployment",
    description: "Strategic expansion across key European markets with initial infrastructure network establishment. Building the foundation for Europe's renewable energy forest.",
    icon: "Network",
    color: color.dark,
    images: [
      {
        src: "/timeline/vision.jpg",
        alt: "European expansion",
        caption: "Market deployment",
        overlayText: "Expansion",
        position: "left",
        offsetX: "3%",
        offsetY: "0%",
        parallaxSpeed: "medium",
        size: {
          width: "340px",
          height: "390px"
        }
      },
      {
        src: "/timeline/government.jpeg",
        alt: "Infrastructure network",
        caption: "Network establishment",
        overlayText: "Infrastructure",
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
  },
  {
    year: "Q4 2026 - Q3 2027",
    title: "Scaling to Forest Network",
    description: "Ambitious expansion to 100+ renewable energy trees, creating Europe's first blockchain-powered clean energy forest. Revolutionizing urban renewable infrastructure.",
    icon: "TreePine",
    color: color.dark,
    images: [
      {
        src: "/timeline/prototype.jpg",
        alt: "Forest network",
        caption: "100+ trees deployment",
        overlayText: "Forest",
        position: "right",
        offsetX: "2%",
        offsetY: "-20%",
        parallaxSpeed: "fast",
        size: {
          width: "350px",
          height: "400px"
        }
      },
      {
        src: "/timeline/vision.jpg",
        alt: "Clean energy impact",
        caption: "Clean energy revolution",
        overlayText: "Impact",
        position: "left",
        offsetX: "4%",
        offsetY: "28%",
        parallaxSpeed: "slow",
        size: {
          width: "320px",
          height: "370px"
        }
      }
    ]
  }
];