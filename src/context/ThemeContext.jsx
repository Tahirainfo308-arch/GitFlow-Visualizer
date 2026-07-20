import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const ThemeContext = createContext()

function getSystemPreference() {
  if (typeof window === 'undefined') return true
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function getStoredTheme() {
  try {
    const stored = localStorage.getItem('gitflow-theme')
    if (stored === 'dark' || stored === 'light') return stored
    if (stored === 'system') return null
  } catch {}
  return null
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const stored = getStoredTheme()
    if (stored) return stored
    return getSystemPreference() ? 'dark' : 'light'
  })

  const isDark = theme === 'dark'

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    root.style.colorScheme = theme
    try { localStorage.setItem('gitflow-theme', theme) } catch {}
  }, [theme])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e) => {
      try {
        const stored = localStorage.getItem('gitflow-theme')
        if (!stored || stored === 'system') {
          setTheme(e.matches ? 'dark' : 'light')
        }
      } catch {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }, [])

  const value = { theme, isDark, toggleTheme, setTheme }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
