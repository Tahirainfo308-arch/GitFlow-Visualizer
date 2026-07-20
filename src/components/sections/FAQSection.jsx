import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { staggerContainer, staggerItem } from '../../animations/variants'
import { HiChevronDown } from 'react-icons/hi2'

const faqs = [
  { q: 'Is GitFlow Visualizer completely free?', a: 'Yes! All lessons, the interactive playground, challenges, and quizzes are available at no cost. We believe Git education should be accessible to everyone.' },
  { q: 'Do I need any prior Git knowledge?', a: 'Not at all. Our learning path starts from the absolute basics and progressively builds up to advanced topics like interactive rebase, cherry-picking, and custom workflows.' },
  { q: 'How does the interactive playground work?', a: "The playground provides a simulated Git environment in your browser. You can run Git commands, and see the branch graph update in real-time. It's like having a real terminal without any risk." },
  { q: 'Can I use this on mobile?', a: 'Absolutely. GitFlow Visualizer is fully responsive and works great on desktop, tablet, and mobile devices.' },
  { q: 'How do challenges and the leaderboard work?', a: 'Challenges are real-world Git scenarios that test your skills. Solve them to earn XP and climb the leaderboard. New challenges are added regularly.' },
  { q: 'What makes this different from other Git tutorials?', a: 'Unlike static tutorials, GitFlow Visualizer provides real-time visual feedback. You see branches form, merges happen, and commits connect — making abstract concepts concrete.' },
]

function FAQItem({ faq }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div variants={staggerItem}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full text-left p-6 rounded-2xl border transition-all duration-200 ${
          isOpen ? 'border-primary/30 bg-primary/5' : 'border-border bg-card hover:border-muted/60'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-semibold text-[15px]">{faq.q}</h3>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0">
            <HiChevronDown className={`w-5 h-5 transition-colors ${isOpen ? 'text-primary' : 'text-muted'}`} />
          </motion.div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <p className="text-[15px] text-muted leading-relaxed pt-4">{faq.a}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  )
}

export default function FAQSection() {
  return (
    <section className="py-[120px] relative bg-surface/50">
      <div className="max-w-[680px] mx-auto px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[13px] font-medium mb-5">
            FAQ
          </span>
          <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold leading-tight tracking-tight mb-4">
            Frequently asked{' '}
            <span className="gradient-text">questions</span>
          </h2>
          <p className="text-muted text-[17px] sm:text-[20px] leading-relaxed">
            Everything you need to know about GitFlow Visualizer.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {faqs.map((faq) => (
            <FAQItem key={faq.q} faq={faq} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
