"use client";
import React, { useEffect, useState } from "react";
import { certifications } from "../data/data";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInRight, fadeInUp, fadeInUpDelay, fadeInUpLarge } from "../data/variants";

const Certifications = React.forwardRef<HTMLElement>((props, ref) => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      ref={ref}
      className="bg-neutral-950 flex flex-col justify-center items-center text-neutral-100 py-6 sm:py-16"
    >
      <motion.h4
        variants={fadeInRight}
        initial="initial"
        whileInView="whileInView"
        className="text-[15px] text-center text-neutral-300 font-medium"
      >
        ACHIEVEMENTS & VALIDATIONS
      </motion.h4>
      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        className="text-3xl animated-text-gradient md:text-5xl font-semibold pt-2 pb-1 mb-6 md:mb-10 text-neutral-100"
      >
        Certifications
      </motion.h2>

      <motion.div
        variants={fadeInUpLarge}
        initial="hidden"
        whileInView="visible"
        className="px-4 lg:w-4xl"
      >
        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            className="certification flex max-lg:flex-col max-lg:pb-4 bg-neutral-950 gap-4 my-4 shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition sticky border border-neutral-600"
            style={{
              top: `calc(72px + ${index * 30}px)`,
            }}
          >
            {/* Certification Info */}
            <motion.div
              variants={fadeInUpDelay}
              initial="hidden"
              whileInView="visible"
              className={`certification-info flex flex-1 flex-col justify-between p-4 md:p-8 min-h-[24rem] transition-all duration-300 ease-in-out ${
                hoveredIndex === index ? "blur-sm opacity-50" : "blur-0 opacity-100"
              }`}
            >
              <div>
                <h3 className="text-xl md:text-3xl border-b border-neutral-600 pb-2 text-neutral-100 font-semibold">
                  {cert.title}
                </h3>
                <p className="text-neutral-100 mt-2">{cert.description}</p>

                {cert.points && (
                  <ul>
                    {cert.points.map((point, idx) => (
                      <li key={idx} className="text-sm pt-2">
                        - {point}
                      </li>
                    ))}
                  </ul>
                )}

                {cert.techStack && (
                  <div className="flex flex-wrap gap-1 mt-4">
                    {cert.techStack.map((tech, i) => {
                      const Icon = tech.icon;
                      const color = tech.color;
                      return (
                        <span
                          key={i}
                          className="flex items-center gap-2 text-xs px-3 py-1 rounded-full border border-neutral-600"
                        >
                          <Icon style={{ color }} /> {tech.name}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* View Certificate Button */}
              {cert.link && (
                <div className="w-full flex justify-center mt-auto pt-6">
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full max-w-xs text-center px-5 py-2 rounded-xl text-sm border border-neutral-600 shadow-md hover:bg-blue-800 hover:text-white transition-transform duration-300 ease-out hover:scale-105 hover:-translate-y-0.5"
                  >
                    View Certificate
                  </a>
                </div>
              )}
            </motion.div>

            {/* Certificate Image */}
            <motion.div
              variants={fadeInUpDelay}
              initial="hidden"
              whileInView="visible"
              className="relative flex-1 overflow-visible"
            >
              <motion.div
                className="certification-img lg:absolute lg:top-20 lg:right-[-45%] w-full h-40 sm:h-80 md:h-96 lg:w-[130%] lg:h-[22rem] border border-neutral-600 rounded-xl hover:cursor-pointer z-20"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                animate={
                  hoveredIndex === index && isLargeScreen
                    ? {
                        x: -320,
                        y: -40,
                        scale: 1.12,
                        zIndex: 50,
                      }
                    : { x: 0, y: 0, scale: 1, zIndex: 20 }
                }
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Image
                  src={cert.image}
                  fill
                  alt={`${cert.title} certificate`}
                  className="rounded-xl object-contain border"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
});

Certifications.displayName = "Certifications";
export default Certifications;
