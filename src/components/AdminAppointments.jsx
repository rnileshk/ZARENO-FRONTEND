import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";


export default function AdminAppointments() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rescheduleData, setRescheduleData] = useState({
    id: null,
    date: "",
    time: "",
  });

  // Fetch all appointments
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/api/appointments`);
      const data = await res.json();
      setAppointments(data || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const updateAppointment = async (url, method = "PUT", body = null) => {
    try {
      const res = await fetch(url, {
        method,
        headers: body ? { "Content-Type": "application/json" } : {},
        body: body ? JSON.stringify(body) : null,
      });
      if (res.ok) fetchAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  // Actions
  const confirmAppointment = (id) =>
    updateAppointment(`${BASE_URL}/api/appointments/confirm/${id}`);
  const cancelAppointment = (id) =>
    updateAppointment(`${BASE_URL}/api/appointments/cancel/${id}`);
  const completeAppointment = (id) =>
    updateAppointment(`${BASE_URL}/api/appointments/complete/${id}`);
  const deleteAppointment = (id) =>
    updateAppointment(`${BASE_URL}/api/appointments/${id}`, "DELETE");
  const rescheduleAppointment = (e) => {
    e.preventDefault();
    updateAppointment(
      `${BASE_URL}/api/appointments/reschedule/${rescheduleData.id}`,
      "PUT",
      { date: rescheduleData.date, time: rescheduleData.time }
    );
    setRescheduleData({ id: null, date: "", time: "" });
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen p-2 max-w-7xl mx-auto">
      <div className="p-2 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-purple-700">Appoinments</h1>
          <Link
            to="/dashboard"
            className="px-2 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
      <div className="mb-4 justify-center text-center">
        <h2 className="text-xl font-semibold mb-2 text-purple-700">
          Appointment List
        </h2>
        <p className="text-gray-600 text-sm">
          Manage and update appointment statuses below.
        </p>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading appointments...</p>
      ) : appointments.length === 0 ? (
        <p className="text-gray-500">No appointments found.</p>
      ) : (
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm whitespace-nowrap shadow-sm rounded-lg">
            <thead className="bg-purple-50">
              <tr>
                <th className="border px-3 py-2 text-left">Name</th>
                <th className="border px-3 py-2 text-left">Email</th>
                <th className="border px-3 py-2 text-left">Phone</th>
                <th className="border px-3 py-2 text-left">Service</th>
                <th className="border px-3 py-2 text-left">Date</th>
                <th className="border px-3 py-2 text-left">Time</th>
                <th className="border px-3 py-2 text-left">Status</th>
                <th className="border px-3 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {appointments.map((a) => (
                  <motion.tr
                    key={a._id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="hover:bg-purple-50 transition-all"
                  >
                    <td className="border px-3 py-2">{a.name}</td>
                    <td className="border px-3 py-2">{a.email}</td>
                    <td className="border px-3 py-2">{a.phone}</td>
                    <td className="border px-3 py-2">{a.service}</td>
                    <td className="border px-3 py-2">{a.date}</td>
                    <td className="border px-3 py-2">{a.time}</td>
                    <td className="border px-3 py-2 capitalize">{a.status}</td>
                    <td className="border px-3 py-2 flex flex-wrap gap-1">
                      {a.status === "pending" && (
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                          onClick={() => confirmAppointment(a._id)}
                        >
                          Confirm
                        </motion.button>
                      )}
                      {a.status !== "cancelled" && (
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                          onClick={() => cancelAppointment(a._id)}
                        >
                          Cancel
                        </motion.button>
                      )}
                      {a.status === "confirmed" && (
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                          onClick={() =>
                            setRescheduleData({
                              id: a._id,
                              date: a.date,
                              time: a.time,
                            })
                          }
                        >
                          Reschedule
                        </motion.button>
                      )}
                      {a.status === "confirmed" && (
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          className="bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700"
                          onClick={() => completeAppointment(a._id)}
                        >
                          Complete
                        </motion.button>
                      )}
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700"
                        onClick={() => deleteAppointment(a._id)}
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
      )}

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4">
        <AnimatePresence>
          {appointments.map((a) => (
            <motion.div
              key={a._id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <p className="font-semibold text-purple-700">{a.name}</p>
              <p className="text-sm text-gray-600">{a.email}</p>
              <p className="text-sm text-gray-600">{a.phone}</p>
              <p className="mt-2">
                <strong>Service:</strong> {a.service}
              </p>
              <p>
                <strong>Date:</strong> {a.date}
              </p>
              <p>
                <strong>Time:</strong> {a.time}
              </p>
              <p className="capitalize">
                <strong>Status:</strong> {a.status}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {a.status === "pending" && (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    onClick={() => confirmAppointment(a._id)}
                  >
                    Confirm
                  </motion.button>
                )}
                {a.status !== "cancelled" && (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    onClick={() => cancelAppointment(a._id)}
                  >
                    Cancel
                  </motion.button>
                )}
                {a.status === "confirmed" && (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    onClick={() =>
                      setRescheduleData({
                        id: a._id,
                        date: a.date,
                        time: a.time,
                      })
                    }
                  >
                    Reschedule
                  </motion.button>
                )}
                {a.status === "confirmed" && (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
                    onClick={() => completeAppointment(a._id)}
                  >
                    Complete
                  </motion.button>
                )}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                  onClick={() => deleteAppointment(a._id)}
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Reschedule Form */}
      {rescheduleData.id && (
        <motion.form
          onSubmit={rescheduleAppointment}
          className="mt-6 p-4 border rounded bg-gray-50 max-w-md"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          <h3 className="text-lg font-semibold mb-2 text-purple-700">
            Reschedule Appointment
          </h3>
          <input
            type="date"
            value={rescheduleData.date}
            onChange={(e) =>
              setRescheduleData({ ...rescheduleData, date: e.target.value })
            }
            className="border px-2 py-1 rounded w-full mb-2"
            required
          />
          <input
            type="time"
            value={rescheduleData.time}
            onChange={(e) =>
              setRescheduleData({ ...rescheduleData, time: e.target.value })
            }
            className="border px-2 py-1 rounded w-full mb-2"
            required
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
              onClick={() =>
                setRescheduleData({ id: null, date: "", time: "" })
              }
            >
              Cancel
            </button>
          </div>
        </motion.form>
      )}
    </div>
  );
}
