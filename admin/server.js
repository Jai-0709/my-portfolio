const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

// Load local .env if present
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split(/\r?\n/).forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
      if (!process.env[key]) process.env[key] = value.trim();
    }
  });
}

// GitHub Sync Config
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
const GITHUB_OWNER = process.env.GITHUB_OWNER || 'Jai-0709';
const GITHUB_REPO = process.env.GITHUB_REPO || 'my-portfolio';
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

// Paths
const PORTFOLIO_ROOT = path.resolve(__dirname, '..');
const DATA_JSON_PATH = path.join(__dirname, 'portfolio-data.json');
const DATA_TS_PATH = path.join(PORTFOLIO_ROOT, 'src', 'app', 'data', 'data.ts');
const LAYOUT_PATH = path.join(PORTFOLIO_ROOT, 'src', 'app', 'layout.tsx');
const HERO_PATH = path.join(PORTFOLIO_ROOT, 'src', 'app', 'components', 'Hero.tsx');
const CONTACT_PATH = path.join(PORTFOLIO_ROOT, 'src', 'app', 'components', 'Contact.tsx');
const PERSONAL_INFO_PATH = path.join(PORTFOLIO_ROOT, 'src', 'app', 'components', 'PersonalInfo.tsx');
const IMG_DIR = path.join(PORTFOLIO_ROOT, 'public', 'img');

// Ensure image directory exists
if (!fs.existsSync(IMG_DIR)) {
  try { fs.mkdirSync(IMG_DIR, { recursive: true }); } catch (e) {}
}

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve portfolio images
app.use('/portfolio-images', express.static(IMG_DIR));
app.use('/img', express.static(IMG_DIR));

// Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, IMG_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = req.body.imageName || file.fieldname + '_' + Date.now();
    cb(null, name + ext);
  }
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// ─── Helper: Read/Write JSON ────────────────────────────────────────────────
function readData() {
  return JSON.parse(fs.readFileSync(DATA_JSON_PATH, 'utf-8'));
}

function writeData(data) {
  fs.writeFileSync(DATA_JSON_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

// ─── Icon Mapping ───────────────────────────────────────────────────────────
const ICON_PACKAGES = {
  // react-icons/fi
  FiHome: 'react-icons/fi', FiMail: 'react-icons/fi',
  // react-icons/fa
  FaAws: 'react-icons/fa', FaCertificate: 'react-icons/fa', FaGithub: 'react-icons/fa',
  FaJava: 'react-icons/fa', FaLinkedinIn: 'react-icons/fa', FaPython: 'react-icons/fa',
  FaReact: 'react-icons/fa', FaNodeJs: 'react-icons/fa', FaDatabase: 'react-icons/fa',
  FaHtml5: 'react-icons/fa', FaCss3Alt: 'react-icons/fa', FaJs: 'react-icons/fa',
  FaGit: 'react-icons/fa', FaFigma: 'react-icons/fa', FaCuttlefish: 'react-icons/fa',
  FaDocker: 'react-icons/fa', FaAndroid: 'react-icons/fa', FaApple: 'react-icons/fa',
  FaLinux: 'react-icons/fa', FaWindows: 'react-icons/fa', FaPhp: 'react-icons/fa',
  FaRust: 'react-icons/fa', FaSwift: 'react-icons/fa', FaAngular: 'react-icons/fa',
  FaVuejs: 'react-icons/fa', FaSass: 'react-icons/fa', FaLess: 'react-icons/fa',
  FaBootstrap: 'react-icons/fa', FaWordpress: 'react-icons/fa', FaShopify: 'react-icons/fa',
  FaAmazon: 'react-icons/fa', FaGoogle: 'react-icons/fa', FaMicrosoft: 'react-icons/fa',
  FaSlack: 'react-icons/fa', FaTrello: 'react-icons/fa', FaJira: 'react-icons/fa',
  // react-icons/tb
  TbUserSquare: 'react-icons/tb',
  // react-icons/si
  SiTailwindcss: 'react-icons/si', SiExpress: 'react-icons/si', SiRedux: 'react-icons/si',
  SiMongodb: 'react-icons/si', SiPostman: 'react-icons/si', SiVercel: 'react-icons/si',
  SiTypescript: 'react-icons/si', SiNextdotjs: 'react-icons/si', SiFramer: 'react-icons/si',
  SiApachespark: 'react-icons/si', SiStreamlit: 'react-icons/si', SiArduino: 'react-icons/si',
  SiFirebase: 'react-icons/si', SiSupabase: 'react-icons/si', SiPrisma: 'react-icons/si',
  SiGraphql: 'react-icons/si', SiDocker: 'react-icons/si', SiKubernetes: 'react-icons/si',
  SiTensorflow: 'react-icons/si', SiPytorch: 'react-icons/si', SiFlutter: 'react-icons/si',
  SiDart: 'react-icons/si', SiRust: 'react-icons/si', SiGo: 'react-icons/si',
  SiSwift: 'react-icons/si', SiKotlin: 'react-icons/si', SiCplusplus: 'react-icons/si',
  SiCsharp: 'react-icons/si', SiDjango: 'react-icons/si', SiFlask: 'react-icons/si',
  SiSpring: 'react-icons/si', SiRubyonrails: 'react-icons/si', SiLaravel: 'react-icons/si',
  SiVuedotjs: 'react-icons/si', SiAngular: 'react-icons/si', SiSvelte: 'react-icons/si',
  SiAstro: 'react-icons/si', SiVite: 'react-icons/si', SiWebpack: 'react-icons/si',
  SiJest: 'react-icons/si', SiPlaywright: 'react-icons/si', SiCypress: 'react-icons/si',
  SiGithubactions: 'react-icons/si', SiNetlify: 'react-icons/si', SiHeroku: 'react-icons/si',
  SiDigitalocean: 'react-icons/si', SiCloudflare: 'react-icons/si',
  SiMysql: 'react-icons/si', SiPostgresql: 'react-icons/si', SiRedis: 'react-icons/si',
  SiElasticsearch: 'react-icons/si', SiRabbitmq: 'react-icons/si',
  // react-icons/lu
  LuSquareCode: 'react-icons/lu',
  // react-icons/io
  IoLogoGithub: 'react-icons/io',
  // react-icons/di
  DiCss3: 'react-icons/di', DiHtml5: 'react-icons/di', DiJava: 'react-icons/di',
  DiJavascript: 'react-icons/di', DiMysql: 'react-icons/di', DiPhp: 'react-icons/di',
  DiPython: 'react-icons/di', DiSpark: 'react-icons/di',
  DiRuby: 'react-icons/di', DiSwift: 'react-icons/di', DiGo: 'react-icons/di',
  // lucide-react
  BarChart3Icon: 'lucide-react', Database: 'lucide-react',
  Code2: 'lucide-react', Terminal: 'lucide-react', Cloud: 'lucide-react',
  Server: 'lucide-react', Shield: 'lucide-react', Cpu: 'lucide-react',
  // react-icons/ai
  AiFillBulb: 'react-icons/ai',
  // react-icons/gr
  GrHadoop: 'react-icons/gr',
  // react-icons/md
  MdSensorDoor: 'react-icons/md', MdSensors: 'react-icons/md',
  MdCode: 'react-icons/md', MdDesignServices: 'react-icons/md',
};

// ─── Generate data.ts from JSON ─────────────────────────────────────────────
function generateDataTs(data) {
  // Collect all icons used
  const usedIcons = new Set();

  // Always include navbar icons
  ['FiHome', 'FiMail', 'TbUserSquare', 'LuSquareCode', 'FaCertificate', 'FaLinkedinIn', 'IoLogoGithub'].forEach(i => usedIcons.add(i));

  data.skills.forEach(s => usedIcons.add(s.icon));
  data.projects.forEach(p => p.techStack.forEach(t => usedIcons.add(t.icon)));
  data.certifications.forEach(c => c.techStack.forEach(t => usedIcons.add(t.icon)));

  // Group icons by package
  const importGroups = {};
  usedIcons.forEach(icon => {
    const pkg = ICON_PACKAGES[icon];
    if (pkg) {
      if (!importGroups[pkg]) importGroups[pkg] = [];
      importGroups[pkg].push(icon);
    }
  });

  // Build import statements
  let imports = '';
  for (const [pkg, icons] of Object.entries(importGroups)) {
    imports += `import { ${icons.join(', ')} } from "${pkg}";\n`;
  }

  // Build skills array
  const skillsStr = data.skills.map(s =>
    `  { name: "${s.name}", icon: ${s.icon}, color: "${s.color}" }`
  ).join(',\n');

  // Build navbar
  const navbarStr = `  { name: "Home", type: "scroll", icon: FiHome, size: "18px" },
  { name: "About", type: "scroll", icon: TbUserSquare, size: "18px" },
  { name: "Projects", type: "scroll", icon: LuSquareCode, size: "18px" },
  { name: "Certifications", type: "scroll", icon: FaCertificate, size: "18px" },
  { name: "Contact", type: "scroll", icon: FiMail, size: "18px" },
  {
    name: "LinkedIn",
    type: "link",
    icon: FaLinkedinIn,
    url: "${data.socialLinks.linkedin}",
    size: "18px",
  },
  {
    name: "Github",
    type: "link",
    icon: IoLogoGithub,
    url: "${data.socialLinks.github}",
    size: "18px",
  },`;

  // Build projects
  const projectsStr = data.projects.map(p => {
    const techStr = p.techStack.map(t =>
      `      { name: "${t.name}", icon: ${t.icon}, color: "${t.color}" }`
    ).join(',\n');
    const pointsStr = p.points.map(pt => `      "${pt.replace(/"/g, '\\"')}"`).join(',\n');
    return `  {
    name: "${p.name.replace(/"/g, '\\"')}",
    description: "${p.description.replace(/"/g, '\\"')}",
    points: [
${pointsStr},
    ],
    techStack: [
${techStr},
    ],
    liveLink: "${p.liveLink}",
    githubLink: "${p.githubLink}",
    image: "${p.image}",
  }`;
  }).join(',\n');

  // Build certifications
  const certsStr = data.certifications.map(c => {
    const techStr = c.techStack.map(t =>
      `      { name: "${t.name}", icon: ${t.icon}, color: "${t.color}" }`
    ).join(',\n');
    const pointsStr = c.points.map(pt => `      "${pt.replace(/"/g, '\\"')}"`).join(',\n');
    return `  {
    title: "${c.title.replace(/"/g, '\\"')}",
    description:
      "${c.description.replace(/"/g, '\\"')}",
    link: "${c.link}",
    image: "${c.image}",
    points: [
${pointsStr},
    ],
    techStack: [
${techStr},
    ],
  }`;
  }).join(',\n');

  // Build experience points
  const expPointsStr = data.experience.points.map(pt => `    "${pt.replace(/"/g, '\\"')}"`).join(',\n');

  const output = `// Update this file with your personal information to customize your portfolio.
// Place all images in the "img" folder inside the "public" directory and reference them using the path: "/img/FILE_NAME".
// AUTO-GENERATED BY PORTFOLIO CMS — Do not edit manually.

${imports}
// List your technical skills below
export const skills = [
${skillsStr},
];

type NavbarItem = {
  name: string;
  type: "scroll" | "link";
  icon: React.ElementType;
  size: string;
  url?: string;
};
export const navbarData: NavbarItem[] = [
${navbarStr}
];

// Add your projects here with their descriptions, features, and tech stack.
export const projects = [
${projectsStr},
];

// Update your personal information
export const personalInfo = {
  pfp: "${data.personalInfo.pfp}",
  alt: "${data.personalInfo.alt}",
  summary:
    "${data.personalInfo.summary.replace(/"/g, '\\"')}",
  location: "${data.personalInfo.location}",
};

// Update your education details
export const education = {
  college: "${data.education.college}",
  course: "${data.education.course}",
  cgpa: "${data.education.cgpa}",
  duration: "${data.education.duration}",
};

// Update your work experience
export const experience = {
  companyName: "${data.experience.companyName}",
  title: "${data.experience.title}",
  duration: "${data.experience.duration}",
  location: "${data.experience.location}",
  points: [
${expPointsStr},
  ],
};

// Certifications section - add your certificates here
export const certifications = [
${certsStr},

  // Add more certificates as needed
];
`;

  return output;
}

// ─── Generate layout.tsx from JSON ──────────────────────────────────────────
function generateLayoutTsx(data) {
  const seo = data.seo;
  const keywordsStr = seo.keywords.map(k => `    "${k}"`).join(',\n');

  return `import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "${seo.title}",
  description:
    "${seo.description}",
  keywords: [
${keywordsStr},
  ],
  openGraph: {
    title: "${seo.ogTitle}",
    description:
      "${seo.ogDescription}",
    url: "${seo.siteUrl}",
    siteName: "${seo.siteName}",
    images: [
      {
        url: "/img/preview.png",
        width: 1200,
        height: 630,
        alt: "${seo.ogTitle}",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "${seo.twitterTitle}",
    description:
      "${seo.twitterDescription}",
    images: ["/img/preview.png"],
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={\`\${outfit.variable} antialiased\`}>
        {children}
      </body>
    </html>
  );
}
`;
}

// ─── Generate Hero.tsx from JSON ────────────────────────────────────────────
function generateHeroTsx(data) {
  const hero = data.hero;
  return `"use client";
import React from "react";
import { HiOutlineArrowDown } from "react-icons/hi";
import { motion } from "motion/react";
import { fadeInDown, fadeInUp } from "../data/variants";
import Starfield from "./StarField";

const Hero = React.forwardRef<HTMLElement, unknown>((_, ref) => {
  return (
    <main
      ref={ref}
      className="relative flex flex-col overflow-hidden pt-36 md:pt-48 bg-neutral-950 items-center text-neutral-50 min-h-screen mx-auto text-center"
    >
      {/* ⭐ Starfield Background with Mask to Fade Near Bottom */}
      <div className="absolute inset-0 z-0 pointer-events-none [mask-image:linear-gradient(to_bottom,white_75%,transparent_100%)]">
        <Starfield />
      </div>

      {/* 🎯 Hero Content */}
      <div className="relative z-20 flex flex-col gap-y-4 items-center w-full">
        <motion.p
          initial="hidden"
          whileInView="visible"
          variants={fadeInDown}
          viewport={{ once: true }}
          className="text-xs border border-neutral-600 rounded-full px-4 py-1.5 flex justify-center items-center gap-2 relative shine"
        >
          {${JSON.stringify(hero.tagline)}}
        </motion.p>

        <motion.h1
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold leading-12 px-4 sm:leading-18 w-full sm:max-w-2xl md:max-w-[52rem]"
        >
          {${JSON.stringify(hero.headline)}}
        </motion.h1>

        <motion.h4
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={{ once: true, amount: 0.2 }}
          className="md:text-xl leading-6 md:leading-8 w-full sm:max-w-2xl px-4 md:max-w-3xl"
        >
          {${JSON.stringify(hero.subtitle)}}
        </motion.h4>

        {/* 🔘 Buttons */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={{ once: true, amount: 0.2 }}
          className="flex max-sm:flex-col sm:flex-row w-full px-8 justify-center mt-4 gap-4 md:gap-6"
        >
          <motion.a
            className="px-8 flex group items-center justify-center gap-2 py-2 rounded-full border border-neutral-600 text-sm md:text-lg cursor-pointer"
            whileHover="hover"
            href="${hero.linkedinUrl}"
            target="_blank"
            rel="noopener noreferrer"
            variants={{ hover: { scale: 1.05 } }}
          >
            <motion.span
              variants={{ hover: { rotate: [0, 15, -15, 0, 15, 0] } }}
              transition={{ duration: 0.5 }}
            >
              👋
            </motion.span>
            Let&apos;s Connect
          </motion.a>

          <motion.a
            whileHover="hover"
            variants={{ hover: { scale: 1.05 } }}
            href="${hero.resumeUrl}"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 flex justify-center items-center gap-2 py-2 rounded-full border border-neutral-600 text-sm md:text-lg cursor-pointer"
          >
            My Resume{" "}
            <motion.span
              variants={{ hover: { y: [0, 4, -2, 4, 0] } }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <HiOutlineArrowDown className="md:text-lg" />
            </motion.span>
          </motion.a>
        </motion.div>
      </div>

      {/* 💡 Gradient Light Effect (Above Starfield, Below Content) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="pointer-events-none relative z-10 mx-auto -mt-32 h-96 w-screen max-w-[1920px] overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#1a237e,transparent_80%)] before:opacity-60"
      >
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
          }}
          className="absolute animate-gradient top-1/2 -left-1/2 z-20 w-[200%] rounded-[100%] border-t-4 border-t-[#d0e8ff] bg-[#0a0a0a] shadow-[inset_0_2px_20px_#d0e8ff,0_-10px_50px_1px_#d0e8ffb3]"
        />
      </motion.div>
    </main>
  );
});

Hero.displayName = "Hero";
export default Hero;
`;
}

// ─── Generate Contact.tsx ───────────────────────────────────────────────────
function generateContactTsx(data) {
  const contact = data.contact;
  return `"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import {
  fadeInRight,
  fadeInUp,
  fadeInUpLarge,
  rotateYVariant,
} from "../data/variants";

const Contact = React.forwardRef<HTMLElement, unknown>((_, ref) => {
  const [status, setStatus] = useState<string | null>(null);
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [loading, setLoading] = useState(false);

  function validateEmail(email: string): boolean {
    const emailRegex = /^[^\\\\s@]+@[^\\\\s@]+\\\\.[^\\\\s@]+$/;
    return emailRegex.test(email);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    const message = form.message.value;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      setTimeout(() => { setEmailError(""); }, 4000);
      return;
    } else { setEmailError(""); }
    if (message.trim().length < 10) {
      setMessageError("Please enter atleast 10 characters.");
      setTimeout(() => { setMessageError(""); }, 4000);
      return;
    } else { setMessageError(""); }

    const formData = {
      access_key: "${contact.web3formsKey}",
      email,
      message,
    };

    try {
      setLoading(true);
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) { setStatus("Message sent successfully!"); form.reset(); }
      else { setStatus("Error sending message. Please try again."); }
    } catch { setStatus("Something went wrong. Please try again."); }
    finally { setLoading(false); }
    setTimeout(() => { setStatus(null); }, 4000);
  }

  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      ref={ref}
      className="bg-neutral-950 flex flex-col justify-center items-center text-neutral-100 py-16 px-6"
    >
      <motion.h4 variants={fadeInRight} initial="initial" whileInView="whileInView" className="text-[15px] text-center text-neutral-300 font-medium">
        GET IN TOUCH
      </motion.h4>
      <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible" className="text-3xl animated-text-gradient md:text-5xl font-semibold pt-2 mb-6 md:mb-10 text-neutral-100">
        Contact Me
      </motion.h2>
      <div className="w-full sm:max-w-2xl md:max-w-3xl border border-neutral-600 p-4 md:p-8 rounded-2xl shadow-md text-neutral-100">
        <div className="flex max-md:flex-col sm:w-xl md:w-2xl gap-4">
          <motion.a
            href="mailto:${contact.email}"
            className="flex flex-1 items-center text-sm justify-center gap-1 py-2 border border-neutral-600 rounded-lg font-medium"
            variants={rotateYVariant} initial="initial" whileInView="whileInView" whileHover={{ scale: 1.01 }}
          >
            <FiMail className="text-sm" /> ${contact.email}
          </motion.a>
          <motion.a
            href="https://wa.me/${contact.whatsappNumber}?text=Hi!%20I'm%20interested%20in%20working%20with%20you.%20Can%20we%20chat%3F"
            target="_blank" rel="noopener noreferrer"
            variants={rotateYVariant} initial="initial" whileInView="whileInView"
            className="flex flex-1 items-center text-sm justify-center gap-1 py-2 border border-neutral-600 rounded-lg font-medium"
            whileHover={{ scale: 1.01 }}
          >
            <FaWhatsapp className="text-sm" /> WhatsApp
          </motion.a>
        </div>
        <motion.p variants={fadeInUpLarge} initial="hidden" whileInView="visible" className="p-6 text-neutral-300 text-xs font-medium text-center">
          Or send a message
        </motion.p>
        <motion.form className="w-full space-y-4" onSubmit={handleSubmit}>
          <motion.div variants={fadeInUpLarge} initial="hidden" whileInView="visible" className="space-y-1">
            <motion.input type="email" name="email" placeholder="Your Email" className="w-full px-4 py-3 border placeholder:text-sm bg-neutral-900 border-neutral-600 rounded-lg focus:outline-none" required />
            {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
          </motion.div>
          <motion.div variants={fadeInUpLarge} initial="hidden" whileInView="visible">
            <motion.textarea placeholder="Your Message" name="message" rows={5} className="w-full px-4 py-3 border placeholder:text-sm bg-neutral-900 border-neutral-600 rounded-lg focus:outline-none resize-none" required />
            {messageError && (<p className="text-red-500 text-xs">{messageError}</p>)}
          </motion.div>
          <motion.button type="submit" variants={fadeInUpLarge} initial="hidden" whileInView="visible" whileHover={{ scale: 1.01 }}
            className="w-full bg-neutral-950 cursor-pointer px-4 py-2 rounded-lg text-sm font-medium border border-neutral-600 flex justify-center">
            {loading ? "Sending..." : "Send Message"}
          </motion.button>
        </motion.form>
        {status && (<p className="mt-4 text-center text-sm font-medium text-blue-600">{status}</p>)}
      </div>
    </motion.section>
  );
});

Contact.displayName = "Contact";
export default Contact;
`;
}

// ─── Generate PersonalInfo.tsx ──────────────────────────────────────────────
function generatePersonalInfoTsx(data) {
  const pi = data.personalInfo;
  const rolesStr = pi.roles.map(r => `            "${r}"`).join(',\n');
  return `"use client";
import { motion } from "motion/react";
import { fadeInUpRight } from "../data/variants";
import Image from "next/image";
import { personalInfo } from "../data/data";
import { GrLocation } from "react-icons/gr";
import TextScramble from "./TextScramble";

const PersonalInfo = () => {
  return (
    <motion.div className="lg:w-1/3 lg:max-w-3xl text-center flex flex-col items-center gap-3 pt-6 lg:px-6">
      <motion.div
        variants={fadeInUpRight} initial="hidden" whileInView="visible"
        whileHover={{ scale: 1.1, rotate: 2 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="p-[4px] rounded-full border-4 border-amber-500"
      >
        <Image src={personalInfo.pfp} alt={personalInfo.alt} width={250} height={250} className="rounded-full object-cover" />
      </motion.div>
      <motion.h2 variants={fadeInUpRight} initial="hidden" whileInView="visible" className="text-2xl font-bold text-neutral-100">
        {${JSON.stringify(pi.name)}}
      </motion.h2>
      <motion.div variants={fadeInUpRight} initial="hidden" whileInView="visible" className="text-white-400">
        <TextScramble
          texts={[
${rolesStr}
          ]}
          interval={2500}
          speed={50}
        />
      </motion.div>
      <motion.p variants={fadeInUpRight} initial="hidden" whileInView="visible" className="text-neutral-100 border-b border-neutral-600 pb-2">
        {personalInfo.summary}
      </motion.p>
      <motion.div variants={fadeInUpRight} initial="hidden" whileInView="visible" className="hidden lg:flex items-center gap-2 text-neutral-100">
        <GrLocation className="text-neutral-100" />
        <span>{personalInfo.location}</span>
      </motion.div>
    </motion.div>
  );
};

export default PersonalInfo;
`;
}


// ─── API Routes ─────────────────────────────────────────────────────────────

// GET all data
app.get('/api/data', (req, res) => {
  try {
    const data = readData();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read data', details: err.message });
  }
});

// UPDATE a section
app.put('/api/data/:section', (req, res) => {
  try {
    const data = readData();
    const section = req.params.section;
    if (!(section in data)) {
      return res.status(400).json({ error: `Unknown section: ${section}` });
    }
    data[section] = req.body;
    writeData(data);
    res.json({ success: true, message: `${section} updated successfully` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update data', details: err.message });
  }
});

// ─── GitHub API Helper Functions ───────────────────────────────────────────
async function githubApi(endpoint, method = 'GET', body = null) {
  if (!GITHUB_TOKEN) return null;
  const headers = {
    'Authorization': `Bearer ${GITHUB_TOKEN}`,
    'User-Agent': 'PortfolioCMS',
    'Accept': 'application/vnd.github.v3+json',
  };
  if (body) headers['Content-Type'] = 'application/json';

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  const res = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}${endpoint}`, options);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`GitHub API error (${res.status}): ${data.message || JSON.stringify(data)}`);
  }
  return data;
}

async function commitFilesToGitHub(files, message = 'Update portfolio content via CMS') {
  if (!GITHUB_TOKEN) return null;

  // 1. Get latest commit SHA on branch
  const refData = await githubApi(`/git/ref/heads/${GITHUB_BRANCH}`);
  const latestCommitSha = refData.object.sha;

  // 2. Get base tree SHA
  const commitData = await githubApi(`/git/commits/${latestCommitSha}`);
  const baseTreeSha = commitData.tree.sha;

  // 3. Create tree with updated files
  const treeItems = files.map(f => ({
    path: f.path,
    mode: '100644',
    type: 'blob',
    content: f.content
  }));

  const treeData = await githubApi('/git/trees', 'POST', {
    base_tree: baseTreeSha,
    tree: treeItems
  });

  // 4. Create new commit
  const newCommit = await githubApi('/git/commits', 'POST', {
    message,
    tree: treeData.sha,
    parents: [latestCommitSha]
  });

  // 5. Update branch ref
  await githubApi(`/git/refs/heads/${GITHUB_BRANCH}`, 'PATCH', {
    sha: newCommit.sha
  });

  return {
    sha: newCommit.sha,
    url: `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/commit/${newCommit.sha}`
  };
}

async function uploadFileToGitHub(repoPath, buffer, message) {
  if (!GITHUB_TOKEN) return null;
  let sha = null;
  try {
    const existing = await githubApi(`/contents/${repoPath}?ref=${GITHUB_BRANCH}`);
    if (existing && existing.sha) sha = existing.sha;
  } catch (e) {
    // File doesn't exist yet, standard for new uploads
  }

  const body = {
    message: message || `Upload ${repoPath} via CMS`,
    content: buffer.toString('base64'),
    branch: GITHUB_BRANCH
  };
  if (sha) body.sha = sha;

  return await githubApi(`/contents/${repoPath}`, 'PUT', body);
}

// UPLOAD image
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const filename = req.file.filename;
    const imagePath = `/img/${filename}`;

    // Also commit image to GitHub repository so Vercel includes it in production
    if (GITHUB_TOKEN) {
      try {
        const fileBuffer = fs.readFileSync(req.file.path);
        await uploadFileToGitHub(`public/img/${filename}`, fileBuffer, `Upload image ${filename} via CMS`);
        console.log(`Image ${filename} successfully committed to GitHub`);
      } catch (ghErr) {
        console.error('Failed to commit image to GitHub:', ghErr.message);
      }
    }

    res.json({ success: true, path: imagePath, filename });
  } catch (err) {
    res.status(500).json({ error: 'Upload failed', details: err.message });
  }
});

// LIST images
app.get('/api/images', (req, res) => {
  try {
    const files = fs.readdirSync(IMG_DIR).filter(f => {
      const ext = path.extname(f).toLowerCase();
      return ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'].includes(ext);
    });
    res.json(files.map(f => ({ name: f, path: `/img/${f}` })));
  } catch (err) {
    res.status(500).json({ error: 'Failed to list images', details: err.message });
  }
});

// DELETE image
app.delete('/api/images/:filename', (req, res) => {
  try {
    const filePath = path.join(IMG_DIR, req.params.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'File not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete image', details: err.message });
  }
});

// GET available icons
app.get('/api/icons', (req, res) => {
  const icons = Object.keys(ICON_PACKAGES).map(name => ({
    name,
    package: ICON_PACKAGES[name]
  }));
  res.json(icons);
});

// PUBLISH — Generate all portfolio files and commit directly to GitHub
app.post('/api/publish', async (req, res) => {
  try {
    const data = readData();

    // Generate source files
    const dataTs = generateDataTs(data);
    const layoutTsx = generateLayoutTsx(data);
    const heroTsx = generateHeroTsx(data);
    const contactTsx = generateContactTsx(data);
    const personalInfoTsx = generatePersonalInfoTsx(data);
    const dataJsonStr = JSON.stringify(data, null, 2);

    // Save locally if local folders exist
    try {
      if (fs.existsSync(path.dirname(DATA_TS_PATH))) fs.writeFileSync(DATA_TS_PATH, dataTs, 'utf-8');
      if (fs.existsSync(path.dirname(LAYOUT_PATH))) fs.writeFileSync(LAYOUT_PATH, layoutTsx, 'utf-8');
      if (fs.existsSync(path.dirname(HERO_PATH))) fs.writeFileSync(HERO_PATH, heroTsx, 'utf-8');
      if (fs.existsSync(path.dirname(CONTACT_PATH))) fs.writeFileSync(CONTACT_PATH, contactTsx, 'utf-8');
      if (fs.existsSync(path.dirname(PERSONAL_INFO_PATH))) fs.writeFileSync(PERSONAL_INFO_PATH, personalInfoTsx, 'utf-8');
    } catch (fsErr) {
      console.warn('Local file write notice:', fsErr.message);
    }

    // Direct commit to GitHub repository
    let gitResult = null;
    if (GITHUB_TOKEN) {
      gitResult = await commitFilesToGitHub([
        { path: 'admin/portfolio-data.json', content: dataJsonStr },
        { path: 'src/app/data/data.ts', content: dataTs },
        { path: 'src/app/layout.tsx', content: layoutTsx },
        { path: 'src/app/components/Hero.tsx', content: heroTsx },
        { path: 'src/app/components/Contact.tsx', content: contactTsx },
        { path: 'src/app/components/PersonalInfo.tsx', content: personalInfoTsx },
      ], 'Update portfolio content via CMS');
    }

    res.json({
      success: true,
      message: gitResult
        ? 'Published! Changes committed to GitHub. Vercel is now rebuilding your live portfolio.'
        : 'All portfolio files generated successfully locally!',
      commitUrl: gitResult ? gitResult.url : null,
      portfolioUrl: 'https://my-portfolio-o3gb.vercel.app/'
    });
  } catch (err) {
    console.error('Publish error:', err);
    res.status(500).json({ error: 'Failed to publish', details: err.message });
  }
});

// Serve admin panel
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n  ✨ Portfolio Admin CMS running at http://localhost:${PORT}\n`);
});
