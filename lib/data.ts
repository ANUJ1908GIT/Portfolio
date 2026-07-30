// ─── ANUJ AGRAWAL - Portfolio Data ───────────────────────────────────────────

export const siteConfig = {
  name: "Anuj Agrawal",
  initials: "AA",
  url: "https://your-deployed-domain.com", // TODO: replace with your real deployed URL
  role: "Designer & Developer",           // ← was "Student & Graphics Designer"
  email: "agrawalanuj669@gmail.com",
  phone: "+91 8923054059",
  location: "Lucknow, Uttar Pradesh",
  github: "https://github.com/ANUJ1908GIT",
  linkedin: "https://www.linkedin.com/in/anuj-agrawal-68916927a",
  twitter: "https://twitter.com/anujagrawal",
  tagline: "I design experiences that communicate, inspire, and solve real problems.",
  bio: [
  "I'm a Computer Science student at IET Lucknow with a strong academic foundation and a genuine passion for design, engineering, and solving real-world problems.I spend a lot of my time sharpening my problem-solving skills through Data Structures & Algorithms and competitive programming, it's where I've built the analytical thinking I bring to every project I work on.",
  "My work sits at the intersection of visual design and technology. I enjoy building interfaces that are as functional as they are considered, and I'm driven by a constant curiosity to learn, create, and improve. Whether it's untangling a tricky algorithm or refining a pixel-perfect layout, I care about the same thing: building things that actually work, and work well.",
],
};

export const roles = [
  "Graphics Designer",
  "Web Developer",
  "Problem Solver",
  "Creative Thinker",
];

export const stats = [
  { value: 87,   label: "NEC 2025 Rank (of 4000+)", suffix: "" },
  { value: 1593, label: "CodeChef Max Rating",       suffix: "" },
  { value: 8,    label: "CGPA at IET Lucknow",       suffix: ".57" },
  { value: 3,    label: "Live Projects Shipped",      suffix: "+" }, // ← was "5+ Skills & counting"
];

export const education = [
  {
    year: "2024  Present",
    title: "B.Tech, Computer Science & Engineering",
    org: "Institute of Engineering and Technology, Lucknow",
    grades: [
      { label: "1st Yr", value: "8.57" },
      { label: "2nd Yr", value: "8.59" },
    ],
  },
  {
    year: "2022 - 2023",
    title: "Senior Secondary (12th)",
    org: "Vrindavan Public School, Vrindavan",
    grades: [{ label: "Score", value: "93.60", suffix: "%" }],
  },
  {
    year: "2020 - 2021",
    title: "Secondary (10th)",
    org: "Vrindavan Public School, Vrindavan",
    grades: [{ label: "Score", value: "98.60", suffix: "%" }],
  },
];

export const timeline = [
  {
    year: "2024 - Present",
    title: "B.Tech Student",
    org: "IET Lucknow · CGPA 8.57",
  },
  {
    year: "2024 - Present",
    title: "Intern - Graphics Designer & Researcher",
    org: "Nikore Associates (Strategies2Scale Think Tank)",
  },
  {
    year: "2022 - 2023",
    title: "Senior Secondary",
    org: "Vrindavan Public School · 93.60%",
  },
];

// ← Cleaned: removed MS Word / Excel / PowerPoint / CodeChef (platform, not skill)
export const skills = [
  "Python",
  "C",
  "C++",
  "Graphics Designing",
  "Visual Design",
  "Canva / Adobe Tools",
  "Web Development",
  "React",
  "TypeScript",
  "Content Writing",
  "Problem Solving",
  "Research",
  "Effective Communication",
  "Team Collaboration",
  "Leadership",
];

// ← Orbit fixed: inner now has 3 items, all labels use text glyphs (no emoji)
export const orbitTech = {
  inner: [
    { icon: "Ai",  label: "Adobe" },
    { icon: "Cv",  label: "Canva" },
    { icon: "Ps",  label: "Photo" },
  ],
  mid: [
    { icon: "Py",  label: "Python" },
    { icon: "C++", label: "C/C++" },
    { icon: "{ }", label: "Web" },
  ],
  outer: [
    { icon: "✍",  label: "Content" },
    { icon: "◎",  label: "Research" },
    { icon: "◇",  label: "Leadership" },
    { icon: "✦",  label: "Design" },
  ],
};

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
export const projects = [
  {
    id: "01",
    category: "Smart City Platform",
    name: "CivicPulse",
    description:
      "An AI-powered urban intelligence platform that transforms real-time city data into actionable insights. Features interactive traffic visualization, congestion monitoring, incident management, and analytics dashboards for smarter city operations.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Drizzle ORM", "AI"],
    demoUrl: "https://civicpulsesys.vercel.app/",
    githubUrl: "https://github.com/ANUJ1908GIT/CivicPulse",
    accentColor: "rgba(59,130,246,0.4)",
    gradient: "from-blue-950 via-[#050d24] to-[#030a1a]",
    emoji: "🌆",
    emojiGradient: "from-blue-500 to-purple-700",
  },
  {
    id: "02",
    name: "Project Beta",
    category: "Coming Soon",
    description: "Description coming soon - stay tuned for details on this project.",
    tags: ["C++", "Design", "Research"],
    demoUrl: "#",
    githubUrl: "#",
    accentColor: "rgba(167,139,250,0.4)",
    gradient: "from-purple-950 via-[#0d0520] to-[#050115]",
    emoji: "🎨",
    emojiGradient: "from-purple-500 to-pink-600",
  },
];

// ─── EXPERIENCE ────────────────────────────────────────────────────────────────
export const experience = [
  {
    period: "Jan 2025 - May 2025",
    role: "Intern - Graphics Designer & Researcher",
    company: "Nikore Associates · Think Tank of Strategies2Scale",
    description:
      "Working as a Graphics Designer and Researcher, creating compelling visual content and conducting research to support strategic initiatives. Blending creativity with data-driven insights to build impactful narratives.",
  },
];

// ─── ACHIEVEMENTS ──────────────────────────────────────────────────────────────
export const achievements = [
  {
    icon: "🏆",
    category: "Competition",
    name: "Rank 87 / 4000+ Colleges - NEC 2025",
    detail: "Secured an outstanding 87th rank out of 4000+ colleges in NEC 2025 held at IIT Bombay.",
  },
  {
    icon: "⚡",
    category: "Hackathon",
    name: "Finalist - Technex'26 IIT BHU",
    detail: "Selected as a finalist in the prestigious EcoHackathon at Technex'26, IIT BHU.",
  },
  {
    icon: "⭐",
    category: "Competitive Coding",
    name: "CodeChef 2★ Coder",
    detail: "Achieved 2-star rating on CodeChef with a max rating of 1593, solving algorithmic challenges.",
  },
  {
    icon: "🎨",
    category: "Design & Leadership",
    name: "E-Cell Graphics Designer",
    detail: "Member of the Entrepreneurship Cell (E-Cell) at IET Lucknow, driving visual identity and design.",
  },
  {
    icon: "🩸",
    category: "Social Impact",
    name: "BloodConnect Camp Manager",
    detail: "Leading blood donation drives as Camp Manager & Designer for BloodConnect - saving lives through community action.",
  },
  {
    icon: "🤝",
    category: "Community",
    name: "DSW Student Volunteer",
    detail: "Serving as a DSW Volunteer at IET Lucknow, actively contributing to student welfare and campus community.",
  },
];