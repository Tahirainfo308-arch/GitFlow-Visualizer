import { motion, AnimatePresence } from 'framer-motion'
import { HiXMark } from 'react-icons/hi2'

export default function Sidebar({ isOpen, onClose, children, title }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed top-0 left-0 h-full w-72 bg-card border-r border-border z-50 flex flex-col"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="font-semibold">{title}</h2>
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-muted hover:text-text hover:bg-card-hover transition-colors"
              >
                <HiXMark className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">{children}</div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
