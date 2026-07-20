import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollPosition } from '../../hooks/useScrollPosition'
import { useTheme } from '../../context/ThemeContext'
import Button from '../ui/Button'
import {
  HiOutlineSun,
  HiOutlineMoon,
  HiBars3,
  HiXMark,
  HiOutlineUser,
} from 'react-icons/hi2'
import { SiGitbook } from 'react-icons/si'

const navLinks = [
  { name: 'Features', path: '/#features' },
  { name: 'Learn', path: '/learn' },
  { name: 'Playground', path: '/playground' },
  { name: 'Pricing', path: '/#cta' },
  { name: 'About', path: '/about' },
]

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const { isScrolled } = useScrollPosition()
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass shadow-lg shadow-black/[0.03]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-[72px]">

            <Link to="/" className="flex items-center gap-2.5 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-[image:var(--btn-gradient)] flex items-center justify-center shadow-sm">
                <SiGitbook className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-[17px] tracking-tight hidden sm:block">
                GitFlow<span className="text-primary ml-1">Visualizer</span>
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-1 bg-surface/60 border border-border/50 rounded-full px-2 py-1.5">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-1.5 text-[13px] font-medium rounded-full transition-all duration-200 ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted hover:text-text hover:bg-card/60'
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              })}
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-muted hover:text-text hover:bg-surface transition-colors duration-200"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  {isDark ? (
                    <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <HiOutlineSun className="w-[18px] h-[18px]" />
                    </motion.div>
                  ) : (
                    <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <HiOutlineMoon className="w-[18px] h-[18px]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              <div className="hidden sm:flex items-center gap-2">
                <Button variant="ghost" size="sm" href="/login">Login</Button>
                <Button variant="primary" size="sm" href="/register">Get Started</Button>
              </div>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-muted hover:text-text hover:bg-surface transition-colors"
              >
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }} transition={{ duration: 0.15 }}>
                      <HiXMark className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }} transition={{ duration: 0.15 }}>
                      <HiBars3 className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-overlay backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-card border-l border-border p-8 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between mb-10">
                <span className="font-extrabold text-lg">
                  GitFlow<span className="text-primary ml-1">Visualizer</span>
                </span>
                <button onClick={() => setMobileOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-text hover:bg-surface transition-colors">
                  <HiXMark className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-1 flex-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                      location.pathname === link.path
                        ? 'text-primary bg-primary/10'
                        : 'text-muted hover:text-text hover:bg-surface'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-3 pt-6 border-t border-border">
                <Button variant="secondary" size="md" href="/login" icon={HiOutlineUser} className="w-full">Login</Button>
                <Button variant="primary" size="md" href="/register" className="w-full">Get Started</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
