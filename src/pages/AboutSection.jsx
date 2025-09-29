import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const images = [
  "/about.avif",
  "/about1.png",
  "/about2.avif",
  "/about4.png",
  "/facial1.avif",
  "/haircare.avif",
  "/makeup.avif",
  "/nail.avif",
  "/nail1.avif",
  "/makeover.avif",
  "skincare.avif",
  "threading.avif",
  "facial.avif",
  "/bridal.avif",
];

export default function AboutSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-r from-pink-50 to-white">
      <div className="max-w-6xl mx-auto px-4 md:flex md:items-center md:gap-12">
        <motion.div
          className="md:w-1/2 mb-8 md:mb-0 relative"
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <img
            src={images[currentIndex]}
            alt="About Us"
            className="rounded-xl shadow-xl w-full max-w-md object-cover mx-auto transition-all duration-700"
          />
        </motion.div>

        <motion.div
          className="md:w-1/2 text-center md:text-left"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 leading-snug">
            About <span className="text-pink-500">ZARENO</span>
          </h2>
          <p className="text-gray-600 mb-6 text-lg md:text-xl leading-relaxed">
            At <span className="font-semibold text-gray-800">ZARENO Beauty Salon</span>, we provide professional beauty services with a personal touch. Our team of experts ensures every client feels pampered and leaves with a radiant glow.
          </p>
          <Link
            to="/contactus"
            className="inline-block bg-pink-500 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-pink-600 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Learn More
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
