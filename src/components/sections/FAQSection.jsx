import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { staggerContainer, staggerItem } from '../../animations/variants'
import { HiChevronDown } from 'react-icons/hi2'

const faqs = [
  { q: 'Is GitFlow Visualizer completely free?', a: 'Yes! All lessons, the interactive playground, challenges, and quizzes are available at no cost.' },
  { q: 'Do I need any prior Git knowledge?', a: 'Not at all. Our learning path starts from basics and builds up to advanced topics like rebase and cherry-picking.' },
  { q: 'How does the interactive playground work?', a: "The playground provides a simulated Git environment in your browser. Run commands and see the branch graph update in real-time." },
  { q: 'Can I use this on mobile?', a: 'Absolutely. GitFlow Visualizer is fully responsive and works great on all devices.' },
  { q: 'How do challenges and the leaderboard work?', a: 'Challenges are real-world Git scenarios. Solve them to earn XP and climb the leaderboard.' },
  { q: 'What makes this different from other Git tutorials?', a: 'Unlike static tutorials, we provide real-time visual feedback. You see branches form, merges happen, and commits connect.' },
]

function FAQItem({ faq }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <motion.div variants={staggerItem}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left"
        style={{
          display: 'block',
          width: '100%',
          textAlign: 'left',
          padding: '20px 24px',
          borderRadius: '16px',
          border: isOpen ? '1px solid rgba(88,166,255,0.3)' : '1px solid var(--c-border)',
          backgroundColor: isOpen ? 'rgba(88,166,255,0.05)' : 'var(--c-card)',
          transition: 'all 0.2s ease',
          cursor: 'pointer',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <h3 style={{ fontWeight: 600, fontSize: '15px', color: 'var(--c-text)' }}>{faq.q}</h3>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ flexShrink: 0 }}>
            <HiChevronDown className="w-5 h-5" style={{ color: isOpen ? 'var(--c-primary)' : 'var(--c-muted)' }} />
          </motion.div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} style={{ overflow: 'hidden' }}>
              <p style={{ fontSize: '15px', color: 'var(--c-muted)', lineHeight: 1.7, paddingTop: '16px' }}>{faq.a}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  )
}

export default function FAQSection() {
  return (
    <section
      className="bg-surface/50"
      style={{ position: 'relative', overflow: 'hidden', paddingTop: '5rem', paddingBottom: '5rem' }}
    >
      <div
        className="px-5 sm:px-8"
        style={{ maxWidth: '680px', margin: '0 auto' }}
      >
        <motion.div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: '3rem',
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span
            style={{
              display: 'inline-flex',
              padding: '6px 16px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(88,166,255,0.1)',
              border: '1px solid rgba(88,166,255,0.2)',
              color: 'var(--c-primary)',
              fontSize: '13px',
              fontWeight: 500,
              marginBottom: '1rem',
              marginTop: '2rem',
            }}
          >
            FAQ
          </span>
          <h2
            style={{
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
            }}
          >
            Frequently asked <span className="gradient-text">questions</span>
          </h2>
          <p
            style={{
              color: 'var(--c-muted)',
              fontSize: 'clamp(16px, 1.5vw, 18px)',
              lineHeight: 1.7,
            }}
          >
            Everything you need to know about GitFlow Visualizer.
          </p>
        </motion.div>

        <motion.div
          style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {faqs.map((faq) => <FAQItem key={faq.q} faq={faq} />)}
        </motion.div>
      </div>
    </section>
  )
}
