import React, { useEffect, useRef, useState } from 'react';
import { Briefcase, Calendar, Terminal, ChevronRight } from 'lucide-react';
import { NavigationSection } from '../types';

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  type: 'Work' | 'Internship';
  description: string[];
  tags: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: '1',
    role: 'E-commerce Operation Manager',
    company: 'UAC S.A.R.L (Kinshasa)',
    period: 'Feb 2025 – Present',
    type: 'Work',
    description: [
      'Architecting backend data pipelines to integrate legacy ERP systems with modern web frontends.',
      'Deploying real-time Grafana dashboards for executive operational oversight.',
      'Developing client-facing PWA portals for offline order processing.'
    ],
    tags: ['Data Engineering', 'ERP', 'Grafana', 'PWA']
  },
  {
    id: '2',
    role: 'Analyst (DevOps & AI Core)',
    company: 'Dell India R&D Centre',
    period: 'Mar 2022 – Feb 2025',
    type: 'Work',
    description: [
      'Engineered Power BI insights leading to a 30% reduction in defect turnaround time.',
      'Implemented LLM-based DITA extractors achieving 100% SLA in content audits.',
      'Managed end-to-end defect lifecycles via Jira and ServiceNow.'
    ],
    tags: ['PowerBI', 'LLMs', 'DevOps', 'ServiceNow']
  },
  {
    id: '3',
    role: 'Technical Editor',
    company: 'SPS Pvt Ltd (Chennai)',
    period: 'Mar 2021 - Dec 2021',
    type: 'Work',
    description: [
      'Validated XML code structure and content integrity with 100% SLA compliance.',
      'Streamlined document review processes through automation scripts.'
    ],
    tags: ['XML', 'QA', 'Automation']
  },
  {
    id: '4',
    role: 'Transaction Process Associate',
    company: 'Accenture Services Pvt Ltd',
    period: 'Oct 2017 - Aug 2018',
    type: 'Work',
    description: [
      'Managed high-volume enrollment processing with 100% accuracy.',
      'Optimized data verification workflows for healthcare insurance processes.'
    ],
    tags: ['Process Ops', 'Data Accuracy']
  },
  {
    id: '5',
    role: 'Gen AI & NLP Intern',
    company: 'MSME-TDC PPDC',
    period: 'July 2024 – Feb 2025',
    type: 'Internship',
    description: [
      'Built Medical Chatbots using LLaMA-3 and RAG architectures.',
      'Developed End-to-End Image Captioning systems (CNN + LSTM).',
      'Implemented spam detectors and sentiment analysis tools.'
    ],
    tags: ['RAG', 'LLaMA-3', 'NLP']
  },
  {
    id: '6',
    role: 'Full Stack ML Intern',
    company: 'MSME-TDC PPDC (Agra)',
    period: 'July 2024',
    type: 'Internship',
    description: [
      'Deployed ML models (Churn Prediction, Loan Eligibility) using Flask/Streamlit.',
      'Integrated ML backends with React frontends for interactive demos.'
    ],
    tags: ['Flask', 'Streamlit', 'Full Stack ML']
  }
];

export const Experience: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setVisibleItems((prev) => {
              const newSet = new Set(prev);
              newSet.add(index);
              return newSet;
            });
            // Stop observing once visible so it doesn't toggle back
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15, // Trigger when 15% visible
        rootMargin: '0px 0px -50px 0px' // Offset bottom slightly to trigger animation earlier
      }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id={NavigationSection.EXPERIENCE} className="py-24 relative overflow-hidden">
      {/* Background Code Decor */}
      <div className="absolute top-40 right-10 font-mono text-9xl text-white/[0.02] pointer-events-none select-none z-0">
        &lt;EXP /&gt;
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16 text-center">
          <span className="font-mono text-primary text-sm mb-2 block tracking-widest uppercase">&gt; career_history.json</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Professional Timeline</h2>
        </div>

        <div className="relative">
          {/* Central Line - Hidden on mobile, visible on desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-secondary/50 to-primary/50 -translate-x-1/2"></div>
          
          {/* Mobile Line */}
          <div className="md:hidden absolute left-4 top-0 bottom-0 w-0.5 bg-white/10"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div 
                key={exp.id} 
                ref={(el) => { itemRefs.current[index] = el; }}
                data-index={index}
                className={`relative flex flex-col md:flex-row items-center justify-between ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} 
                  transition-all duration-700 ease-out transform
                  ${visibleItems.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
                `}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                
                {/* Timeline Dot */}
                <div className={`absolute left-4 md:left-1/2 w-4 h-4 rounded-full border-2 z-20 bg-black -translate-x-1/2 mt-6 md:mt-0 
                   ${exp.type === 'Work' ? 'border-primary shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'border-accent shadow-[0_0_10px_rgba(45,212,191,0.5)]'}`}>
                </div>

                {/* Left Side (Empty on one side for alternation) / Date on Desktop */}
                <div className="w-full md:w-5/12 pl-12 md:pl-0 flex md:justify-center items-center mb-2 md:mb-0">
                  <div className={`inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 font-mono text-sm hover:bg-white/10 transition-colors md:hidden`}>
                     <Calendar size={14} className="mr-2 text-secondary" />
                     {exp.period}
                  </div>
                  <div className={`hidden md:flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'} w-full`}>
                     <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 font-mono text-sm hover:bg-white/10 transition-colors">
                       <Calendar size={14} className="mr-2 text-secondary" />
                       {exp.period}
                     </div>
                  </div>
                </div>

                {/* Right Side / Content Card */}
                <div className="w-full md:w-5/12 pl-12 md:pl-0">
                   <div className="group bg-surface/50 border border-white/10 hover:border-primary/50 p-6 rounded-2xl backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex flex-col">
                          <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{exp.role}</h3>
                          <span className={`text-xs font-mono px-2 py-0.5 rounded w-fit mt-1 ${exp.type === 'Work' ? 'bg-primary/20 text-primary' : 'bg-accent/20 text-accent'}`}>
                            {exp.type}
                          </span>
                        </div>
                        <Terminal size={18} className="text-gray-600 group-hover:text-white transition-colors" />
                      </div>
                      <h4 className="text-gray-300 font-medium mb-4 flex items-center gap-2">
                        <Briefcase size={14} className="text-gray-500" /> {exp.company}
                      </h4>
                      
                      <ul className="space-y-3 mb-6">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex items-start text-gray-400 text-sm leading-relaxed">
                             <ChevronRight size={14} className="mt-1 mr-2 text-primary/70 flex-shrink-0" />
                             {item}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                        {exp.tags.map(tag => (
                          <span key={tag} className="px-2.5 py-1 rounded bg-black/40 text-xs text-gray-400 font-mono border border-white/10 hover:border-white/30 transition-colors">
                            {tag}
                          </span>
                        ))}
                      </div>
                   </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};