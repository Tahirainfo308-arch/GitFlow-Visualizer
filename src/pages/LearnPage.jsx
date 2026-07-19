import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '../animations/variants'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import {
  HiOutlineBookOpen,
  HiOutlineCheckCircle,
  HiOutlineLockClosed,
  HiOutlineArrowRight,
} from 'react-icons/hi2'

const modules = [
  {
    title: 'Git Fundamentals',
    description: 'Learn the core concepts: repos, commits, branches, and the staging area.',
    lessons: 8,
    duration: '2h 30m',
    level: 'Beginner',
    color: 'green',
    status: 'available',
  },
  {
    title: 'Branching & Merging',
    description: 'Master branch creation, merging strategies, and conflict resolution.',
    lessons: 10,
    duration: '3h 15m',
    level: 'Beginner',
    color: 'green',
    status: 'available',
  },
  {
    title: 'Remote Repositories',
    description: 'Work with remotes, push, pull, fetch, and manage remote branches.',
    lessons: 7,
    duration: '2h 00m',
    level: 'Intermediate',
    color: 'blue',
    status: 'available',
  },
  {
    title: 'Interactive Rebase',
    description: 'Clean up history with interactive rebase, squash, fixup, and edit.',
    lessons: 9,
    duration: '2h 45m',
    level: 'Intermediate',
    color: 'blue',
    status: 'locked',
  },
  {
    title: 'Advanced Workflows',
    description: 'Gitflow, feature flags, cherry-pick, stash, and bisect.',
    lessons: 12,
    duration: '4h 00m',
    level: 'Advanced',
    color: 'orange',
    status: 'locked',
  },
  {
    title: 'Git Internals',
    description: 'Understand objects, refs, packfiles, and how Git works under the hood.',
    lessons: 6,
    duration: '2h 15m',
    level: 'Advanced',
    color: 'orange',
    status: 'locked',
  },
]

const levelColor = {
  Beginner: 'green',
  Intermediate: 'blue',
  Advanced: 'orange',
}

export default function LearnPage() {
  return (
    <div className="min-h-screen">
      <section className="py-20 lg:py-28 bg-grid bg-radial relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <Badge color="green" dot>Learning Path</Badge>
            <h1 className="font-poppins text-4xl sm:text-5xl font-bold mt-4 mb-4">
              Learn <span className="gradient-text">Git</span> step by step
            </h1>
            <p className="text-muted text-lg leading-relaxed">
              Structured modules from beginner to advanced. Each lesson includes
              interactive examples and practice exercises.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {modules.map((mod) => (
              <motion.div key={mod.title} variants={staggerItem}>
                <Card className="h-full flex flex-col" padding="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge color={levelColor[mod.level]}>{mod.level}</Badge>
                    {mod.status === 'locked' && (
                      <HiOutlineLockClosed className="w-4 h-4 text-muted" />
                    )}
                    {mod.status === 'available' && (
                      <HiOutlineCheckCircle className="w-4 h-4 text-green" />
                    )}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{mod.title}</h3>
                  <p className="text-muted text-sm leading-relaxed flex-1 mb-6">
                    {mod.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted mb-4">
                    <span className="flex items-center gap-1">
                      <HiOutlineBookOpen className="w-3.5 h-3.5" />
                      {mod.lessons} lessons
                    </span>
                    <span>{mod.duration}</span>
                  </div>
                  <Button
                    variant={mod.status === 'locked' ? 'secondary' : 'primary'}
                    size="sm"
                    className="w-full"
                    disabled={mod.status === 'locked'}
                    iconRight={mod.status === 'available' ? HiOutlineArrowRight : undefined}
                  >
                    {mod.status === 'locked' ? 'Locked' : 'Start Module'}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
