export interface Experience {
  id: number;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  type: 'tech' | 'support';
}

export interface Project {
  id: number;
  title: string;
  techStack: string[];
  description: string;
  image?: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  details?: string;
}

export interface Skill {
  name: string;
  level: number; // 1-100
  category: 'Frontend' | 'Backend' | 'Tools' | 'Soft Skills';
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}