import { Experience, Project, Education, Skill } from './types';

export const PERSONAL_DETAILS = {
  name: "Angela Jenifer Mary S",
  role: "Frontend Developer",
  email: "angelajenifer13@gmail.com",
  phone: "8608527213",
  address: "Ap-181, 10th Street, K.K.Nagar, Chennai 600078",
  
  // TO USE YOUR OWN PHOTO:
  // Option 1: Place your photo (e.g. 'me.jpg') in the 'public' folder and set this to: "/me.jpg"
  // Option 2: Upload to a site like Imgur/LinkedIn and paste the "Direct Link" (starts with https://) here.
  profileImageLight: "/whitebgphoto.png",
  profileImageDark: "/photo.png",
  about: "To obtain a challenging position as a Frontend Developer, where I can leverage my technical expertise in React.js and modern UI frameworks to deliver scalable, user-friendly applications, contribute to innovative products, and grow professionally in a dynamic environment.",
  tagline: "Building scalable, user-centric web experiences with React & Modern UI."
};

export const EXPERIENCES: Experience[] = [
  {
    id: 1,
    role: "Frontend Developer",
    company: "DSAT Global Pvt Ltd",
    location: "Kilpauk",
    period: "April 2023 – Present",
    type: 'tech',
    description: [
      "Developing and maintaining user interfaces for DMS (Dock Management System) with modules like Tenant Management, Audit Log, Platform-wide Usage, Appointments by Day, and Recent Tenant Activity dashboards.",
      "Built scalable frontends for Fleet and Route Optimization Systems using React.js, Material UI, and Recharts.",
      "Implemented Progressive Web App (PWA) features including offline support and push notifications.",
      "Designed reusable UI structures using React Router, Context API, and Styled Components.",
      "Integrated RESTful APIs and collaborated with backend teams (Python, MongoDB) for data consistency and performance."
    ]
  },
  {
    id: 2,
    role: "Customer Care Associate",
    company: "Teleperformance Pvt Ltd",
    location: "Ambit IT Park",
    period: "Oct 2021 – Jan 2023",
    type: 'support',
    description: [
      "Provided customer support, maintained service quality, and ensured client satisfaction through timely resolutions."
    ]
  },
  {
    id: 3,
    role: "Customer Support Representative",
    company: "Zealous Services",
    location: "Kodambakkam",
    period: "Feb 2018 – Apr 2020",
    type: 'support',
    description: [
      "Delivered customer support and maintained high-quality service standards in a fast-paced environment.",
      "Star Performer Award (10+ times)."
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Dock Management System",
    techStack: ["React", "MUI", "Python"],
    description: "A comprehensive dashboard for managing tenants, audit logs, and platform usage analytics. Features complex data visualization and real-time activity tracking.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Fleet Management System",
    techStack: ["React", "MUI"],
    description: "An optimization tool for fleet operations. Integrated interactive charts to visualize route efficiency and vehicle status.",
    image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Route Optimization System",
    techStack: ["React", "Node.js"],
    description: "A logic-driven application to calculate and display optimal routes, reducing operational costs and improving delivery times.",
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800"
  }
];

export const EDUCATION: Education[] = [
  {
    degree: "B.E. Electronics and Communication Engineering",
    institution: "Hindusthan Institute of Technology",
    period: "2013 - 2017",
    details: ""
  },
  {
    degree: "Certifications",
    institution: "SLA Institute & IBM",
    period: "Various",
    details: "Certified in IBM JavaScript Training. Completed PHP, MySQL, React.js Course at SLA Institute."
  }
];

export const SKILLS: Skill[] = [
  { name: "React.js", level: 90, category: "Frontend" },
  { name: "JavaScript (ES6+)", level: 85, category: "Frontend" },
  { name: "Material UI", level: 85, category: "Frontend" },
  { name: "Context API", level: 80, category: "Frontend" },
  { name: "Styled Components", level: 75, category: "Frontend" },
  { name: "Recharts", level: 70, category: "Frontend" },
  { name: "PWA", level: 65, category: "Frontend" },
  { name: "Node.js", level: 50, category: "Backend" },
  { name: "PHP & MySQL", level: 60, category: "Backend" },
  { name: "Customer Support", level: 95, category: "Soft Skills" }
];