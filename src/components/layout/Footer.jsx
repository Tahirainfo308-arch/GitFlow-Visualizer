import { Link } from 'react-router-dom'
import { SiGitbook } from 'react-icons/si'
import { FiGithub, FiTwitter, FiLinkedin, FiYoutube } from 'react-icons/fi'

const footerLinks = {
  Product: [
    { name: 'Features', path: '/#features' },
    { name: 'Playground', path: '/playground' },
    { name: 'Challenges', path: '/challenges' },
    { name: 'Certificates', path: '/certificates' },
  ],
  Learn: [
    { name: 'Lessons', path: '/learn' },
    { name: 'Quiz', path: '/quiz' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Leaderboard', path: '/leaderboard' },
  ],
  Company: [
    { name: 'About', path: '/about' },
    { name: 'Login', path: '/login' },
    { name: 'Register', path: '/register' },
  ],
}

const socialLinks = [
  { icon: FiGithub, href: '#', label: 'GitHub' },
  { icon: FiTwitter, href: '#', label: 'Twitter' },
  { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
  { icon: FiYoutube, href: '#', label: 'YouTube' },
]

export default function Footer() {
  return (
    <footer
      style={{
        width: '100%',
        borderTop: '1px solid #e2e8f0',
        backgroundColor: '#ffffff',
        padding: '3rem 0 1.5rem 0',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          width: '100%',
          margin: '0 auto',
          paddingLeft: '2rem',
          paddingRight: '2rem',
          boxSizing: 'border-box',
        }}
      >
        {/* Top: Brand + Link Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: '2.5rem',
            width: '100%',
            alignItems: 'start',
          }}
        >
          {/* Brand Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: '#0284c7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <SiGitbook style={{ width: '16px', height: '16px', color: '#ffffff' }} />
              </div>
              <span style={{ fontWeight: 800, fontSize: '17px', letterSpacing: '-0.02em', color: 'var(--c-text)' }}>
                GitFlow<span style={{ color: 'var(--c-primary)', marginLeft: '4px' }}>Visualizer</span>
              </span>
            </Link>
            <p style={{ fontSize: '14px', color: 'var(--c-muted)', lineHeight: 1.7, maxWidth: '260px' }}>
              Master Git visually. Interactive lessons, real-time visualizations, and hands-on practice.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '0.25rem' }}>
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--c-muted)',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                >
                  <Icon style={{ width: '16px', height: '16px' }} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 style={{ fontWeight: 600, fontSize: '14px', marginBottom: '1rem', color: 'var(--c-text)' }}>
                {category}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {links.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    style={{
                      fontSize: '14px',
                      color: 'var(--c-muted)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom: Copyright + Legal */}
        <div
          style={{
            marginTop: '2.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid #f1f5f9',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.875rem',
            color: '#64748b',
          }}
        >
          <p>&copy; {new Date().getFullYear()} GitFlow Visualizer. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#" style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.2s' }}>Terms</a>
            <a href="#" style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.2s' }}>Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
