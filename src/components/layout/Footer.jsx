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
    <footer className="border-t border-border">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 py-12 sm:py-16">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-[image:var(--btn-gradient)] flex items-center justify-center shadow-sm">
                <SiGitbook className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-[17px] tracking-tight">
                GitFlow<span className="text-primary ml-1">Visualizer</span>
              </span>
            </Link>
            <p className="text-sm text-muted leading-relaxed mb-5 max-w-[260px]">
              Master Git visually. Interactive lessons, real-time visualizations, and hands-on practice.
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label} className="w-9 h-9 rounded-xl flex items-center justify-center text-muted hover:text-text hover:bg-surface transition-colors duration-200">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-bold mb-4 sm:mb-5">{category}</h3>
              <ul className="space-y-2.5 sm:space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-sm text-muted hover:text-text transition-colors duration-200">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-xs text-muted">&copy; {new Date().getFullYear()} GitFlow Visualizer. All rights reserved.</p>
          <div className="flex items-center gap-4 sm:gap-5">
            <a href="#" className="text-xs text-muted hover:text-text transition-colors">Terms</a>
            <a href="#" className="text-xs text-muted hover:text-text transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
