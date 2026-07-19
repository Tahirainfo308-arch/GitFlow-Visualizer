import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiChevronDown } from 'react-icons/hi2'

export default function Dropdown({
  trigger,
  children,
  align = 'left',
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const alignMap = {
    left: 'left-0',
    right: 'right-0',
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`absolute top-full mt-2 ${alignMap[align]} min-w-[200px] bg-card border border-border rounded-xl shadow-2xl py-2 z-50`}
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setIsOpen(false)}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function DropdownItem({ children, onClick, icon: Icon, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-muted hover:text-text hover:bg-card-hover transition-colors ${className}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  )
}
