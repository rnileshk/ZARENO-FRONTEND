import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

export default function HeroSection() {
  return (
    <section
      className="relative h-screen bg-cover bg-center flex items-center"
      style={{ backgroundImage: "url('/home.png')" }}
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center px-6 md:px-20 max-w-3xl mx-auto md:mx-0 md:ml-12"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight text-center">
          Welcome to <span className="text-pink-400">ZARENO</span> Beauty Salon
        </h1>
        <p className="text-lg md:text-2xl text-gray-200 mb-6 text-center">
          Premium beauty services for your ultimate relaxation and glow
        </p>
        <Link
          to="/packages"
          className="bg-pink-500 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-pink-600 transition"
        >
          Explore Packages
        </Link>
      </motion.div>
    </section>
  );
}
