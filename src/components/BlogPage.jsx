// BlogSlider.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Skincare Tips for Glowing Skin",
    image: "/skincare.avif",
    snippet:
      "Discover expert skincare tips that will keep your skin radiant and healthy throughout the year.",
  },
  {
    id: 2,
    title: "Trending Haircuts & Hairstyles for 2025",
    image: "/haircare.avif",
    snippet:
      "Stay ahead of the trends! Check out the hottest hairstyles and haircuts for this year.",
  },
  {
    id: 3,
    title: "Essential Grooming Tips for Men & Women",
    image: "/about2.avif",
    snippet:
      "Our professional tips to maintain your best look at all times, whether at home or on-the-go.",
  },
  {
    id: 4,
    title: "DIY Beauty Treatments You Can Safely Try",
    image: "/makeover.avif",
    snippet:
      "Learn safe and effective DIY beauty treatments from our experts to pamper yourself at home.",
  },
  {
    id: 5,
    title: "Trending Nail Art Designs for Every Occasion",
    image: "/nail1.avif",
    snippet:
      "Explore the latest nail art designs that are perfect for any event or everyday wear.",
  },
  {
    id: 6,
    title: "Medicure And Pedicure: Benefits & Care Tips",
    image: "/medi.avif",
    snippet:
      "Understand the benefits of medicure and pedicure treatments and how to care for your nails.",
  },
  {
    id: 7,
    title: "Seasonal Skincare Routines You Should Follow",
    image: "/skincare.avif",
    snippet:
      "Adapt your skincare routine to the changing seasons with our expert advice.",
  },
  {
    id: 8,
    title: "Hair Care Myths Debunked by Professionals",
    image: "/haircare.avif",
    snippet:
      "Get the facts straight! We debunk common hair care myths with insights from industry experts.",
  },
];

export default function BlogSlider() {
  const [current, setCurrent] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % blogPosts.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % blogPosts.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + blogPosts.length) % blogPosts.length);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 relative">
      <h1 className="text-4xl font-bold text-center mb-4">Our Blog</h1>

      <div className="overflow-hidden relative">
        <AnimatePresence initial={false}>
          <motion.div
            key={blogPosts[current].id}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={blogPosts[current].image}
              alt={blogPosts[current].title}
              className="w-full h-42 object-cover"
            />
            <div className="p-2">
              <h2 className="text-2xl font-semibold mb-2">
                {blogPosts[current].title}
              </h2>
              <p className="text-gray-600 mb-4">{blogPosts[current].snippet}</p>
              <Link
                to={`/blog/${blogPosts[current].id}`}
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Read More →
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
