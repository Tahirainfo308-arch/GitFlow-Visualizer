import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '../../animations/variants'
import { HiOutlineBookOpen, HiOutlineWrenchScrewdriver, HiOutlineTrophy } from 'react-icons/hi2'

const steps = [
  { number: '01', icon: HiOutlineBookOpen, title: 'Learn', description: 'Start with structured lessons covering Git fundamentals. Each concept is explained with visual diagrams and real examples.', color: 'text-primary', border: 'border-primary/30', bg: 'bg-primary/5', iconBg: 'bg-primary/10' },
  { number: '02', icon: HiOutlineWrenchScrewdriver, title: 'Practice', description: 'Apply your knowledge in the interactive playground. Run Git commands and watch the branch graph update live.', color: 'text-green', border: 'border-green/30', bg: 'bg-green/5', iconBg: 'bg-green/10' },
  { number: '03', icon: HiOutlineTrophy, title: 'Master', description: 'Take on challenges, earn badges, and climb the leaderboard. Prove your Git expertise.', color: 'text-orange', border: 'border-orange/30', bg: 'bg-orange/5', iconBg: 'bg-orange/10' },
]

export default function HowItWorksSection() {
  return (
    <section
      className="bg-surface/50"
      style={{ position: 'relative', overflow: 'hidden', paddingTop: '5rem', paddingBottom: '5rem' }}
    >
      <div className="px-5 sm:px-8 lg:px-12">
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
              backgroundColor: 'rgba(63,185,80,0.1)',
              border: '1px solid rgba(63,185,80,0.2)',
              color: 'var(--c-green)',
              fontSize: '13px',
              fontWeight: 500,
              marginBottom: '1rem',
              marginTop: '2rem',
            }}
          >
            How It Works
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
            Three steps to{' '}
            <span style={{ color: 'var(--c-green)' }}>Git mastery</span>
          </h2>
          <p
            style={{
              color: 'var(--c-muted)',
              fontSize: 'clamp(16px, 1.5vw, 18px)',
              maxWidth: '560px',
              lineHeight: 1.7,
            }}
          >
            Our proven framework takes you from zero to confident Git user.
          </p>
        </motion.div>

        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: '1.75rem',
          }}
          className="md:!grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {steps.map((step, index) => (
            <motion.div key={step.title} variants={staggerItem}>
              <div
                className={`relative h-full rounded-3xl border ${step.border} ${step.bg}`}
                style={{ padding: '1.75rem' }}
              >
                <div className="flex items-center gap-4 mb-6 sm:mb-8">
                  <span className={`font-mono text-[48px] sm:text-[56px] font-extrabold ${step.color} opacity-10 leading-none`}>{step.number}</span>
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${step.iconBg} flex items-center justify-center`}>
                    <step.icon className={`w-6 h-6 sm:w-7 sm:h-7 ${step.color}`} />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted text-[14px] sm:text-[15px] leading-relaxed">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-border" />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
