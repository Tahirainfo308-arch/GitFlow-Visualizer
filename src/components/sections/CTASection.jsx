import { motion } from 'framer-motion'
import Button from '../ui/Button'
import { HiOutlineArrowRight } from 'react-icons/hi2'

export default function CTASection() {
  return (
    <section id="cta" className="py-[120px] relative">
      <div className="max-w-[1400px] mx-auto px-8">
        <motion.div
          className="relative rounded-[32px] border border-border bg-card overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-green/5 pointer-events-none" />
          <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

          <div className="relative px-8 py-20 sm:px-16 sm:py-24 text-center">
            <h2 className="text-[32px] sm:text-[40px] lg:text-[52px] font-extrabold leading-tight tracking-tight mb-4">
              Ready to master{' '}
              <span className="gradient-text">Git?</span>
            </h2>
            <p className="text-muted text-[17px] sm:text-[20px] max-w-[560px] mx-auto mb-10 leading-relaxed">
              Join thousands of developers who are learning Git the
              smart way. Start your journey today — it&apos;s free.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" size="lg" href="/register" iconRight={HiOutlineArrowRight}>
                Get Started Free
              </Button>
              <Button variant="secondary" size="lg" href="/learn">
                Browse Lessons
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
