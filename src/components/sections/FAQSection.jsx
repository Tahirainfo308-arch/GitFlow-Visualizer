import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { staggerContainer, staggerItem } from '../../animations/variants'
import { HiChevronDown } from 'react-icons/hi2'

const faqs = [
  {
    question: 'Is GitFlow Visualizer completely free?',
    answer: 'Yes! GitFlow Visualizer is 100% free. All lessons, the interactive playground, challenges, and quizzes are available at no cost. We believe Git education should be accessible to everyone.',
  },
  {
    question: 'Do I need any prior Git knowledge?',
    answer: 'Not at all. Our learning path starts from the absolute basics and progressively builds up to advanced topics like interactive rebase, cherry-picking, and custom workflows.',
  },
  {
    question: 'How does the interactive playground work?',
    answer: "The playground provides a simulated Git environment in your browser. You can run Git commands, and see the branch graph update in real-time. It's like having a real terminal without any risk.",
  },
  {
    question: 'Can I use this on mobile?',
    answer: 'Absolutely. GitFlow Visualizer is fully responsive and works great on desktop, tablet, and mobile devices. The playground experience is optimized for all screen sizes.',
  },
  {
    question: 'How do challenges and the leaderboard work?',
    answer: 'Challenges are real-world Git scenarios that test your skills. Solve them to earn points and climb the leaderboard. New challenges are added weekly to keep things fresh.',
  },
  {
    question: 'What makes this different from other Git tutorials?',
    answer: 'Unlike static tutorials, GitFlow Visualizer provides real-time visual feedback. You see branches form, merges happen, and commits connect — making abstract concepts concrete and memorable.',
  },
]

function FAQItem({ faq }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div variants={staggerItem}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 ${
          isOpen
            ? 'border-primary/30 bg-primary/5'
            : 'border-border bg-card hover:border-muted/60 hover:bg-card-hover'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-semibold text-sm sm:text-base">{faq.question}</h3>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0"
          >
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
              <p className="text-sm text-muted leading-relaxed pt-4">
                {faq.answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  )
}

export default function FAQSection() {
  return (
    <section className="py-24 lg:py-32 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-4">
            FAQ
          </span>
          <h2 className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Frequently asked{' '}
            <span className="gradient-text">questions</span>
          </h2>
          <p className="text-muted text-base sm:text-lg leading-relaxed">
            Everything you need to know about GitFlow Visualizer.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col gap-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {faqs.map((faq) => (
            <FAQItem key={faq.question} faq={faq} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
