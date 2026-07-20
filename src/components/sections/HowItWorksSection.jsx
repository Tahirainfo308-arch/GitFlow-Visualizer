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
    <section className="py-20 sm:py-[100px] lg:py-[120px] relative bg-surface/50">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-green/10 border border-green/20 text-green text-[13px] font-medium mb-5">
            How It Works
          </span>
          <h2 className="text-[28px] sm:text-[36px] lg:text-[44px] font-extrabold leading-tight tracking-tight mb-4">
            Three steps to{' '}
            <span className="text-green">Git mastery</span>
          </h2>
          <p className="text-muted text-[16px] sm:text-[18px] max-w-[560px] mx-auto leading-relaxed">
            Our proven framework takes you from zero to confident Git user.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {steps.map((step, index) => (
            <motion.div key={step.title} variants={staggerItem}>
              <div className={`relative h-full p-7 sm:p-8 rounded-3xl border ${step.border} ${step.bg}`}>
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
