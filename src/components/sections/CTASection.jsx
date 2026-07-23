import { motion } from 'framer-motion'
import Button from '../ui/Button'
import { HiOutlineArrowRight } from 'react-icons/hi2'

export default function CTASection() {
  return (
    <section
      id="cta"
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '100% !important',
        maxWidth: '1280px !important',
        margin: '0 auto !important',
        padding: '4rem 2rem !important',
        boxSizing: 'border-box !important',
      }}
    >
      <motion.div
        style={{
          position: 'relative',
          borderRadius: '1.5rem',
          border: '1px solid var(--c-border)',
          backgroundColor: 'var(--c-card)',
          overflow: 'hidden',
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(88,166,255,0.05), transparent, rgba(63,185,80,0.05))', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.2, pointerEvents: 'none' }} className="bg-grid" />

        <div style={{ position: 'relative', padding: 'clamp(3rem, 5vw, 5rem) clamp(2rem, 4vw, 4rem)', textAlign: 'center' }}>
          <h2
            style={{
              fontSize: 'clamp(28px, 3.5vw, 48px)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
            }}
          >
            Ready to master{' '}
            <span className="gradient-text">Git?</span>
          </h2>
          <p
            style={{
              color: 'var(--c-muted)',
              fontSize: 'clamp(16px, 1.5vw, 18px)',
              maxWidth: '480px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Join thousands of developers learning Git the smart way. Start today — it&apos;s free.
          </p>
          <div
            style={{
              display: 'flex !important',
              justifyContent: 'center !important',
              alignItems: 'center !important',
              gap: '1rem !important',
              marginTop: '2rem !important',
            }}
            className="flex-col sm:!flex-row"
          >
            <Button variant="primary" size="lg" href="/register" iconRight={HiOutlineArrowRight}>Get Started Free</Button>
            <Button variant="secondary" size="lg" href="/learn">Browse Lessons</Button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
