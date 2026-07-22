import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '../../animations/variants'
import { HiStar } from 'react-icons/hi2'

const testimonials = [
  { name: 'Sarah Chen', role: 'Senior Dev at Stripe', avatar: 'SC', content: 'GitFlow Visualizer made me realize how many Git concepts I was using but never truly understood. The visual branch graphs are game-changing.', color: 'bg-primary/10 text-primary' },
  { name: 'Marcus Johnson', role: 'Tech Lead at Vercel', avatar: 'MJ', content: 'I recommend this to every junior developer. The interactive playground is the best way to learn Git safely.', color: 'bg-green/10 text-green' },
  { name: 'Emily Park', role: 'DevOps at GitHub', avatar: 'EP', content: 'The challenges pushed my Git skills to the next level. Rebase conflicts that used to scare me are now second nature.', color: 'bg-orange/10 text-orange' },
  { name: 'Alex Rivera', role: 'Full Stack Dev', avatar: 'AR', content: 'Finally a Git platform that looks as good as it works. The UI is stunning and lessons are well-structured.', color: 'bg-primary/10 text-primary' },
  { name: 'Priya Sharma', role: 'Open Source Contributor', avatar: 'PS', content: 'The leaderboard and challenges make learning Git competitive and fun. Went from beginner to managing complex workflows.', color: 'bg-green/10 text-green' },
  { name: 'David Kim', role: 'Frontend at Linear', avatar: 'DK', content: 'Best Git learning experience out there. The visual approach to rebase vs merge finally made it click for me.', color: 'bg-orange/10 text-orange' },
]

export default function TestimonialsSection() {
  return (
    <section
      style={{ position: 'relative', overflow: 'hidden', paddingTop: '5rem', paddingBottom: '5rem' }}
    >
      <div className="px-5 sm:px-8 lg:px-12">
        <motion.div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: '3rem',
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span
            style={{
              display: 'inline-flex',
              padding: '6px 16px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(241,80,47,0.1)',
              border: '1px solid rgba(241,80,47,0.2)',
              color: 'var(--c-orange)',
              fontSize: '13px',
              fontWeight: 500,
              marginBottom: '1rem',
              marginTop: '2rem',
            }}
          >
            Testimonials
          </span>
          <h2
            style={{
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
            }}
          >
            Loved by{' '}
            <span style={{ color: 'var(--c-orange)' }}>developers</span>
          </h2>
          <p
            style={{
              color: 'var(--c-muted)',
              fontSize: 'clamp(16px, 1.5vw, 18px)',
              maxWidth: '560px',
              lineHeight: 1.7,
            }}
          >
            Join thousands of developers who transformed their Git skills.
          </p>
        </motion.div>

        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: '1.75rem',
          }}
          className="sm:!grid-cols-2 lg:!grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {testimonials.map((t) => (
            <motion.div key={t.name} variants={staggerItem}>
              <div
                className="h-full rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{ padding: '1.75rem' }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <HiStar key={i} className="w-4 h-4 text-yellow-500" />
                  ))}
                </div>
                <p className="text-[14px] sm:text-[15px] text-muted leading-relaxed mb-6">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-xs font-bold shrink-0`}>
                    {t.avatar}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">{t.name}</p>
                    <p className="text-xs text-muted truncate">{t.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
