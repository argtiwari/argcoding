import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

/* ================= PROJECT DATA ================= */

const projects = [
  {
    title: "Politician Portfolio",
    desc: "Modern portfolio website with SEO optimization, responsive layout, smooth animations and contact system.",
    tags: ["React", "Tailwind", "SEO"],
    image: "/projects/politician.png",
    live: "https://www.amrendrakumaratri.in/",
    github: "https://github.com/argtiwari/Amrendra-Kumar-Atri",
    gradient: "from-blue-400 to-indigo-600",
  },

  {
    title: "Designer QR Generator",
    desc: "Futuristic QR code generator with dark UI, branded QR styling and modern customization tools.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    image: "/projects/qr.png",
    live: "https://qr-supremacy.vercel.app/",
    github: "https://github.com/argtiwari/QR-supremacy",
    gradient: "from-emerald-400 to-teal-600",
  },

  {
    title: "HabitQuest - Gamified Habit Tracker",
    desc: "Gamified productivity app where habits become quests, users gain XP, level up characters and track progress.",
    tags: ["React", "Firebase", "Tailwind", "Framer Motion"],
    image: "/projects/habitquest.png",
    live: "https://habitquest-in.vercel.app/",
    github: "https://github.com/argtiwari/habitquest",
    gradient: "from-purple-400 to-pink-600",
  },

  {
    title: "CareerPath India",
    desc: "Career guidance platform helping students explore professional paths, education options and opportunities.",
    tags: ["React", "Tailwind", "API"],
    image: "/projects/career.png",
    live: "https://argtiwari.github.io/CareerPath-India/",
    github: "https://github.com/argtiwari/CareerPath-India",
    gradient: "from-orange-400 to-red-600",
  },
];

/* ================= MAIN COMPONENT ================= */

const Portfolio = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} className="relative pb-20">
      
      {/* HEADER */}

      <div
        id="portfolio"
        className="pt-20 pb-8 text-center sticky top-0 backdrop-blur-md bg-black/20 z-10 mb-10"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold text-white mb-4"
        >
          Selected{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
            Works.
          </span>
        </motion.h2>

        <p className="text-slate-400 text-lg">
          Scroll to explore my featured projects
        </p>
      </div>

      {/* STACK */}

      <div className="max-w-5xl mx-auto px-4">
        {projects.map((project, index) => {
          const targetScale = 1 - (projects.length - index) * 0.05;

          return (
            <Card
              key={index}
              i={index}
              {...project}
              progress={scrollYProgress}
              range={[index * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
};

/* ================= CARD COMPONENT ================= */

const Card = ({
  i,
  title,
  desc,
  tags,
  image,
  live,
  github,
  gradient,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef(null);
  const [expanded, setExpanded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{ scale, top: `calc(-5vh + ${i * 25}px)` }}
        className="relative flex flex-col md:flex-row gap-8 bg-[#161b22] border border-white/10 rounded-3xl p-8 md:p-12 w-full max-w-4xl h-[60vh] shadow-2xl origin-top"
      >
        {/* LEFT CONTENT */}

        <div className="w-full md:w-1/2 flex flex-col justify-between h-full z-10">
          <div>

            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {title}
            </h3>

            {/* DESCRIPTION */}

            <p
              className={`text-slate-400 text-lg mb-2 ${
                expanded ? "" : "line-clamp-3"
              }`}
            >
              {desc}
            </p>

            {desc.length > 100 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-indigo-400 text-sm hover:text-indigo-300 mb-4"
              >
                {expanded ? "Show less ▲" : "Read more ▼"}
              </button>
            )}

            {/* TAGS */}

            <div className="flex flex-wrap gap-3">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-white/5 rounded-full text-sm text-indigo-300 border border-white/5"
                >
                  #{tag}
                </span>
              ))}
            </div>

          </div>

          {/* LINKS */}

          <div className="flex gap-4 mt-6">

            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-indigo-400 transition-colors"
            >
              <FaExternalLinkAlt /> Live Demo
            </a>

            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-colors"
            >
              <FaGithub size={20} />
            </a>

          </div>
        </div>

        {/* RIGHT IMAGE */}

        <div className="w-full md:w-1/2 h-full rounded-2xl relative overflow-hidden group">

          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${gradient}`} />
          )}

          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition" />

        </div>
      </motion.div>
    </div>
  );
};

export default Portfolio;