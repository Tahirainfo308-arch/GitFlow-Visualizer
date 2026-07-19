import { motion } from 'framer-motion'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import CTASection from '../components/sections/CTASection'
import { staggerContainer, staggerItem } from '../animations/variants'
import {
  HiOutlineHeart,
  HiOutlineGlobeAlt,
  HiOutlineCodeBracket,
  HiOutlineUserGroup,
} from 'react-icons/hi2'

const values = [
  {
    icon: HiOutlineHeart,
    title: 'Built with Passion',
    description: 'Created by developers who believe Git education should be visual, interactive, and accessible.',
    color: 'text-red',
    bg: 'bg-red/10',
  },
  {
    icon: HiOutlineGlobeAlt,
    title: 'For Everyone',
    description: 'Whether you are a beginner or advanced developer, our platform adapts to your skill level.',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    icon: HiOutlineCodeBracket,
    title: 'Open Learning',
    description: 'We believe in open, free education. All content is available without paywalls.',
    color: 'text-green',
    bg: 'bg-green/10',
  },
  {
    icon: HiOutlineUserGroup,
    title: 'Community Driven',
    description: 'Built with feedback from thousands of developers. Our community shapes every feature.',
    color: 'text-orange',
    bg: 'bg-orange/10',
  },
]

const team = [
  { name: 'Alex Morgan', role: 'Founder & Lead Developer', avatar: 'AM', color: 'bg-primary/10 text-primary' },
  { name: 'Jordan Lee', role: 'UI/UX Designer', avatar: 'JL', color: 'bg-green/10 text-green' },
  { name: 'Sam Rivera', role: 'Content Creator', avatar: 'SR', color: 'bg-orange/10 text-orange' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="py-20 lg:py-28 bg-grid bg-radial relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <Badge color="primary" dot>About</Badge>
            <h1 className="font-poppins text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6">
              Making Git <span className="gradient-text">visual</span> and{' '}
              <span className="gradient-text">accessible</span>
            </h1>
            <p className="text-muted text-lg leading-relaxed">
              GitFlow Visualizer was born from a simple frustration: Git is
              powerful, but learning it doesn&apos;t have to be painful. We set
              out to create the learning platform we always wished existed.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {values.map((value) => (
              <motion.div key={value.title} variants={staggerItem}>
                <Card className="h-full" padding="p-6">
                  <div className={`w-12 h-12 rounded-xl ${value.bg} flex items-center justify-center mb-4`}>
                    <value.icon className={`w-6 h-6 ${value.color}`} />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mb-12">
            <h2 className="font-poppins text-3xl sm:text-4xl font-bold mb-4">
              Meet the team
            </h2>
            <p className="text-muted text-lg max-w-lg mx-auto">
              Small team, big mission. We are dedicated to transforming
              how developers learn Git.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {team.map((member) => (
              <motion.div key={member.name} variants={staggerItem}>
                <Card className="text-center" padding="p-8">
                  <div className={`w-16 h-16 rounded-full ${member.color} flex items-center justify-center text-xl font-bold mx-auto mb-4`}>
                    {member.avatar}
                  </div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-xs text-muted mt-1">{member.role}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTASection />
    </div>
  )
}
