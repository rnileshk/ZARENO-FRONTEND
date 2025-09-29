import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

export default function TestimonialSection() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/feedbacks`);
        const data = await res.json();
        setFeedbacks(data);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
      }
    };
    fetchFeedbacks();
  }, []);

  // Auto slide every 4 seconds
  useEffect(() => {
    if (feedbacks.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % feedbacks.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [feedbacks]);

  // Helper function to generate stars
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) =>
      i < rating ? "★" : "☆"
    ).join("");
  };

  if (!feedbacks.length) {
    return (
      <section className="py-20 text-center">
        <p className="text-gray-600">No feedback available yet.</p>
      </section>
    );
  }

  const currentFeedback = feedbacks[currentIndex];

  return (
    <motion.section
      className="py-20 bg-pink-50"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
    >
      <div className="max-w-3xl mx-auto text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800">
          What Our Clients Say
        </h2>

        <motion.div
          key={currentFeedback._id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-lg rounded-2xl p-8"
        >
          <h4 className="font-semibold text-lg text-pink-500 mb-2">
            {currentFeedback.name}
          </h4>
          <p className="text-gray-700 italic mb-2">"{currentFeedback.message}"</p>
          {currentFeedback.service && (
            <p className="text-gray-500 text-sm mb-2">
              Service: {currentFeedback.service}
            </p>
          )}
          <p className="text-yellow-500 font-semibold mt-2 flex items-center justify-center gap-1">
            {renderStars(currentFeedback.rating)} ({currentFeedback.rating} / 5)
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
