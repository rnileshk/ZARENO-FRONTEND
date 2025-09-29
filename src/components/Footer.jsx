import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="text-pink-50 bg-gray-800 py-10 mt-10 border-t border-gray-300">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h3 className="text-xl font-bold text-pink-600 mb-3">ZARENO</h3>
          <p className="text-white-700 text-sm">
            ZARENO is dedicated to providing top-notch beauty and wellness services with a personal touch. Our team ensures every visit is relaxing and rejuvenating.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/packages" className="hover:text-pink-600 transition">
                Packages
              </Link>
            </li>
            <li>
              <Link to="/booking" className="hover:text-pink-600 transition">
                Book Appointment
              </Link>
            </li>
            <li>
              <Link to="/blogs" className="hover:text-pink-600 transition">
                Blogs
              </Link>
            </li>
            <li>
              <Link to="/contactus" className="hover:text-pink-600 transition">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/career" className="hover:text-pink-600 transition">
                Career
              </Link>
            </li>
            <li>
              <Link to="/feedback" className="hover:text-pink-600 transition">
                Feedback
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Info</h3>
          <ul className="space-y-2 text-gray-700 text-sm text-white">
            <li>📍 123 Beauty Street, Mumbai, India</li>
            <li>📞 +91 98765 43210</li>
            <li>✉️ info@zareno.com</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-white-700 hover:text-pink-600 transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-white-700 hover:text-pink-600 transition">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-white-700 hover:text-pink-600 transition">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-white-700 hover:text-pink-600 transition">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 text-center text-white-500 text-sm">
        &copy; {new Date().getFullYear()} ZARENO. All rights reserved.
      </div>
    </footer>
  );
}
