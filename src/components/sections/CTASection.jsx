import { motion } from 'framer-motion'
import Button from '../ui/Button'
import { HiOutlineArrowRight } from 'react-icons/hi2'

export default function CTASection() {
  return (
    <section className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="relative rounded-3xl border border-border bg-card overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-green/5 pointer-events-none" />
          <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

          <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">
            <h2 className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Ready to master{' '}
              <span className="gradient-text">Git?</span>
            </h2>
            <p className="text-muted text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Join thousands of developers who are learning Git the
              smart way. Start your journey today — it&apos;s free.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                href="/register"
                iconRight={HiOutlineArrowRight}
              >
                Get Started Free
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href="/learn"
              >
                Browse Lessons
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
