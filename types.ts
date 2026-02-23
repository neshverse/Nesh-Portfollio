export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  link: string;
  githubUrl?: string; // Optional GitHub link
}

export interface SkillData {
  subject: string;
  A: number;
  fullMark: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum NavigationSection {
  HOME = 'home',
  ABOUT = 'about',
  EXPERIENCE = 'experience',
  SKILLS = 'skills',
  PROJECTS = 'projects',
  CHAT = 'chat',
  CONTACT = 'contact'
}