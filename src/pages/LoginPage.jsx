import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { SiGitbook } from 'react-icons/si'
import { HiOutlineEnvelope, HiOutlineLockClosed, HiOutlineArrowRight } from 'react-icons/hi2'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-grid bg-radial">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-green flex items-center justify-center">
              <SiGitbook className="w-5 h-5 text-bg" />
            </div>
          </Link>
          <h1 className="font-poppins text-2xl font-bold mb-2">Welcome back</h1>
          <p className="text-sm text-muted">
            Sign in to continue your Git learning journey.
          </p>
        </div>

        <Card padding="p-8" hover={false}>
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <HiOutlineEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-bg border border-border rounded-lg text-sm text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Password</label>
                <a href="#" className="text-xs text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-2.5 bg-bg border border-border rounded-lg text-sm text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
              </div>
            </div>
            <Button variant="primary" size="lg" className="w-full" iconRight={HiOutlineArrowRight}>
              Sign In
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-card text-muted">or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="secondary" size="md" className="w-full">
              GitHub
            </Button>
            <Button variant="secondary" size="md" className="w-full">
              Google
            </Button>
          </div>

          <p className="text-center text-sm text-muted mt-6">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  )
}
