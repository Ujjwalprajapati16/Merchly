"use client";

import { motion } from "framer-motion";

interface CategoriesHeroProps {
  title: string;
  subtitle: string;
}

const CategoriesHero = ({ title, subtitle }: CategoriesHeroProps) => {
  return (
    <section className="relative w-full py-20 px-6 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white text-center overflow-hidden rounded-3xl">
      {/* subtle animated gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent)]"
        animate={{ opacity: [0.7, 0.9, 0.7] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="relative z-10 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-extrabold tracking-tight mb-4 drop-shadow-md">
          {title}
        </h1>
        <p className="text-lg md:text-xl font-light opacity-90">
          {subtitle}
        </p>
      </motion.div>
    </section>
  );
};

export default CategoriesHero;
