"use client";
import { useRef } from "react";
import AboutMe from "./components/AboutMe";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications"; // ✅ New Import

export default function Home() {
  const sectionRefs = {
    home: useRef<HTMLElement | null>(null),
    about: useRef<HTMLElement | null>(null),
    projects: useRef<HTMLElement | null>(null),
    certifications: useRef<HTMLElement | null>(null), // ✅ Add this
    contact: useRef<HTMLElement | null>(null),
  };

  return (
    <>
      <Header sectionRefs={sectionRefs} />
      <Hero ref={sectionRefs.home} />
      <AboutMe ref={sectionRefs.about} />
      <Projects ref={sectionRefs.projects} />
      <Certifications ref={sectionRefs.certifications} /> {/* ✅ Add this */}
      <Contact ref={sectionRefs.contact} />
      <Footer />
    </>
  );
}
