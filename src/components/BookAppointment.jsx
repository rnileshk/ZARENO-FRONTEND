import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function BookAppointment() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // new loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // start loading
    try {
      const res = await fetch(`${BASE_URL}/api/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", phone: "", service: "", date: "", time: "" });
        toast.success("Appointment booked! Please check your email for confirmation.");
        setTimeout(() => setSuccess(false), 4000);
      } else {
        alert(data.message || "Error booking appointment");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Try again later.");
    } finally {
      setLoading(false); // stop loading
    }
  };

  // Generate 30-min time slots from 11:00 AM to 8:00 PM
  const generateTimeSlots = () => {
    const slots = [];
    let start = 11 * 60; // 11:00 AM in minutes
    const end = 20 * 60; // 8:00 PM in minutes

    while (start <= end) {
      let hours = Math.floor(start / 60);
      const minutes = start % 60;
      const period = hours >= 12 ? "PM" : "AM";
      if (hours > 12) hours -= 12;
      if (hours === 0) hours = 12;
      const timeStr = `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
      slots.push(timeStr);
      start += 60;
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="bg-gradient-to-br from-pink-50 via-pink-100 to-pink-50 flex items-center justify-center p-5">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-2 sm:p-10"
      >
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Book Your Appointment
        </h2>

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-2 p-3 bg-green-100 text-green-800 rounded-md text-center font-medium"
          >
            Appointment booked successfully!
          </motion.div>
        )}

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          {/* Inputs */}
          <motion.input whileFocus={{ scale: 1.02, borderColor: "#ec4899" }} transition={{ type: "spring", stiffness: 300 }}
            type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required
            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <motion.input whileFocus={{ scale: 1.02, borderColor: "#ec4899" }} transition={{ type: "spring", stiffness: 300 }}
            type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required
            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <motion.input whileFocus={{ scale: 1.02, borderColor: "#ec4899" }} transition={{ type: "spring", stiffness: 300 }}
            type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required
            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <motion.select whileFocus={{ scale: 1.02, borderColor: "#ec4899" }} transition={{ type: "spring", stiffness: 300 }}
            name="service" value={formData.service} onChange={handleChange} required
            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="">Select Service</option>
            <option value="Haircut">Haircut</option>
            <option value="Facial">Facial</option>
            <option value="Massage">Massage</option>
            <option value="Manicure">Manicure</option>
          </motion.select>
          <motion.input whileFocus={{ scale: 1.02, borderColor: "#ec4899" }} transition={{ type: "spring", stiffness: 300 }}
            type="date" name="date" value={formData.date} onChange={handleChange} required
            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <motion.select whileFocus={{ scale: 1.02, borderColor: "#ec4899" }} transition={{ type: "spring", stiffness: 300 }}
            name="time" value={formData.time} onChange={handleChange} required
            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="" disabled>Select a time slot</option>
            {timeSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
          </motion.select>

          {/* Submit Button with Loader */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="bg-pink-600 text-white py-3 rounded-2xl font-semibold hover:bg-pink-700 transition-all duration-200 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
            ) : null}
            {loading ? "Booking..." : "Book Appointment"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
