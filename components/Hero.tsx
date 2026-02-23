import React from 'react';
import { ArrowRight, Terminal, Cpu, Code2, Zap } from 'lucide-react';
import { NavigationSection } from '../types';

interface HeroProps {
  scrollToSection: (section: NavigationSection) => void;
}

export const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
  // Configured with v9 API which is reliable for SVG avatars

  const avatarUrl = "/Dinesh_avatar.webp";
  return (
    <section id={NavigationSection.HOME} className="relative min-h-screen flex items-center pt-20 overflow-hidden">

      {/* Background Watermark Text "OUTER SPACE" style */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0 mix-blend-overlay">
        <h1 className="text-[15vw] font-black text-white/5 tracking-tighter leading-none whitespace-nowrap blur-sm">
          NeshVerse
        </h1>
      </div>

      {/* Liquid Background Blobs - Gold/Orange Theme */}
      <div className="absolute top-20 right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full mix-blend-screen filter blur-[80px] animate-blob"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-secondary/10 rounded-full mix-blend-screen filter blur-[80px] animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 relative">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">

          {/* Left Content */}
          <div className="w-full lg:w-3/5 text-center lg:text-left pt-8 lg:pt-0">

            {/* Terminal-style Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-black/40 border border-white/10 text-primary text-xs font-mono mb-8 shadow-lg hover:border-primary/50 transition-colors cursor-default group backdrop-blur-md">
              <Terminal size={14} className="mr-2 group-hover:animate-pulse" />
              <span className="mr-2 text-gray-400">user@dinesh:~$</span>
              <span className="text-white">./init_portfolio.sh</span>
              <span className="ml-2 w-2 h-4 bg-primary/50 animate-pulse block"></span>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-white mb-6 leading-[1.1] drop-shadow-2xl">
              Architecting <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-primary to-purple-500 animate-gradient-x filter drop-shadow-lg">
                Intelligence
              </span>
            </h1>

            <h2 className="text-xl sm:text-2xl text-gray-200 mb-8 font-light font-mono flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <span className="bg-black/40 px-3 py-1 rounded border border-white/10 backdrop-blur-md">GenAI Expert</span>
              <span className="hidden sm:inline text-primary/50">//</span>
              <span className="bg-black/40 px-3 py-1 rounded border border-white/10 backdrop-blur-md">Full Stack ML</span>
            </h2>

            <p className="text-gray-200 text-lg mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light drop-shadow-md">
              I bridge the gap between <b className="text-white">Complex Data</b> and <b className="text-white">Business Value</b>.
              Specializing in <span className="text-primary font-medium">LLM Agents</span>, <span className="text-secondary font-medium">RAG Systems</span>, and <span className="text-accent font-medium">Enterprise Data Pipelines</span>.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => scrollToSection(NavigationSection.PROJECTS)}
                className="group px-8 py-4 rounded-xl bg-primary text-white font-extrabold transition-all shadow-[0_0_20px_rgba(251,191,36,0.5)] hover:shadow-[0_0_40px_rgba(251,191,36,0.7)] flex items-center hover:scale-105 border border-white/10"
              >
                View My Work
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollToSection(NavigationSection.CONTACT)}
                className="px-8 py-4 rounded-xl relative overflow-hidden group bg-transparent border border-white/20 hover:border-white/50 transition-all font-mono text-white flex items-center shadow-lg hover:shadow-cyan-500/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">&lt;Hire Me /&gt;</span>
              </button>
            </div>

            {/* Tech Stack Ticker */}
            <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-4 opacity-80">
              {['PyTorch', 'TensorFlow', 'LangChain', 'AWS', 'React', 'Docker'].map((tech) => (
                <span key={tech} className="text-sm font-mono text-gray-400 flex items-center gap-2 hover:text-primary transition-colors cursor-default">
                  <Zap size={12} className="text-accent" /> {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right Visual - Coding Theme Avatar */}
          <div className="w-full lg:w-2/5 flex justify-center relative perspective-1000">
            <div className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px]">

              {/* Liquid Morphing Blob behind */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-secondary/40 rounded-full blur-[60px] animate-liquid opacity-60"></div>

              {/* Main Card Container */}
              <div className="relative w-full h-full animate-float transition-all duration-500 hover:scale-[1.02]">

                {/* Glass Terminal Card */}
                <div className="w-full h-full rounded-[2rem] border border-white/10 bg-black/80 backdrop-blur-xl overflow-hidden shadow-2xl relative flex flex-col">

                  {/* Terminal Header */}
                  <div className="h-10 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    <div className="ml-auto text-[10px] font-mono text-gray-500 opacity-70">zsh — dinesh@portfolio</div>
                  </div>

                  {/* Content Area */}
                  <div className="flex-1 relative overflow-hidden p-6 flex items-center justify-center">
                    {/* Grid Overlay */}
                    <div className="absolute inset-0 opacity-10"
                      style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                    </div>

                    {/* Avatar Image */}
                    <div className="relative z-10 w-64 h-64">
                      <img
                        src={avatarUrl}
                        alt="Dinesh Avatar"
                        className="w-full h-full object-cover transform drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Floating Code Snippets Cards */}
                    <div className="absolute top-16 right-4 p-3 bg-surface/90 rounded-lg border border-white/10 backdrop-blur-md shadow-xl animate-pulse-slow">
                      <Code2 size={20} className="text-primary mb-1" />
                      <div className="h-1.5 w-12 bg-gray-700 rounded-full mb-1"></div>
                      <div className="h-1.5 w-8 bg-gray-700 rounded-full"></div>
                    </div>

                    <div className="absolute bottom-16 left-4 p-3 bg-surface/90 rounded-lg border border-white/10 backdrop-blur-md shadow-xl animate-pulse-slow animation-delay-1000">
                      <Cpu size={20} className="text-secondary mb-1" />
                      <div className="h-1.5 w-10 bg-gray-700 rounded-full mb-1"></div>
                      <div className="h-1.5 w-14 bg-gray-700 rounded-full"></div>
                    </div>

                  </div>

                  {/* Bottom Status Bar */}
                  <div className="h-8 bg-primary/10 border-t border-white/5 flex items-center px-4 justify-between">
                    <span className="text-[10px] font-mono text-primary flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                      SYSTEM ONLINE
                    </span>
                    <span className="text-[10px] font-mono text-gray-500">V2.5.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};