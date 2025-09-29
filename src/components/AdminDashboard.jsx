import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  // Fetch appointments
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/api/appointments`);
      const data = await res.json();
      setAppointments(data || []);

      // Count pending appointments
      const pending = data.filter(a => a.status === "pending").length;
      setPendingCount(pending);

      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  // Fetch unread messages count
  const fetchUnreadCount = async () => {
    try {
      const res = await fetch(`${BASE_URL}/contact/unread/count`);
      const data = await res.json();
      setUnreadCount(data.unreadCount || 0);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchUnreadCount();

    const interval = setInterval(() => {
      fetchAppointments();
      fetchUnreadCount();
    }, 60000); // refresh every 60 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-orange-300 text-black";
      case "confirmed": return "bg-blue-400 text-black";
      case "completed": return "bg-green-400 text-black";
      case "cancelled": return "bg-red-400 text-black";
      case "rescheduled": return "bg-purple-300 text-black";
      default: return "bg-gray-200 text-black";
    }
  };

  const statusCounts = appointments.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen p-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-pink-500">ZARENO Admin Dashboard</h1>
        <Link
          to="/dashboard"
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
        >
          Back to Dashboard
        </Link>
      </div>

      {/* Status Summary */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        {["pending", "confirmed", "completed", "cancelled", "rescheduled"].map(status => (
          <div
            key={status}
            className={`w-40 h-20 flex items-center justify-center text-center px-4 py-4 rounded font-semibold ${getStatusColor(status)}`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}: {statusCounts[status] || 0}
          </div>
        ))}

        {/* Manage Bookings with pending badge */}
        <Link
          to="/appoinments"
          className="relative w-45 h-20 flex items-center justify-center text-black px-4 py-4 rounded font-semibold bg-blue-500 hover:bg-blue-700 hover:text-white"
        >
          Manage Bookings
          {pendingCount > 0 && (
            <span className="absolute top-1 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              {pendingCount}
            </span>
          )}
        </Link>

        {/* Manage Messages with unread badge */}
        <Link
          to="/messages"
          className="relative w-45 h-20 flex items-center justify-center text-black px-4 py-4 rounded font-semibold bg-blue-500 hover:bg-blue-700 hover:text-white"
        >
          Manage Messages
          {unreadCount > 0 && (
            <span className="absolute top-1 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </Link>
      </div>

      {/* Live Report Table */}
      <h3 className="text-2xl font-bold text-black mb-4 text-center">Live Report</h3>
      {loading ? (
        <p className="text-gray-500">Loading appointments...</p>
      ) : appointments.length === 0 ? (
        <p className="text-gray-500">No appointments found.</p>
      ) : (
        <div className="overflow-x-auto hidden md:block">
          <table className="w-full border-collapse border border-gray-300 shadow-sm rounded-lg">
            <thead className="bg-gray-400">
              <tr>
                <th className="border px-3 py-2 text-left">Name</th>
                <th className="border px-3 py-2 text-left">Service</th>
                <th className="border px-3 py-2 text-left">Date</th>
                <th className="border px-3 py-2 text-left">Time</th>
                <th className="border px-3 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {appointments.map(a => (
                  <motion.tr
                    key={a._id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="hover:bg-purple-100 transition-all"
                  >
                    <td className="border px-3 py-2">{a.name}</td>
                    <td className="border px-3 py-2">{a.service}</td>
                    <td className="border px-3 py-2">{a.date}</td>
                    <td className="border px-3 py-2">{a.time}</td>
                    <td className={`border px-3 py-2 rounded text-center font-semibold ${getStatusColor(a.status)}`}>
                      {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
