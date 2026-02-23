import React, { useState, useEffect } from 'react';
import { NavigationSection } from '../types';
import { Laptop } from 'lucide-react';
import AvatarInline from './AvatarInline';

interface CompanionProps {
  activeSection: string;
  scrollToSection: (section: NavigationSection) => void;
}

export const Companion: React.FC<CompanionProps> = ({ activeSection, scrollToSection }) => {
  const [message, setMessage] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [positionClass, setPositionClass] = useState('bottom-8 right-8');
  const [avatarUrl, setAvatarUrl] = useState('');

  // Base configuration - Matches Hero exactly
  const baseConfig = {
    seed: "DineshTech",
    top: "shortQuiff",
    topColor: "2c1b18",
    facialHair: "beardMedium",
    facialHairColor: "2c1b18",
    accessories: "kurt",
    accessoriesColor: "262e33",
    clothing: "shirtCrewNeck",
    clothingColor: "e6e6e6",
    skinColor: "ffdbb4",
  };

  useEffect(() => {
    // 1. Position Logic - Responsive adjustments for different screen sizes
    // Uses tighter margins on medium screens (md) to prevent overlapping content
    // Uses wider margins on large screens (lg/xl) for better aesthetics
    const positions: Record<string, string> = {
      [NavigationSection.HOME]: 'bottom-4 right-4 md:bottom-8 md:right-8 lg:bottom-12 lg:right-12',

      // Adjusted top positions to clear the Navbar (approx 80px/5rem)
      [NavigationSection.EXPERIENCE]: 'top-28 right-4 md:top-32 md:right-8 lg:top-32 lg:right-12',

      [NavigationSection.SKILLS]: 'bottom-4 left-4 md:bottom-8 md:left-8 lg:bottom-12 lg:left-12',

      [NavigationSection.PROJECTS]: 'top-28 left-4 md:top-36 md:left-8 lg:top-40 lg:left-12',

      // Lifted slightly to avoid chat input if expanded
      [NavigationSection.CHAT]: 'bottom-20 right-4 md:bottom-24 md:right-8 lg:bottom-24 lg:right-12',

      [NavigationSection.CONTACT]: 'top-28 right-4 md:top-36 md:right-8 lg:top-40 lg:right-12',
    };
    setPositionClass(positions[activeSection] || 'bottom-8 right-8');

    // 2. Message Logic
    let msg = "";
    switch (activeSection) {
      case NavigationSection.HOME: msg = "Hi! I'm Dinesh. Welcome to my digital workspace!"; break;
      case NavigationSection.EXPERIENCE: msg = "From Dell to UAC, I've solved enterprise problems."; break;
      case NavigationSection.SKILLS: msg = "I can code Python, SQL, and Transformer models fluently."; break;
      case NavigationSection.PROJECTS: msg = "Look at what I've built! These are my pride and joy."; break;
      case NavigationSection.CHAT: msg = "I'm right here! Ask me anything about my code."; break;
      case NavigationSection.CONTACT: msg = "Ready to build something amazing? Let's talk."; break;
      default: msg = "I'm your guide!";
    }
    setMessage(msg);

    // 3. Dynamic Face Design (Expression) Logic
    let expressionConfig = { eyes: "happy", mouth: "smile", eyebrows: "default" };

    switch (activeSection) {
      case NavigationSection.HOME:
        expressionConfig = { eyes: "happy", mouth: "smile", eyebrows: "default" };
        break;
      case NavigationSection.EXPERIENCE:
        expressionConfig = { eyes: "default", mouth: "serious", eyebrows: "up" };
        break;
      case NavigationSection.SKILLS:
        expressionConfig = { eyes: "surprised", mouth: "smile", eyebrows: "raised" };
        break;
      case NavigationSection.PROJECTS:
        expressionConfig = { eyes: "wink", mouth: "smile", eyebrows: "default" };
        break;
      case NavigationSection.CHAT:
        expressionConfig = { eyes: "happy", mouth: "twinkle", eyebrows: "default" };
        break;
      case NavigationSection.CONTACT:
        expressionConfig = { eyes: "happy", mouth: "smile", eyebrows: "raised" };
        break;
    }

    // Use a minimal seed-only DiceBear avatar URL for reliability.
    // You can expand to style params later, but those keys must match DiceBear's API.
    const seed = baseConfig.seed || 'DineshTech';
    setAvatarUrl(`https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(seed)}`);

  }, [activeSection]);

  return (
    <div
      className={`fixed z-50 flex flex-col items-center pointer-events-none md:pointer-events-auto transition-all duration-1000 ease-in-out ${positionClass} flex`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      {/* Speech Bubble */}
      <div
        className={`mb-3 relative max-w-[200px] md:max-w-[220px] bg-surface/90 backdrop-blur-xl border border-white/20 p-3 md:p-4 rounded-2xl rounded-bl-none text-xs md:text-sm text-white shadow-2xl transition-all duration-500 transform ${isHovered || activeSection ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
          }`}
      >
        <p className="leading-tight font-medium text-gray-200">{message}</p>
        <div className="absolute -bottom-2 left-4 w-4 h-4 bg-surface/90 border-r border-b border-white/20 transform rotate-45 backdrop-blur-xl"></div>
      </div>

      {/* Avatar Container - Responsive Sizing */}
      <div
        onClick={() => scrollToSection(NavigationSection.CHAT)}
        className="relative group cursor-pointer pointer-events-auto"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-full blur-xl opacity-50 group-hover:opacity-100 animate-pulse transition-opacity duration-500"></div>

        {/* Adaptive Size: w-20/h-20 on Medium, w-24/h-24 on Large */}
        <div className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-full border-4 border-surface overflow-hidden bg-black backdrop-blur-md shadow-2xl transform transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
          <AvatarInline className="w-full h-full" variant={activeSection === NavigationSection.PROJECTS ? 'wink' : 'smile'} />
        </div>

        <div className="absolute -bottom-1 -right-1 bg-surface p-1.5 rounded-full border border-white/10 shadow-lg animate-bounce">
          <Laptop size={14} className="text-primary" />
        </div>

        <div className="absolute top-1 right-1 w-3 h-3 bg-green-500 rounded-full border border-white/50 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
      </div>
    </div>
  );
};