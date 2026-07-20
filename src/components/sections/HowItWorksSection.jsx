import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '../../animations/variants'
import {
  HiOutlineBookOpen,
  HiOutlineWrenchScrewdriver,
  HiOutlineTrophy,
} from 'react-icons/hi2'

const steps = [
  {
    number: '01',
    icon: HiOutlineBookOpen,
    title: 'Learn',
    description: 'Start with interactive lessons covering Git fundamentals. Each concept is explained with visual diagrams and real-world examples.',
    color: 'text-primary',
    borderColor: 'border-primary/30',
    bgColor: 'bg-primary/5',
  },
  {
    number: '02',
    icon: HiOutlineWrenchScrewdriver,
    title: 'Practice',
    description: 'Apply your knowledge in the interactive playground. Run Git commands, see branch visualizations update in real-time.',
    color: 'text-green',
    borderColor: 'border-green/30',
    bgColor: 'bg-green/5',
  },
  {
    number: '03',
    icon: HiOutlineTrophy,
    title: 'Master Git',
    description: 'Take on challenges, compete on the leaderboard, and earn achievements. Become a Git expert with proven skills.',
    color: 'text-orange',
    borderColor: 'border-orange/30',
    bgColor: 'bg-orange/5',
  },
]

export default function HowItWorksSection() {
  return (
    <section className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-green/10 border border-green/20 text-green text-xs font-medium mb-4">
            How It Works
          </span>
          <h2 className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Three steps to{' '}
            <span className="text-green">Git mastery</span>
          </h2>
          <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Our proven learning framework helps you go from zero to hero
            in record time.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {steps.map((step, index) => (
            <motion.div key={step.title} variants={staggerItem}>
              <div className={`relative p-8 rounded-2xl border ${step.borderColor} ${step.bgColor} h-full`}>
                <div className="flex items-center gap-4 mb-6">
                  <span className={`font-mono text-5xl font-bold ${step.color} opacity-15`}>
                    {step.number}
                  </span>
                  <div className={`w-12 h-12 rounded-xl border ${step.borderColor} flex items-center justify-center ${step.bgColor}`}>
                    <step.icon className={`w-6 h-6 ${step.color}`} />
                  </div>
                </div>
                <h3 className="font-poppins text-xl font-bold mb-3">
                  {step.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {step.description}
                </p>
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
