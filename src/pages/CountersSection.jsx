import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const counters = [
  { label: "Happy Clients", value: 5000 },
  { label: "Premium Services", value: 50 },
  { label: "Years of Expertise", value: 15 },
];

export default function CountersSection() {
  const [counts, setCounts] = useState(counters.map(() => 0));

  useEffect(() => {
    counters.forEach((counter, i) => {
      let start = 0;
      const increment = counter.value / 100;
      const interval = setInterval(() => {
        start += increment;
        if (start >= counter.value) {
          start = counter.value;
          clearInterval(interval);
        }
        setCounts((prev) => {
          const newCounts = [...prev];
          newCounts[i] = Math.floor(start);
          return newCounts;
        });
      }, 30);
    });
  }, []);

  return (
    <motion.section
      className="py-10 bg-pink-500 text-white"
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-6">
        {counters.map((counter, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            className="p-6"
          >
            <h3 className="text-5xl font-bold mb-2">{counts[i]}+</h3>
            <p className="text-lg">{counter.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
