import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import FeedbackPage from "../pages/Feedback";

export default function ContactUs() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // <-- new state

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setIsSubmitting(true); // start loader

      const response = await fetch(`${BASE_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        toast.success("Message sent successfully!");
      } else {
        toast.error(data.error || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error. Please try again later.");
    } finally {
      setIsSubmitting(false); // stop loader
    }
  };

  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto px-6 py-6"
    >
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 text-center">
        Contact Us
      </h1>
      <p className="text-center text-gray-600 mb-12">
        Have questions or feedback? We'd love to hear from you! Fill out the form below and we’ll get back to you shortly.
      </p>

      <div className="grid md:grid-cols-2 gap-12 shadow-2xl p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50">
        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-8 shadow-3xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {submitted && (
            <p className="text-green-600 font-semibold mb-4">
              Thank you! Your message has been sent.
            </p>
          )}

          {/* Form Inputs */}
          <div className="mb-2">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div className="mb-2">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div className="mb-2">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="subject">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject (optional)"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-2">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            disabled={isSubmitting} // disable while sending
          >
            {isSubmitting && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
            {isSubmitting ? "Sending…" : "Send Message"}
          </button>
        </motion.form>

        {/* Contact Info + Map */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white shadow-2xl rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Get in Touch</h2>
            <p className="text-gray-600 mb-4">
              We'd love to hear from you! Reach us through the following ways:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Address:</strong> 123 Main Street, Your City, Country</li>
              <li><strong>Email:</strong> support@example.com</li>
              <li><strong>Phone:</strong> +91 123 456 7890</li>
            </ul>
          </div>

          <div className="bg-white shadow-2xl rounded-xl overflow-hidden h-64">
            <iframe
              title="Office Location"
              src="https://maps.google.com/maps?q=New%20Delhi&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              className="border-0"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </motion.div>
    <FeedbackPage />
    </>
  );
}
