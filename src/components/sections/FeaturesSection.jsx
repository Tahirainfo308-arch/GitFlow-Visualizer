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
      <div className={`group relative h-full p-7 sm:p-8 rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${feature.glowClass} ${feature.borderHover}`}>
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
    <section id="features" className="py-20 sm:py-[100px] lg:py-[120px] relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          className="text-center mb-12 sm:mb-16 flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[13px] font-medium mb-5">
            Features
          </span>
          <h2 className="text-[28px] sm:text-[36px] lg:text-[44px] font-extrabold leading-tight tracking-tight mb-4">
            Everything you need to{' '}
            <span className="gradient-text">master Git</span>
          </h2>
          <p className="text-muted text-[16px] sm:text-[18px] max-w-[560px] leading-relaxed">
            A complete platform to make you proficient with Git through visual, interactive experiences.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
