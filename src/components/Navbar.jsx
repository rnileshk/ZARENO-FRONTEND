import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Dialog } from "@headlessui/react";
import { toast } from "react-toastify";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false); // Loader state

  const navigate = useNavigate();

  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "admin123";

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
    setIsAdmin(adminLoggedIn);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loader
    try {
      // Simulate login delay (replace with real API if needed)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        localStorage.setItem("adminLoggedIn", "true");
        setIsAdmin(true);
        setIsLoginOpen(false);
        setUsername("");
        setPassword("");
        toast.success("Admin logged in successfully");
        navigate("/dashboard");
      } else {
        toast.error("Invalid admin credentials");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    } finally {
      setLoading(false); // Stop loader
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    setIsAdmin(false);
    navigate("/");
    toast.info("Admin logged out");
  };

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 w-full z-50 border-b border-gray-800 shadow-sm backdrop-blur-md bg-[#FFFDD0]/90"
      >
        <div className="mx-auto max-w-6xl px-1 py-1 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center font-bold text-lg text-gray-900"
          >
            <motion.img
              src="/zareno.png"
              alt="Logo"
              className="h-10 w-auto mr-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            />
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <NavLinks
              onClick={() => {}}
              onLoginClick={() => setIsLoginOpen(true)}
              isAdmin={isAdmin}
              handleLogout={handleLogout}
            />
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-900 focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="inset-0 bg-pink-500 z-30 md:hidden"
                onClick={() => setIsOpen(false)}
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="fixed top-0 right-0 h-full w-2/3 z-40 md:hidden p-6 flex flex-col shadow-lg bg-[#FFD1DC]"
              >
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-900 hover:text-pink-600"
                  >
                    <X size={28} />
                  </button>
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  <NavLinks
                    onClick={() => setIsOpen(false)}
                    onLoginClick={() => setIsLoginOpen(true)}
                    isAdmin={isAdmin}
                    handleLogout={handleLogout}
                  />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Admin Login Modal */}
      <AnimatePresence>
        {isLoginOpen && (
          <Dialog
            open={isLoginOpen}
            onClose={() => setIsLoginOpen(false)}
            className="relative z-50"
          >
            <motion.div
              className="fixed inset-0 bg-black/40"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 50 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Dialog.Panel className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8">
                  <div className="flex justify-start">
                    <img src="/logo.png" alt="Logo" className="h-12 w-auto mb-4" />
                  </div>

                  <Dialog.Title className="text-2xl font-bold text-pink-900 text-center mb-2">
                    Login to your account
                  </Dialog.Title>
                  <p className="text-gray-600 text-center text-sm mb-6">
                    Welcome back! Please enter your details.
                  </p>

                  <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Admin Username
                      </label>
                      <input
                        type="text"
                        placeholder="Enter username"
                        className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-pink-400 outline-none"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        placeholder="Enter password"
                        className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-pink-400 outline-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>

                    {/* Login Button with Loader */}
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.05 }}
                      type="submit"
                      className="bg-pink-600 text-white py-2 rounded-lg shadow-md hover:bg-pink-700 transition-all font-semibold flex items-center justify-center"
                      disabled={loading}
                    >
                      {loading && (
                        <svg
                          className="animate-spin h-5 w-5 mr-2 text-white"
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
                      {loading ? "Logging in..." : "Login"}
                    </motion.button>
                  </form>
                </Dialog.Panel>
              </motion.div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLinks({ onClick, onLoginClick, isAdmin, handleLogout }) {
  return (
    <>
      <Link
        to="/packages"
        onClick={onClick}
        className="hover:bg-pink-600 hover:text-white px-4 py-2 rounded-md text-base font-medium transition"
      >
        Packages
      </Link>
      <Link
        to="/booking"
        onClick={onClick}
        className="hover:bg-pink-600 hover:text-white px-4 py-2 rounded-md text-base font-medium transition"
      >
        Appointment
      </Link>
      <Link
        to="/blogs"
        onClick={onClick}
        className="hover:bg-pink-600 hover:text-white px-4 py-2 rounded-md text-base font-medium transition"
      >
        Blogs
      </Link>
      <Link
        to="/contactus"
        onClick={onClick}
        className="hover:bg-pink-600 hover:text-white px-4 py-2 rounded-md text-base font-medium transition"
      >
        Contact Us
      </Link>
      <Link
        to="/career"
        onClick={onClick}
        className="text-pink-600 border border-pink-600 hover:bg-pink-600 hover:text-white px-4 py-2 rounded-md text-base font-medium transition"
      >
        Career
      </Link>

      {isAdmin ? (
        <>
          <Link
            to="/dashboard"
            onClick={onClick}
            className="bg-blue-800 hover:bg-blue-400 text-white px-4 py-2 rounded-md text-base font-medium transition"
          >
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-400 text-white px-4 py-2 rounded-md text-base font-medium transition"
          >
            Logout
          </button>
        </>
      ) : (
        <button
          onClick={onLoginClick}
          className="hover:bg-pink-600 hover:text-white px-4 py-2 rounded-md text-base font-medium transition"
        >
          Admin Login
        </button>
      )}
    </>
  );
}
