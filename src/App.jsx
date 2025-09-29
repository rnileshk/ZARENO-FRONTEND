import { Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ToastContainer } from 'react-toastify'
import Navbar from './components/Navbar'
import Header from './components/Header'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import PackagesPage from './components/PackagesPage'
import BookAppointment from './components/BookAppointment'
import AdminAppointments from './components/AdminAppointments'
import AdminDashboard from './components/AdminDashboard'
import FeedbackPage from './pages/Feedback'
import BlogPage from './components/BlogPage'
import BlogDetail from './components/BlogDetails'
import ContactUs from './components/ContactUs'
import UserMessages from './components/UserMessages'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <Header />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path='/booking' element={<BookAppointment />} />
          <Route path='/dashboard' element={<AdminDashboard />} />
          <Route path="/appoinments" element={<AdminAppointments />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/messages" element={<UserMessages />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer 
        position="top-right"
        autoClose={3000}  // 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      </AnimatePresence>
      <Footer />
    </>
  )
}
