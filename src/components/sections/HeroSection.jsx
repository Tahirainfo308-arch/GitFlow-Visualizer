import { motion } from 'framer-motion'
import Button from '../ui/Button'
import {
  staggerContainer,
  staggerItem,
} from '../../animations/variants'
import {
  HiOutlineArrowRight,
  HiOutlinePlay,
} from 'react-icons/hi2'
import { FiGitBranch, FiGitCommit, FiGitMerge } from 'react-icons/fi'

function FloatingNode({ className, delay = 0, icon: Icon }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <div className="w-12 h-12 rounded-2xl bg-card border border-border flex items-center justify-center shadow-lg">
        <Icon className="w-5 h-5 text-primary" />
      </div>
    </motion.div>
  )
}

function GitLine({ className }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: 'top' }}
    />
  )
}

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-grid bg-radial">
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg pointer-events-none z-10" />

      <FloatingNode className="top-24 left-[10%] hidden lg:block" delay={0} icon={FiGitBranch} />
      <FloatingNode className="top-32 right-[12%] hidden lg:block" delay={1} icon={FiGitCommit} />
      <FloatingNode className="bottom-32 left-[15%] hidden lg:block" delay={2} icon={FiGitMerge} />
      <FloatingNode className="bottom-40 right-[8%] hidden lg:block" delay={0.5} icon={FiGitBranch} />
      <FloatingNode className="top-[60%] left-[5%] hidden xl:block" delay={1.5} icon={FiGitCommit} />

      <GitLine className="top-20 left-[18%] w-px h-40 bg-gradient-to-b from-primary/30 to-transparent hidden lg:block" />
      <GitLine className="top-24 right-[18%] w-px h-32 bg-gradient-to-b from-green/30 to-transparent hidden lg:block" />
      <GitLine className="bottom-20 left-[22%] w-px h-24 bg-gradient-to-t from-orange/30 to-transparent hidden lg:block" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={staggerItem} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              Now with Interactive Visualizations
            </span>
          </motion.div>

          <motion.h1
            variants={staggerItem}
            className="font-poppins font-extrabold leading-[1.08] tracking-tight mb-6
              text-[36px] sm:text-[52px] lg:text-[72px]"
          >
            Learn Git{' '}
            <span className="gradient-text">Visually.</span>
            <br />
            <span className="text-muted font-semibold
              text-[24px] sm:text-[32px] lg:text-[42px]">
              Master Git Like Never Before.
            </span>
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="text-muted text-[18px] sm:text-[22px] max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Interactive lessons, real-time branch visualizations, and
            hands-on practice. The modern way to learn Git — from
            beginner to advanced.
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              variant="primary"
              size="lg"
              href="/learn"
              iconRight={HiOutlineArrowRight}
            >
              Start Learning
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="/playground"
              icon={HiOutlinePlay}
            >
              Open Playground
            </Button>
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="mt-14 flex items-center justify-center gap-8 text-sm text-muted"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green" />
              <span>50+ Lessons</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>Interactive Playground</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange" />
              <span>100% Free</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
