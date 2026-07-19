import { motion } from 'framer-motion'
import Card from '../ui/Card'
import {
  staggerContainer,
  staggerItem,
} from '../../animations/variants'
import { HiStar } from 'react-icons/hi2'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Senior Developer at Stripe',
    avatar: 'SC',
    content:
      'GitFlow Visualizer made me realize how many Git concepts I was using but never truly understood. The visual branch graphs are game-changing.',
    rating: 5,
    color: 'bg-primary/10 text-primary',
  },
  {
    name: 'Marcus Johnson',
    role: 'Tech Lead at Vercel',
    avatar: 'MJ',
    content:
      'I recommend this to every junior developer on my team. The interactive playground is the best way to learn Git without the fear of breaking things.',
    rating: 5,
    color: 'bg-green/10 text-green',
  },
  {
    name: 'Emily Park',
    role: 'DevOps Engineer at GitHub',
    avatar: 'EP',
    content:
      'The challenges section pushed my Git skills to the next level. Rebase conflicts that used to scare me are now second nature.',
    rating: 5,
    color: 'bg-orange/10 text-orange',
  },
  {
    name: 'Alex Rivera',
    role: 'Full Stack Developer',
    avatar: 'AR',
    content:
      'Finally a Git learning platform that looks as good as it works. The UI is stunning and the lessons are incredibly well-structured.',
    rating: 5,
    color: 'bg-primary/10 text-primary',
  },
  {
    name: 'Priya Sharma',
    role: 'Open Source Contributor',
    avatar: 'PS',
    content:
      'The leaderboard and challenges make learning Git competitive and fun. I went from Git beginner to confidently managing complex workflows.',
    rating: 5,
    color: 'bg-green/10 text-green',
  },
  {
    name: 'David Kim',
    role: 'Frontend Engineer at Linear',
    avatar: 'DK',
    content:
      'Best Git learning experience out there. Period. The visual approach to explaining rebase vs merge finally made it click for me.',
    rating: 5,
    color: 'bg-orange/10 text-orange',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-24 lg:py-32 relative bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-orange/10 border border-orange/20 text-orange text-xs font-medium mb-4">
            Testimonials
          </span>
          <h2 className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Loved by{' '}
            <span className="text-orange">developers</span>
          </h2>
          <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto">
            Join thousands of developers who have transformed their Git
            skills with GitFlow Visualizer.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.name} variants={staggerItem}>
              <Card className="h-full" padding="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <HiStar key={i} className="w-4 h-4 text-yellow-500" />
                  ))}
                </div>
                <p className="text-sm text-muted leading-relaxed mb-6">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full ${testimonial.color} flex items-center justify-center text-xs font-bold`}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{testimonial.name}</p>
                    <p className="text-xs text-muted">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
