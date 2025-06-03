"use client";
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
          Let’s Build What Tomorrow Needs, Today
        </motion.p>

        <motion.h1
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold leading-12 px-4 sm:leading-18 w-full sm:max-w-2xl md:max-w-[52rem]"
        >
          Crafting Beautiful & Functional Web Experiences
        </motion.h1>

        <motion.h4
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={{ once: true, amount: 0.2 }}
          className="md:text-xl leading-6 md:leading-8 w-full sm:max-w-2xl px-4 md:max-w-3xl"
        >
          Hey, I&apos;m Jaisurya, a Full Stack Developer passionate about
          building performant, user-friendly, and scalable applications.
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
            href="https://www.linkedin.com/in/jaisurya2104/"
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
            href="https://drive.google.com/file/d/1v_bBK0hkRSwTzSMpQ8NuaW5A7BDnrh-X/view?usp=drive_link"
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