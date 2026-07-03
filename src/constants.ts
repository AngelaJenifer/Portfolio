import { Experience, Project, Education, Skill } from './types';

export const PERSONAL_DETAILS = {
  name: "Angela Jenifer Mary S",
  role: "Frontend Developer",
  email: "angelajenifer13@gmail.com",
  phone: "8608527213",
  address: "Ap-181, 10th Street, K.K.Nagar, Chennai 600078",
  linkedin: "https://www.linkedin.com/in/angela-jenifer-mary-b588a913b/",
  github: "https://github.com/AngelaJenifer",
  
  // TO USE YOUR OWN PHOTO:
  // Option 1: Place your photo (e.g. 'me.jpg') in the 'public' folder and set this to: "/me.jpg"
  // Option 2: Upload to a site like Imgur/LinkedIn and paste the "Direct Link" (starts with https://) here.
  profileImageLight: "/myphoto.jpeg",
  profileImageDark: "/myphoto.jpeg",
  about: "To obtain a challenging position as a Frontend Developer, where I can leverage my technical expertise in React.js and modern UI frameworks to deliver scalable, user-friendly applications, contribute to innovative products, and grow professionally in a dynamic environment.",
  tagline: "Building scalable, user-centric web experiences with React & Modern UI.",
  roleVariants: ["Frontend Developer", "React Specialist", "SaaS Builder"],
  stats: [
    { label: "Years Experience", value: "2+" },
    { label: "Projects Delivered", value: "3+" },
    { label: "Star Awards", value: "10+" },
  ]
};


export const EXPERIENCES: Experience[] = [
  {
    id: 1,
    role: "Frontend Developer",
    company: "DSAT Global Pvt Ltd",
    location: "Kilpauk",
    period: "December 2023 – Present",
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
    techStack: ["React", "TypeScript", "MUI", "Python", "MongoDB", "PWA"],
    description: "A comprehensive enterprise dashboard for managing dock operations — tenants, appointments, audit logs, and platform-wide usage analytics with real-time activity tracking.",
    image: "/DMS.png",
    details: {
      overview: "The Dock Management System (DMS) is a full-featured enterprise SaaS platform built for warehouse and logistics operators. It provides a unified dashboard to manage dock slots, tenant onboarding, appointment scheduling, gate operations, and compliance reporting — all in real time.",
      role: "Frontend Developer — sole frontend owner responsible for all UI modules from architecture to deployment.",
      teamSize: "5 (2 Frontend, 2 Backend, 1 DevOps)",
      duration: "Dec 2023 – Present",
      features: [
        "Tenant Management — onboard, configure, and monitor tenants with granular role-based permissions",
        "Appointment Scheduling — calendar-based dock slot booking with conflict detection",
        "Gate Management — real-time truck tracking from yard entry to dock completion",
        "Dock Operations — visual dock layout with live truck status (Waiting, Docking, Loading, Unloading, On Hold)",
        "Audit Log — tamper-proof event log for all platform actions with filters and export",
        "Platform Usage Dashboard — KPI tiles, bar charts, line charts for usage trends across tenants",
        "Recent Tenant Activity Feed — real-time scrollable activity stream",
        "Reports & Analytics — exportable reports for appointments, operations, and compliance",
        "Settings & Permissions — fine-grained module-level access control (View, Add, Edit, Delete, Export)",
        "Progressive Web App (PWA) — offline support and push notifications",
      ],
      highlights: [
        "Implemented PWA with service workers for offline-first experience",
        "Built reusable component library across 11 feature modules",
        "Integrated REST APIs with Python/FastAPI backend for real-time data sync",
        "Designed role-based access control system with per-module granular permissions",
        "Delivered production-ready CI/CD pipeline with Jenkins and Docker",
      ],
    }
  },
  {
    id: 2,
    title: "StarsIn-Football",
    techStack: ["React", "TypeScript", "Redux", "Vite", "Tailwind CSS", "i18n"],
    description: "A football talent scouting platform connecting athletes and aggregators. Features athlete KYC management, drill performance tracking, leaderboards, and a validator review workflow.",
    image: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&q=80&w=800",
    details: {
      overview: "StarsIn-Football is a sports-tech SaaS platform designed to discover and verify football talent. The platform has two portals — an Aggregator portal (for scouts and administrators) and an Athlete portal (for players). Scouts review athlete profiles, validate performance drills, manage KYC approvals, and maintain leaderboards for talent rankings.",
      role: "Frontend Developer — built and maintained the Aggregator portal, Athlete management, drill validation workflows, and leaderboard system.",
      teamSize: "4 (2 Frontend, 2 Backend)",
      duration: "Dec 2023 – Present",
      features: [
        "Aggregator Dashboard — summary view of athlete counts, pending KYC, drill submissions, and recent activity",
        "Athlete Management — full CRUD with profile photos, personal details, position, and status",
        "KYC Management Queue — review and approve/reject athlete identity documents with inline viewer",
        "Drill Management — browse, filter, and validate athlete performance drill submissions",
        "Validator Queue — separate role-based portal for validators to review and score drills",
        "Leaderboard — ranked athlete table with drill scores, positions, and performance metrics",
        "Role-Based Access — Admin vs Validator roles with route-level protection",
        "Multilingual Support — i18n locale management with language switcher",
        "Dark / Light Theme — theme toggled via Redux with persistent preference",
        "Athlete Portal — dedicated portal for athletes to view their profile, submit drills, and track scores",
      ],
      highlights: [
        "Architected role-based routing with lazy-loaded pages for optimal performance",
        "Built KYC document review workflow with multi-state approval pipeline",
        "Implemented Redux state management for auth, theme, and role-switching",
        "Integrated multi-language support with automated locale comparison tooling",
        "Deployed via GitLab CI/CD with Docker containerization",
      ],
    }
  },
  {
    id: 3,
    title: "Route Optimization System",
    techStack: ["React", "Python", "HERE Maps", "Leaflet", "Chart.js", "Bootstrap", "Styled Components"],
    description: "A logistics optimization platform that calculates optimal delivery routes, manages vehicle dispatch plans, handles speed and route restrictions, and visualizes routes on interactive maps.",
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800",
    details: {
      overview: "The Route Optimization System is a full-stack logistics platform that solves the Vehicle Routing Problem (VRP) for last-mile delivery operations. It takes customer orders, vehicle capacities, depot locations, and real-world route/speed restrictions to compute and display the most efficient delivery plans — cutting fuel costs and delivery times.",
      role: "Frontend Developer — built the complete React frontend including map views, dispatch planning, vehicle configuration, and restriction management.",
      teamSize: "3 (1 Frontend, 2 Backend/Algorithm)",
      duration: "Dec 2023 – Present",
      features: [
        "Interactive Map View — HERE Maps and Leaflet integration to visualize optimized routes with waypoints",
        "Dispatch Plan — auto-generated multi-vehicle dispatch plans with order assignments per route",
        "Order Management — create and manage delivery orders with pickup/drop locations",
        "Vehicle Configuration — define vehicle types, capacities, and availability windows",
        "Transporter Configuration — manage logistics providers and their vehicle fleets",
        "Speed Restriction Zones — define geographic zones with max speed overrides",
        "Route Restriction Management — block or restrict specific road segments by time or vehicle type",
        "Sub-Configuration — granular settings for solver parameters and optimization constraints",
        "Dashboard — KPI tiles for total orders, vehicles deployed, distance saved, and route efficiency",
        "Excel Export — generate logistics planning spreadsheets from solved route data",
      ],
      highlights: [
        "Integrated HERE Maps API for real-world road network routing and geocoding",
        "Built Python solver backend using VRP algorithms (matrix-based optimization)",
        "Implemented geospatial restriction zones drawn directly on the map",
        "Designed multi-role login (Admin, Customer, Driver) with separate flows",
        "Dockerized full stack with NGINX reverse proxy and Prometheus/Jaeger monitoring",
      ],
    }
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