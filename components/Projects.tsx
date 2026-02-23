import React from 'react';
import { ExternalLink, Github, ArrowRight, Code } from 'lucide-react';
import { NavigationSection, Project } from '../types';

const projects: Project[] = [
  {
    id: '0', // Featured / Newest
    title: 'MiCorpTrd Client Site',
    description: 'A professional corporate website built for a trading client, featuring modern UI, responsive design, and performance optimization.',
    technologies: ['React', 'Tailwind', 'Vite', 'Responsive Design'],
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    link: 'https://micorptrd.com/',
    githubUrl: 'https://github.com/neshverse'
  },
  {
    id: '1',
    title: 'Medical GenAI Chatbot',
    description: 'Developed a RAG-based medical assistant using LLaMA-3 to analyze symptoms and provide preliminary diagnosis support with high accuracy.',
    technologies: ['LLaMA-3', 'LangChain', 'RAG', 'Vector DB'],
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    link: '#',
    githubUrl: 'https://github.com/neshverse'
  },
  {
    id: '2',
    title: 'Image Captioning System',
    description: 'Engineered an end-to-end deep learning model combining CNNs for feature extraction and LSTMs for natural language description generation.',
    technologies: ['TensorFlow', 'CNN', 'LSTM', 'Python'],
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800',
    link: '#',
    githubUrl: 'https://github.com/neshverse'
  },
  {
    id: '3',
    title: 'Enterprise ERP Dashboard',
    description: 'Built a comprehensive analytics dashboard integrating with legacy ERPs to visualize 1M+ operational data points in real-time.',
    technologies: ['Grafana', 'SQL', 'ETL Pipelines', 'PowerBI'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    link: '#',
    githubUrl: 'https://github.com/neshverse'
  },
  {
    id: '4',
    title: 'DITA XML Extractor',
    description: 'Automated content auditing tool using LLMs to extract and validate DITA XML structures, achieving 100% SLA compliance at Dell.',
    technologies: ['LLMs', 'XML', 'Python', 'Automation'],
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
    link: '#',
    githubUrl: 'https://github.com/neshverse'
  },
];

export const Projects: React.FC = () => {
  return (
    <section id={NavigationSection.PROJECTS} className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div>
            <span className="font-mono text-primary text-sm mb-2 block tracking-widest uppercase">&gt; git log --oneline</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Featured Projects</h2>
            <p className="text-gray-400 text-lg">A selection of my work in Generative AI and Data Engineering.</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
            <Github size={18} className="group-hover:text-white transition-colors" />
            <span>View GitHub Profile</span>
            <ArrowRight size={18} className="text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group bg-card/80 rounded-2xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] flex flex-col backdrop-blur-sm">
              <div className="relative h-64 overflow-hidden">
                <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-mono text-white flex items-center gap-1">
                  <Code size={12} className="text-accent" /> Source
                </div>
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map(tech => (
                      <span key={tech} className="px-2 py-1 rounded bg-white/10 text-xs text-gray-200 backdrop-blur-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col bg-surface/50">
                <p className="text-gray-400 text-sm mb-6 flex-1 leading-relaxed border-b border-white/5 pb-6">{project.description}</p>

                <div className="flex items-center gap-4">
                  <a href={project.link} target="_blank" rel="noreferrer" className="text-primary text-sm font-bold flex items-center gap-2 hover:text-white transition-colors">
                    View Project <ArrowRight size={16} />
                  </a>
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="bg-white/5 p-2 rounded-full hover:bg-white/20 transition-colors text-white">
                      <Github size={18} />
                    </a>
                  )}
                </div>
                <ExternalLink size={18} className="text-gray-600 hover:text-white transition-colors cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section >
  );
};