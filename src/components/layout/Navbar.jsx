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
        <div className="max-w-[1400px] mx-auto px-6">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '72px',
              gap: '1.5rem',
            }}
          >
            {/* GROUP 1: Brand */}
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
              <div className="w-8 h-8 rounded-lg bg-[image:var(--btn-gradient)] flex items-center justify-center shadow-sm">
                <SiGitbook className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-[17px] tracking-tight hidden sm:block">
                GitFlow<span className="text-primary ml-1">Visualizer</span>
              </span>
            </Link>

            {/* GROUP 2: Nav links pill (desktop only) */}
            <div
              className="hidden lg:flex"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 20px',
                borderRadius: '9999px',
                backgroundColor: 'var(--c-surface)',
                border: '1px solid var(--c-border)',
                flexShrink: 0,
              }}
            >
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    style={{
                      display: 'inline-block',
                      padding: '8px 16px',
                      fontSize: '13px',
                      fontWeight: 500,
                      borderRadius: '9999px',
                      whiteSpace: 'nowrap',
                      color: isActive ? 'var(--c-primary)' : 'var(--c-muted)',
                      backgroundColor: isActive ? 'rgba(88,166,255,0.1)' : 'transparent',
                      transition: 'all 0.2s ease',
                      textDecoration: 'none',
                    }}
                  >
                    {link.name}
                  </Link>
                )
              })}
            </div>

            {/* GROUP 3: Theme toggle + Auth buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--c-muted)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
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

              <div className="hidden sm:flex" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Button variant="ghost" size="sm" href="/login">Login</Button>
                <Button variant="primary" size="sm" href="/register">Get Started</Button>
              </div>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--c-muted)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
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

      {/* Mobile menu */}
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
