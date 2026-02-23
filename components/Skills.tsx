import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { NavigationSection, SkillData } from '../types';
import { Code, Database, Cloud, Terminal, Brain, Layout } from 'lucide-react';

const data: SkillData[] = [
  { subject: 'Gen AI', A: 98, fullMark: 100 },
  { subject: 'ML/DL', A: 92, fullMark: 100 },
  { subject: 'Data Eng', A: 88, fullMark: 100 },
  { subject: 'Cloud', A: 80, fullMark: 100 },
  { subject: 'Frontend', A: 75, fullMark: 100 },
  { subject: 'DevOps', A: 85, fullMark: 100 },
];

const skillCategories = [
  {
    icon: <Brain size={24} className="text-purple-400" />,
    title: "AI & Machine Learning",
    skills: ["Generative AI", "LLMs (LLaMA-3, GPT)", "LangChain", "TensorFlow", "PyTorch", "RAG Pipelines", "Computer Vision"]
  },
  {
    icon: <Database size={24} className="text-blue-400" />,
    title: "Data Engineering",
    skills: ["ETL Pipelines", "SQL / PostgreSQL", "PySpark", "Hadoop", "Vector Databases", "Data Warehousing"]
  },
  {
    icon: <Cloud size={24} className="text-sky-400" />,
    title: "Cloud & DevOps",
    skills: ["AWS Services", "Docker", "Kubernetes", "CI/CD (Jenkins)", "Grafana", "Linux Administration"]
  },
  {
    icon: <Layout size={24} className="text-pink-400" />,
    title: "Web & Analytics",
    skills: ["React", "Node.js", "Python (Flask/FastAPI)", "Power BI", "Tableau", "Streamlit"]
  }
];

export const Skills: React.FC = () => {
  return (
    <section id={NavigationSection.SKILLS} className="py-24 bg-gradient-to-b from-transparent to-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Chart Section */}
          <div className="bg-white/5 p-4 rounded-3xl border border-white/10 backdrop-blur-sm relative">
             <div className="absolute -top-4 -left-4 bg-primary px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider">
                Skill Balance
             </div>
             <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                    <PolarGrid stroke="#333" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                      name="Skill Level"
                      dataKey="A"
                      stroke="#6366f1"
                      strokeWidth={3}
                      fill="#6366f1"
                      fillOpacity={0.4}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
                      itemStyle={{ color: '#818cf8' }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
             </div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {skillCategories.map((cat, idx) => (
               <div key={idx} className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-primary/50 transition-colors group">
                 <div className="mb-4 p-3 bg-white/5 w-fit rounded-xl group-hover:bg-white/10 transition-colors">
                   {cat.icon}
                 </div>
                 <h3 className="text-xl font-bold text-white mb-4">{cat.title}</h3>
                 <div className="flex flex-wrap gap-2">
                   {cat.skills.map((skill, sIdx) => (
                     <span key={sIdx} className="px-3 py-1 rounded-full bg-black/40 border border-white/10 text-gray-400 text-xs font-medium">
                       {skill}
                     </span>
                   ))}
                 </div>
               </div>
             ))}
          </div>

        </div>
      </div>
    </section>
  );
};