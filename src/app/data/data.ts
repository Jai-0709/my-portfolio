// Update this file with your personal information to customize your portfolio.
// Place all images in the "img" folder inside the "public" directory and reference them using the path: "/img/FILE_NAME".

import { FiHome, FiMail } from "react-icons/fi";
import { FaAws, FaCertificate, FaGithub, FaJava, FaLinkedinIn, FaPython } from "react-icons/fa";
import { TbUserSquare } from "react-icons/tb";
import { FaReact, FaNodeJs, FaDatabase, FaServer, FaHtml5, FaCss3Alt, FaJs, FaGit, FaFigma, FaCuttlefish } from "react-icons/fa";
import { SiTailwindcss, SiExpress, SiRedux, SiSocketdotio, SiFirebase, SiMongodb, SiPostman, SiVercel, SiTypescript, SiNextdotjs, SiFramer } from "react-icons/si";
import { LuSquareCode } from "react-icons/lu";
import { IoLogoGithub } from "react-icons/io";
import { DiJava, DiMysql, DiPython } from "react-icons/di";
import { BarChart3Icon, Database } from "lucide-react";
import { AiFillBulb } from "react-icons/ai";

// List your technical skills below
export const skills = [
  { name: "HTML", icon: FaHtml5, color: "#E34F26" },
  { name: "CSS", icon: FaCss3Alt, color: "#1572B6" },
  { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "ReactJS", icon: FaReact, color: "#61DAFB" },
  { name: "NextJS", icon: SiNextdotjs, color: "#ffffff" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38B2AC" },
  { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
  { name: "NodeJS", icon: FaNodeJs, color: "#83CD29" },
  { name: "ExpressJS", icon: SiExpress, color: "#C9D1D9" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Redux Toolkit", icon: SiRedux, color: "#764ABC" },
  { name: "Git", icon: FaGit, color: "#F05032" },
  { name: "GitHub", icon: FaGithub, color: "#ffffff" },
  { name: "Vercel", icon: SiVercel, color: "#ffffff" },
  { name: "Postman", icon: SiPostman, color: "#FF6C37" },
  { name: "C++", icon: FaCuttlefish, color: "#00599C" },
  { name: "Figma", icon: FaFigma, color: "#F24E1E" },
  { name: "Python", icon: DiPython, color: "#00599C" },
  { name: "SQL", icon: DiMysql, color: "#00599C" },
  { name: "Java", icon: DiJava, color: "#00599C" },
];

type NavbarItem = {
  name: string;
  type: "scroll" | "link";
  icon: React.ElementType;
  size: string;
  url?: string;
};
export const navbarData: NavbarItem[] = [
  { name: "Home", type: "scroll", icon: FiHome, size: "18px" },
  { name: "About", type: "scroll", icon: TbUserSquare, size: "18px" },
  { name: "Projects", type: "scroll", icon: LuSquareCode, size: "18px" },
  { name: "Certifications", type: "scroll", icon: FaCertificate, size: "18px" },
  { name: "Contact", type: "scroll", icon: FiMail, size: "18px" },
  {
    name: "LinkedIn",
    type: "link",
    icon: FaLinkedinIn,
    url: "https://www.linkedin.com/in/jaisurya2104/",
    size: "18px",
  },
  {
    name: "Github",
    type: "link",
    icon: IoLogoGithub,
    url: "https://github.com/Jai-0709",
    size: "18px",
  },
];

// Add your projects here with their descriptions, features, and tech stack.
export const projects = [
  {
    name: "Sample Project 1",
    description: "Description about sample project 1",
    points: [
      "Feature 1 of the sample project.",
      "Feature 2 of the sample project.",
      "Feature 3 of the sample project.",
    ],
    techStack: [
      { name: "React.js", icon: FaReact, color: "#61DAFB" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38B2AC" },
      { name: "Node.js", icon: FaNodeJs, color: "#83CD29" },
      { name: "Express.js", icon: SiExpress, color: "#C9D1D9" },
    ],
    liveLink: "#",
    githubLink: "https://github.com/Jai-0709/Car-rental-system",
    image: "/img/projectimage.jfif",
  },
  {
    name: "Sample Project 2",
    description: "Description about sample project 2",
    points: [
      "Feature 1 of the sample project.",
      "Feature 2 of the sample project.",
      "Feature 3 of the sample project.",
    ],
    techStack: [
      { name: "React.js", icon: FaReact, color: "#61DAFB" },
      { name: "Redux Toolkit", icon: SiRedux, color: "#764ABC" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38B2AC" },
      { name: "Socket.IO", icon: SiSocketdotio, color: "#ffffff" },
      { name: "Node.js", icon: FaNodeJs, color: "#83CD29" },
      { name: "Express.js", icon: SiExpress, color: "#C9D1D9" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    ],
    liveLink: "#",
    githubLink: "#",
    image: "/img/projectimage.jfif",
  },
  {
    name: "Sample Project 3",
    description: "Description about sample project 3",
    points: [
      "Feature 1 of the sample project.",
      "Feature 2 of the sample project.",
      "Feature 3 of the sample project.",
    ],
    techStack: [
      { name: "React.js", icon: FaReact, color: "#61DAFB" },
      { name: "Redux Toolkit", icon: SiRedux, color: "#764ABC" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38B2AC" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
    ],
    liveLink: "#",
    githubLink: "#",
    image: "/img/projectimage.jfif",
  },
  {
    name: "Sample Project 4",
    description: "Description about sample project 4",
    points: [
      "Feature 1 of the sample project.",
      "Feature 2 of the sample project.",
      "Feature 3 of the sample project.",
    ],
    techStack: [
      { name: "React.js", icon: FaReact, color: "#61DAFB" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38B2AC" },
      { name: "Context API", icon: FaServer, color: "#6366F1" },
      { name: "OpenWeather API", icon: FaDatabase, color: "#0064a5" },
    ],
    liveLink: "#",
    githubLink: "#",
    image: "/img/preview.png",
  },
];

// Update your personal information
export const personalInfo = {
  pfp: "/img/profile-pic.png",
  alt: "Sample Profile Pic",
  summary:
    " Passionate about creating and learning. Focused on growth, driven by purpose, and waiting for the right opportunity to make an impact.",
  location: "Chennai, India",
};

// Update your education details
export const education = {
  college: "SRM University",
  course: "B.Tech in Computer Science and Engineering with Cloud Computing",
  cgpa: "9.4",
  duration: "2023 - 2027",
};

// Update your work experience
export const experience = {
  companyName: "CodSoft",
  title: "Python Developer Intern",
  duration: "Nov 2023 - Dec 2023",
  location: "Remote",
  points: [
    "Developed a key feature that improved user engagement.",
    "Collaborated with cross-functional teams to enhance.",
    "Fixed critical bugs, improving performance.",
  ],
};

// Certifications section - add your certificates here
export const certifications = [
  {
    title: "AWS Solutions Architecture Job Stimulation",
    description:
      "Optimized cloud costs and performance",
    link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/pmnMSL4QiQ9JCgE3W/kkE9HyeNcw6rwCRGw_pmnMSL4QiQ9JCgE3W_QwmqkBhZmCofvmt6n_1748964155331_completion_certificate.pdf",
    image: "/img/aws.png",
    points: [
      "Designed secure and scalable cloud architectures on AWS.",
      "Implemented cost-optimized solutions using core AWS services.",
      "Applied best practices for high availability and fault tolerance.",
    ],
    techStack: [
      { name: "AWS", icon: FaAws, color: "white" },
    ],
  },
  {
    title: "Deloitte Data Analytics Job Simulation",
    description: "Cleaned and processed large datasets.",
    link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_QwmqkBhZmCofvmt6n_1748797971768_completion_certificate.pdf",
    image: "/img/DEL1.png",
    points: [
      "Extracted insights from real-world data.",
      "Created visual dashboards and reports.",
      "Analyzed business data for insights.",
    ],
    techStack: [
      { name: "Data Analytics", icon: FaDatabase, color: "#F7DF1E" },
    ],
  },
   {
    title: " TATA-Data Visualisation: Empowering Business with Effective Insights",
    description: "Transformed data into clear visual stories.",
    link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/ifobHAoMjQs9s6bKS/MyXvBcppsW2FkNYCX_ifobHAoMjQs9s6bKS_QwmqkBhZmCofvmt6n_1748806946137_completion_certificate.pdf",
    image: "/img/TATA.png",
    points: [
      "Created interactive and insightful data visualizations to simplify complex information.",
      "Used charts and dashboards to help businesses make data-driven decisions.",
    ],
    techStack: [
      { name: "Data Visualization", icon: BarChart3Icon, color: "blue" },
    ],
  },
   {
    title: "NPTEL-Introduction to Database Systems",
    description: "Learned fundamental concepts of database design and management",
    link: "https://internalapp.nptel.ac.in/NOC/NOC25/SEM1/Ecertificates/106/noc25-cs40/Course/NPTEL25CS40S24320701904321245.pdf",
    image: "/img/NPTEL.png",
    points: [
      "Studied core concepts of database models and architecture",
      "Mastered writing complex SQL queries for data manipulation.",
      "Understood database design, normalization, and transaction management.",
    ],
    techStack: [
      { name: "Database", icon: Database, color: "orange" },
    ],
  },
   {
    title: "HackerRank - Problem Solving",
    description: "Developed strong algorithmic thinking through coding challenges.",
    link: "https://www.hackerrank.com/certificates/iframe/e2891d6d1318",
    image: "/img/PS.png",
    points: [
      "Enhanced problem-solving skills by tackling algorithmic challenges.",
      "Applied data structures and algorithms to real-world coding problems.",
      "Improved code efficiency through optimization and debugging techniques.",
    ],
    techStack: [
      { name: "Problem Solving", icon: AiFillBulb, color: "#F7DF1E" },
    ],
  },
   {
    title: "HackerRank - Python",
    description: "HackerRank certified in Python (Basic) for core programming skills.",
    link: "https://www.hackerrank.com/certificates/iframe/c913e94161db",
    image: "/img/python.png",
    points: [
      "Earned HackerRank Python (Basic) certification, demonstrating strong foundational Python skills.",
      "Covered key topics like data types, loops, functions, and conditional statements.",
      "Validated ability to solve real-world coding problems using Python efficiently.",
    ],
    techStack: [
      { name: "Python", icon: FaPython, color: "blue" },
    ],
  },
   {
    title: "HackerRank - Java",
    description: "Achieved HackerRank Java (Basic) certification, showcasing fundamental Java programming knowledge.",
    link: "https://www.hackerrank.com/certificates/iframe/1306d9605bda",
    image: "/img/java.png",
    points: [
      "Successfully completed HackerRank Java (Basic) certification, highlighting essential Java programming skills.",
      "Gained proficiency in OOP principles, control structures, data types, and basic syntax.",
      "Solved real-world coding problems using Java to demonstrate logical thinking and coding accuracy.",
    ],
    techStack: [
      { name: "Java", icon: FaJava, color: "blue" },
    ],
  },
  {
    title: "HackerRank - SQL ",
    description: "Certified in basic SQL querying and database fundamentals.",
    link: "https://www.hackerrank.com/certificates/iframe/d2462407af79",
    image: "/img/SQL.png",
    points: [
      "Completed HackerRank SQL (Basic) certification, demonstrating solid understanding of fundamental SQL concepts.",
      "Proficient in writing SELECT queries, filtering data with WHERE clauses, and sorting results using ORDER BY.",
      "Experienced in performing basic JOIN operations to combine data from multiple tables effectively.",
    ],
    techStack: [
      { name: "SQL", icon: DiMysql, color: "blue" },
    ],
  },

  // Add more certificates as needed
];
