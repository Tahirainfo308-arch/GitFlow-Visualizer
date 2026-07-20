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
  { name: 'Home', path: '/' },
  { name: 'Learn', path: '/learn' },
  { name: 'Playground', path: '/playground' },
  { name: 'Challenges', path: '/challenges' },
  { name: 'Quiz', path: '/quiz' },
  { name: 'Leaderboard', path: '/leaderboard' },
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Certificates', path: '/certificates' },
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
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-bg/80 backdrop-blur-xl border-b border-border shadow-lg shadow-black/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-green flex items-center justify-center">
                <SiGitbook className="w-4 h-4 text-bg" />
              </div>
              <span className="font-poppins font-bold text-lg tracking-tight hidden sm:block">
                GitFlow <span className="text-primary">Visualizer</span>
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    location.pathname === link.path
                      ? 'text-primary bg-primary/10'
                      : 'text-muted hover:text-text hover:bg-card'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2 rounded-lg text-muted hover:text-text hover:bg-card transition-colors"
              >
                {isDark ? (
                  <HiOutlineSun className="w-5 h-5" />
                ) : (
                  <HiOutlineMoon className="w-5 h-5" />
                )}
              </motion.button>

              <div className="hidden sm:flex items-center gap-2">
                <Button variant="ghost" size="sm" href="/login">
                  Login
                </Button>
                <Button variant="primary" size="sm" href="/register">
                  Register
                </Button>
              </div>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg text-muted hover:text-text hover:bg-card transition-colors"
              >
                {mobileOpen ? (
                  <HiXMark className="w-5 h-5" />
                ) : (
                  <HiBars3 className="w-5 h-5" />
                )}
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
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-card border-l border-border p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-poppins font-bold text-lg">
                  GitFlow <span className="text-primary">Visualizer</span>
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1 rounded-lg text-muted hover:text-text hover:bg-card-hover transition-colors"
                >
                  <HiXMark className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-1 flex-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                      location.pathname === link.path
                        ? 'text-primary bg-primary/10'
                        : 'text-muted hover:text-text hover:bg-card-hover'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Button variant="secondary" size="md" href="/login" icon={HiOutlineUser} className="w-full">
                  Login
                </Button>
                <Button variant="primary" size="md" href="/register" className="w-full">
                  Register
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
