import { motion } from 'framer-motion'

export default function Page({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ type: 'spring', stiffness: 120, damping: 16 }}
      className="mx-auto max-w-6xl px-4 py-6"
    >
      {children}
    </motion.main>
  )
}
