import React from "react";
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

const servicesList = [
  { title: "Facial", img: "/facial1.avif" },
  { title: "Hair Care", img: "/haircare.avif" },
  { title: "Waxing", img: "/waxing.avif" },
  { title: "Make Up", img: "/makeup.avif" },
  { title: "Nail Art", img: "/nail.avif" },
  { title: "Meni & Pedi", img: "/medi.avif" },
  { title: "Bridal", img: "/bridal.avif" },
  { title: "Threading", img: "/threding.avif" },
  { title: "Hair Removal", img: "/hairemoval.avif" },
  { title: "Skin Care", img: "/skincare.avif" },
  { title: "Hair Styling", img: "/hairstyle.png" },
  { title: "Makeover", img: "/makeover.avif" },
  { title: "Consultation", img: "/consaltation.png" },
];

export default function ServicesSection() {
  return (
    <section className="pt-12 bg-gradient-to-r from-pink-50 to-white">
      <motion.div
        className="max-w-6xl mx-auto px-4 text-center"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Our Services</h2>

        {/* Grid container */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {servicesList.map((service, i) => (
            <motion.div
              key={service.title}
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden"
            >
              <Link to={`/packages`} className="block">
                <div className="w-full h-52 overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                  <p className="text-gray-500 text-sm">
                    Experience premium care with a professional touch
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
