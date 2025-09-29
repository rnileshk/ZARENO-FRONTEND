import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function CallToAction() {
  return (
    <motion.section
      className="py-10 bg-pink-500 text-white text-center"
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Book Your Appointment Today
      </h2>
      <p className="text-lg mb-6">
        Enjoy top-notch beauty services at the comfort of your home or our salon
      </p>
      <Link
        to="/booking"
        className="bg-white text-pink-500 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
      >
        Book Now
      </Link>
    </motion.section>
  );
}
