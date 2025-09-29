import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function UserMessages() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/contact`); // backend endpoint
      const data = await res.json();
      setMessages(data || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
  await fetch(`${BASE_URL}/contact/${id}/read`, { method: "PUT" });
  setMessages(prev => prev.map(msg => msg._id === id ? { ...msg, read: true } : msg));
};

const handleDelete = async (id) => {
  await fetch(`${BASE_URL}/contact/${id}`, { method: "DELETE" });
  setMessages(prev => prev.filter(msg => msg._id !== id));
};

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 60000); // auto-refresh
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen p-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-pink-500">User Messages</h1>
        <Link
          to="/dashboard"
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
        >
          Back to Dashboard
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="text-gray-500">No messages found.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="overflow-x-auto hidden md:block">
            <table className="w-full border-collapse border border-gray-300 shadow-sm rounded-lg">
              <thead className="bg-gray-400">
                <tr>
                  <th className="border px-3 py-2 text-left">Name</th>
                  <th className="border px-3 py-2 text-left">Email</th>
                  <th className="border px-3 py-2 text-left">Subject</th>
                  <th className="border px-3 py-2 text-left">Message</th>
                  <th className="border px-3 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {messages.map((m) => (
                    <motion.tr
                      key={m._id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="hover:bg-purple-50 transition-all"
                    >
                      <td className="border px-3 py-2">{m.name}</td>
                      <td className="border px-3 py-2">{m.email}</td>
                      <td className="border px-3 py-2">{m.subject || "N/A"}</td>
                      <td className="border px-3 py-2">{m.message}</td>
                      <td className="border px-3 py-2 text-center flex gap-2 justify-center">
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          whileHover={{ scale: 1.05 }}
                          onClick={() => handleMarkAsRead(m._id)}
                          className={`px-3 py-1 rounded text-white ${
                            m.read
                              ? "bg-green-400 cursor-not-allowed"
                              : "bg-green-600 hover:bg-green-700"
                          }`}
                          disabled={m.read}
                        >
                          {m.read ? "Read" : "Mark as Read"}
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          whileHover={{ scale: 1.05 }}
                          onClick={() => handleDelete(m._id)}
                          className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                        >
                          Delete
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden flex flex-col gap-4 mt-4">
            <AnimatePresence>
              {messages.map((m) => (
                <motion.div
                  key={m._id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
                >
                  <p className="font-semibold text-purple-700">{m.name}</p>
                  <p className="text-sm text-gray-600">{m.email}</p>
                  <p className="text-sm text-gray-600">
                    <strong>Subject:</strong> {m.subject || "N/A"}
                  </p>
                  <p className="text-sm text-gray-700 mt-2">{m.message}</p>

                  {/* Action buttons */}
                  <div className="flex gap-2 mt-3">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleMarkAsRead(m._id)}
                      className={`flex-1 px-3 py-1 rounded text-white ${
                        m.read
                          ? "bg-green-400 cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                      disabled={m.read}
                    >
                      {m.read ? "Read" : "Mark as Read"}
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleDelete(m._id)}
                      className="flex-1 px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                    >
                      Delete
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );
}
