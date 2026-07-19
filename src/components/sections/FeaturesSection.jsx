import { motion } from 'framer-motion'
import Card from '../ui/Card'
import {
  staggerContainer,
  staggerItem,
} from '../../animations/variants'
import {
  HiOutlineEye,
  HiOutlineCommandLine,
  HiOutlineAcademicCap,
  HiOutlineBolt,
  HiOutlineUsers,
  HiOutlineChartBar,
} from 'react-icons/hi2'

const features = [
  {
    icon: HiOutlineEye,
    title: 'Visual Branch Graphs',
    description:
      'Watch branches, merges, and commits come alive with real-time animated visualizations.',
    color: 'text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary/20',
  },
  {
    icon: HiOutlineCommandLine,
    title: 'Interactive Terminal',
    description:
      'Practice Git commands in a realistic terminal environment right in your browser.',
    color: 'text-green',
    bg: 'bg-green/10',
    border: 'border-green/20',
  },
  {
    icon: HiOutlineAcademicCap,
    title: 'Structured Lessons',
    description:
      'From basics to advanced workflows. Curated paths that build mastery step by step.',
    color: 'text-orange',
    bg: 'bg-orange/10',
    border: 'border-orange/20',
  },
  {
    icon: HiOutlineBolt,
    title: 'Instant Feedback',
    description:
      'Get immediate feedback on your commands. Understand mistakes before they become habits.',
    color: 'text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary/20',
  },
  {
    icon: HiOutlineUsers,
    title: 'Community Challenges',
    description:
      'Compete with developers worldwide. Solve real-world Git scenarios and climb the leaderboard.',
    color: 'text-green',
    bg: 'bg-green/10',
    border: 'border-green/20',
  },
  {
    icon: HiOutlineChartBar,
    title: 'Progress Tracking',
    description:
      'Track your learning journey with detailed analytics and achievement milestones.',
    color: 'text-orange',
    bg: 'bg-orange/10',
    border: 'border-orange/20',
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-4">
            Features
          </span>
          <h2 className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Everything you need to{' '}
            <span className="gradient-text">master Git</span>
          </h2>
          <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto">
            A complete learning platform designed to make you proficient
            with Git through visual, interactive experiences.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={staggerItem}>
              <Card className="h-full group" padding="p-8">
                <div
                  className={`w-12 h-12 rounded-xl ${feature.bg} border ${feature.border} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
