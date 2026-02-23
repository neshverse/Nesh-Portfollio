import React, { useState, useEffect } from 'react';
import { Menu, X, Code, Terminal, Sparkles } from 'lucide-react';
import { NavigationSection } from '../types';

interface NavigationProps {
  activeSection: string;
  scrollToSection: (section: NavigationSection) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeSection, scrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: NavigationSection.EXPERIENCE, label: 'Experience' },
    { id: NavigationSection.SKILLS, label: 'Stack' },
    { id: NavigationSection.PROJECTS, label: 'Work' },
    { id: NavigationSection.CHAT, label: 'Ask AI' },
  ];

  return (
    <>
      {/* Floating Pill Navigation - Desktop */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block transition-all duration-300">
        <div className={`
          flex items-center gap-1 p-1.5 pl-4 rounded-full border transition-all duration-300
          ${scrolled
            ? 'bg-black/60 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            : 'bg-white/5 backdrop-blur-md border-white/5 shadow-lg'
          }
        `}>
          {/* Logo Area */}
          <div
            onClick={() => scrollToSection(NavigationSection.HOME)}
            className="flex items-center gap-2 mr-6 cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center shadow-inner group relative overflow-hidden">
              <span className="relative z-10 text-xs font-bold text-white">DK</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`
                    px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 relative
                    ${activeSection === item.id
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                  }
                  `}
              >
                {activeSection === item.id && (
                  <span className="absolute inset-0 bg-white/10 rounded-full -z-10 animate-fade-in"></span>
                )}
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="ml-2 pl-2 border-l border-white/10 flex items-center gap-2">
            <a
              href="/Dinesh_resume.pdf" // Placeholder path for resume
              download
              className="px-6 py-2.5 rounded-full text-sm font-bold bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center gap-2"
            >
              Resume
            </a>
            <button
              onClick={() => scrollToSection(NavigationSection.CONTACT)}
              className="px-6 py-2.5 rounded-full text-sm font-bold bg-white text-black hover:bg-gray-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] flex items-center gap-2"
            >
              Hire Me
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className={`md:hidden fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}>
        <div className="px-4 py-3 flex justify-between items-center">
          <span className="text-white font-bold text-lg flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary"></div>
            Dinesh K.
          </span>
          <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2 bg-white/5 rounded-full backdrop-blur-sm">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                scrollToSection(item.id);
                setIsOpen(false);
              }}
              className="text-2xl font-light text-gray-300 hover:text-white hover:scale-110 transition-all"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              scrollToSection(NavigationSection.CONTACT);
              setIsOpen(false);
            }}
            className="px-8 py-3 bg-white text-black rounded-full font-bold text-lg mt-8"
          >
            Hire Me
          </button>

          <a
            href="/Dinesh_resume.pdf"
            download
            className="px-8 py-3 bg-white/10 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-colors"
          >
            Resume
          </a>

          <button
            onClick={() => setIsOpen(false)}
            className="absolute bottom-10 text-gray-500 hover:text-white"
          >
            Close Menu
          </button>
        </div>
      )}
    </>
  );
};