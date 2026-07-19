import { motion } from 'framer-motion'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { staggerContainer, staggerItem } from '../animations/variants'
import { HiOutlineFire, HiOutlineClock, HiOutlineStar, HiOutlineArrowRight } from 'react-icons/hi2'

const challenges = [
  {
    title: 'Merge Conflict Resolution',
    description: 'Resolve a complex three-way merge conflict between feature branches.',
    difficulty: 'Medium',
    points: 150,
    time: '15 min',
    completions: 1243,
    color: 'orange',
  },
  {
    title: 'Interactive Rebase',
    description: 'Reorder, squash, and edit commits to create a clean history.',
    difficulty: 'Hard',
    points: 250,
    time: '25 min',
    completions: 876,
    color: 'red',
  },
  {
    title: 'Branch Strategy',
    description: 'Set up a Gitflow workflow with hotfix and release branches.',
    difficulty: 'Hard',
    points: 300,
    time: '30 min',
    completions: 654,
    color: 'red',
  },
  {
    title: 'First Commit',
    description: 'Initialize a repo, make your first commit and push to remote.',
    difficulty: 'Easy',
    points: 50,
    time: '5 min',
    completions: 5432,
    color: 'green',
  },
  {
    title: 'Cherry-Pick Practice',
    description: 'Cherry-pick specific commits from one branch to another.',
    difficulty: 'Medium',
    points: 175,
    time: '15 min',
    completions: 987,
    color: 'orange',
  },
  {
    title: 'Stash & Recover',
    description: 'Use git stash to save work, switch branches, and recover changes.',
    difficulty: 'Easy',
    points: 75,
    time: '10 min',
    completions: 2345,
    color: 'green',
  },
]

const diffColor = { Easy: 'green', Medium: 'orange', Hard: 'red' }

export default function ChallengesPage() {
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
            <Badge color="orange" dot>Challenges</Badge>
            <h1 className="font-poppins text-4xl sm:text-5xl font-bold mt-4 mb-4">
              Test your <span className="text-orange">Git skills</span>
            </h1>
            <p className="text-muted text-lg leading-relaxed">
              Real-world Git scenarios that push your abilities. Earn points,
              earn bragging rights.
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
            {challenges.map((challenge) => (
              <motion.div key={challenge.title} variants={staggerItem}>
                <Card className="h-full flex flex-col" padding="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge color={diffColor[challenge.difficulty]}>
                      {challenge.difficulty}
                    </Badge>
                    <span className="text-xs text-muted flex items-center gap-1">
                      <HiOutlineStar className="w-3.5 h-3.5 text-yellow-500" />
                      {challenge.points} pts
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{challenge.title}</h3>
                  <p className="text-muted text-sm leading-relaxed flex-1 mb-6">
                    {challenge.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted mb-4">
                    <span className="flex items-center gap-1">
                      <HiOutlineClock className="w-3.5 h-3.5" />
                      {challenge.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <HiOutlineFire className="w-3.5 h-3.5" />
                      {challenge.completions.toLocaleString()} completed
                    </span>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full"
                    iconRight={HiOutlineArrowRight}
                  >
                    Accept Challenge
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
