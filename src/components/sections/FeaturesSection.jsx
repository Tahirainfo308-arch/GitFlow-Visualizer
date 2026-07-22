import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '../../animations/variants'
import {
  HiOutlineEye,
  HiOutlineCommandLine,
  HiOutlineAcademicCap,
  HiOutlineBolt,
  HiOutlineUsers,
  HiOutlineChartBar,
} from 'react-icons/hi2'

const features = [
  { icon: HiOutlineEye, title: 'Visual Branch Graphs', description: 'Watch branches, merges, and commits come alive with real-time animated visualizations.', color: 'text-primary', bg: 'bg-primary/10', borderHover: 'hover:border-primary/40', glowClass: 'hover:shadow-primary/5' },
  { icon: HiOutlineCommandLine, title: 'Interactive Terminal', description: 'Practice Git commands in a realistic terminal. See your graph update with every command.', color: 'text-green', bg: 'bg-green/10', borderHover: 'hover:border-green/40', glowClass: 'hover:shadow-green/5' },
  { icon: HiOutlineAcademicCap, title: 'Structured Lessons', description: 'From basics to advanced workflows. Curated learning paths that build mastery step by step.', color: 'text-orange', bg: 'bg-orange/10', borderHover: 'hover:border-orange/40', glowClass: 'hover:shadow-orange/5' },
  { icon: HiOutlineBolt, title: 'Instant Feedback', description: 'Get immediate feedback on your commands. Understand mistakes before they become habits.', color: 'text-primary', bg: 'bg-primary/10', borderHover: 'hover:border-primary/40', glowClass: 'hover:shadow-primary/5' },
  { icon: HiOutlineUsers, title: 'Community Challenges', description: 'Compete with developers worldwide. Solve real-world Git scenarios and climb the leaderboard.', color: 'text-green', bg: 'bg-green/10', borderHover: 'hover:border-green/40', glowClass: 'hover:shadow-green/5' },
  { icon: HiOutlineChartBar, title: 'Progress Tracking', description: 'Track your learning with detailed analytics, XP, achievements, and certificates.', color: 'text-orange', bg: 'bg-orange/10', borderHover: 'hover:border-orange/40', glowClass: 'hover:shadow-orange/5' },
]

function FeatureCard({ feature }) {
  return (
    <motion.div variants={staggerItem}>
      <div
        className={`group relative h-full rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${feature.glowClass} ${feature.borderHover}`}
        style={{ padding: '1.75rem' }}
      >
        <div className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
          <feature.icon className={`w-6 h-6 sm:w-7 sm:h-7 ${feature.color}`} />
        </div>
        <h3 className="text-base sm:text-lg font-bold mb-2">{feature.title}</h3>
        <p className="text-muted text-[14px] sm:text-[15px] leading-relaxed">{feature.description}</p>
      </div>
    </motion.div>
  )
}

export default function FeaturesSection() {
  return (
    <section
      id="features"
      style={{ position: 'relative', overflow: 'hidden', paddingTop: '5rem', paddingBottom: '5rem', width: '100%' }}
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
            Features
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
            Everything you need to{' '}
            <span className="gradient-text">master Git</span>
          </h2>
          <p
            style={{
              color: 'var(--c-muted)',
              fontSize: 'clamp(16px, 1.5vw, 18px)',
              maxWidth: '560px',
              lineHeight: 1.7,
            }}
          >
            A complete platform to make you proficient with Git through visual, interactive experiences.
          </p>
        </motion.div>

        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
          }}
          className="sm:!grid-cols-2 lg:!grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </motion.div>
    </section>
  )
}
