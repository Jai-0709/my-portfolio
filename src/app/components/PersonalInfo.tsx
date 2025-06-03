"use client";
import { motion } from "motion/react";
import { fadeInUpRight } from "../data/variants";
import Image from "next/image";
import { personalInfo } from "../data/data";
import { GrLocation } from "react-icons/gr";
import TextScramble from "./TextScramble";

const PersonalInfo = () => {
  return (
    <motion.div className="lg:w-1/3 lg:max-w-3xl text-center flex flex-col items-center gap-3 pt-6 lg:px-6">
      {/* Profile Image with Hover Effect */}
      <motion.div
        variants={fadeInUpRight}
        initial="hidden"
        whileInView="visible"
        whileHover={{ scale: 1.1, rotate: 2 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="p-[4px] rounded-full border-4 border-amber-500"
      >
        <Image
          src={personalInfo.pfp}
          alt={personalInfo.alt}
          width={250}
          height={250}
          className="rounded-full object-cover"
        />
      </motion.div>

      {/* Name */}
      <motion.h2
        variants={fadeInUpRight}
        initial="hidden"
        whileInView="visible"
        className="text-2xl font-bold text-neutral-100"
      >
        Jaisurya M
      </motion.h2>

      {/* Encrypted Role Animation */}
      <motion.div
        variants={fadeInUpRight}
        initial="hidden"
        whileInView="visible"
        className="text-white-400"
      >
        <TextScramble
          texts={[
            "Data Analyst",
            "Web Developer",
            "Cloud Intern",
            "UI/UX Developer",
            "Full Stack Developer"
          ]}
          interval={2500}
          speed={50}
        />
      </motion.div>

      {/* Summary */}
      <motion.p
        variants={fadeInUpRight}
        initial="hidden"
        whileInView="visible"
        className="text-neutral-100 border-b border-neutral-600 pb-2"
      >
        {personalInfo.summary}
      </motion.p>

      {/* Location */}
      <motion.div
        variants={fadeInUpRight}
        initial="hidden"
        whileInView="visible"
        className="hidden lg:flex items-center gap-2 text-neutral-100"
      >
        <GrLocation className="text-neutral-100" />
        <span>{personalInfo.location}</span>
      </motion.div>
    </motion.div>
  );
};

export default PersonalInfo;
