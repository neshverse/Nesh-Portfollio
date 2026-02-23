import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { AIChat } from './components/AIChat';
import { Contact } from './components/Contact';
import { Companion } from './components/Companion';
import { NavigationSection } from './types';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>(NavigationSection.HOME);

  const scrollToSection = (section: NavigationSection) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(section);
    }
  };

  // Intersection Observer to update active section on scroll
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2 } // Adjusted threshold for better detection
    );

    Object.values(NavigationSection).forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen text-white selection:bg-primary selection:text-white">
      <Navigation activeSection={activeSection} scrollToSection={scrollToSection} />
      <Companion activeSection={activeSection} scrollToSection={scrollToSection} />
      
      <main className="relative z-10">
        <Hero scrollToSection={scrollToSection} />
        <Experience />
        <Skills />
        <Projects />
        <AIChat />
        <Contact />
      </main>
    </div>
  );
};

export default App;