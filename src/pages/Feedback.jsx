import { useState } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FeedbackPage() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // New loading state

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !rating) {
      toast.error("⚠️ Please fill all required fields.");
      return;
    }

    setLoading(true); // Start loader
    try {
      const res = await fetch(`${BASE_URL}/api/feedbacks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, service, rating, message }),
      });

      if (res.ok) {
        toast.success("✨ Thank you for your feedback!");
        setName("");
        setEmail("");
        setService("");
        setRating(0);
        setMessage("");
      } else {
        const data = await res.json();
        toast.error(`❌ ${data.message || "Failed to submit feedback."}`);
      }
    } catch (err) {
      console.error(err);
      toast.error("⚡ Something went wrong!");
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto p-4 bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl shadow-xl mt-10"
      >
        <h2 className="text-4xl font-extrabold text-center text-pink-700 mb-2">
          💖 We Value Your Feedback
        </h2>
        <p className="text-center text-gray-600 mb-2">
          Help us improve your experience at{" "}
          <span className="font-semibold text-pink-600">ZARENO Parlour</span>.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Your Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-pink-400"
            required
          />
          <input
            type="email"
            placeholder="Your Email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-pink-400"
            required
          />
          <input
            type="text"
            placeholder="Service Name (optional)"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="border rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-pink-400"
          />

          {/* Rating */}
          <div className="flex items-center gap-2">
            <span className="text-gray-700 font-medium">Rate Us:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                type="button"
                whileHover={{ scale: 1.2 }}
                onClick={() => setRating(star)}
                className={`text-3xl focus:outline-none ${
                  star <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </motion.button>
            ))}
          </div>

          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border rounded-lg px-4 py-3 w-full resize-none focus:ring-2 focus:ring-pink-400"
            rows={4}
          />

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            type="submit"
            disabled={loading}
            className="bg-pink-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-pink-700 transition-all font-semibold text-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
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
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                Sending...
              </>
            ) : (
              "Submit Feedback"
            )}
          </motion.button>
        </form>
      </motion.div>
    </>
  );
}
