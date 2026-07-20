import { useState } from 'react'
import { motion } from 'framer-motion'
import { useProgress } from '../context/ProgressContext'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import { staggerContainer, staggerItem } from '../animations/variants'
import { HiOutlineFire, HiOutlineClock, HiOutlineStar, HiOutlineArrowRight, HiOutlineCheckCircle } from 'react-icons/hi2'

const challenges = [
  { id: 'ch-first-commit', title: 'First Commit', description: 'Initialize a repo, make your first commit and push to remote.', difficulty: 'Easy', points: 50, time: '5 min', completions: 5432, color: 'green' },
  { id: 'ch-branch-out', title: 'Branch Out', description: 'Create a feature branch, make commits, and merge it back.', difficulty: 'Easy', points: 75, time: '10 min', completions: 3210, color: 'green' },
  { id: 'ch-stash-master', title: 'Stash & Recover', description: 'Use git stash to save work, switch branches, and recover changes.', difficulty: 'Easy', points: 75, time: '10 min', completions: 2345, color: 'green' },
  { id: 'ch-merge-conflict', title: 'Merge Conflict Resolution', description: 'Resolve a complex three-way merge conflict between feature branches.', difficulty: 'Medium', points: 150, time: '15 min', completions: 1243, color: 'orange' },
  { id: 'ch-cherry-pick', title: 'Cherry-Pick Practice', description: 'Cherry-pick specific commits from one branch to another.', difficulty: 'Medium', points: 175, time: '15 min', completions: 987, color: 'orange' },
  { id: 'ch-rebase', title: 'Interactive Rebase', description: 'Reorder, squash, and edit commits to create a clean history.', difficulty: 'Hard', points: 250, time: '25 min', completions: 876, color: 'red' },
  { id: 'ch-gitflow', title: 'Gitflow Workflow', description: 'Set up a Gitflow workflow with hotfix and release branches.', difficulty: 'Hard', points: 300, time: '30 min', completions: 654, color: 'red' },
  { id: 'ch-reflog', title: 'Recovery Mission', description: 'Use reflog to recover "deleted" commits and lost work.', difficulty: 'Hard', points: 275, time: '20 min', completions: 543, color: 'red' },
]

const diffColor = { Easy: 'green', Medium: 'orange', Hard: 'red' }

export default function ChallengesPage() {
  const { progress, completeChallenge, checkBadges, addXP } = useProgress()
  const [activeChallenge, setActiveChallenge] = useState(null)
  const [challengeStep, setChallengeStep] = useState(0)

  const challengeSteps = {
    'ch-first-commit': [
      { instruction: 'Open your terminal and create a new directory', command: 'mkdir my-project', hint: 'This creates a new folder for your project.' },
      { instruction: 'Navigate into the project directory', command: 'cd my-project', hint: 'Use "cd" to change directory.' },
      { instruction: 'Initialize a new Git repository', command: 'git init', hint: 'This creates the .git directory.' },
      { instruction: 'Create a new file', command: 'echo "Hello Git" > README.md', hint: 'Creating a file to have something to commit.' },
      { instruction: 'Stage the file for commit', command: 'git add .', hint: 'Stage all changes in the current directory.' },
      { instruction: 'Make your first commit!', command: 'git commit -m "Initial commit"', hint: 'Create your first commit with a message.' },
    ],
  }

  const handleStartChallenge = (challenge) => {
    setActiveChallenge(challenge)
    setChallengeStep(0)
  }

  const handleCompleteChallenge = () => {
    if (activeChallenge) {
      completeChallenge(activeChallenge.id)
      setTimeout(() => checkBadges(), 100)
      setActiveChallenge(null)
      setChallengeStep(0)
    }
  }

  return (
    <div className="min-h-screen">
      <section className="py-20 lg:py-28 bg-grid bg-radial relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <Badge color="orange" dot>Challenges</Badge>
            <h1 className="font-poppins text-4xl sm:text-5xl font-bold mt-4 mb-4">
              Test your <span className="text-orange">Git skills</span>
            </h1>
            <p className="text-muted text-lg">
              Real-world Git scenarios. Complete them to earn XP and badges.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => {
              const isCompleted = progress.completedChallenges.includes(challenge.id)
              return (
                <Card key={challenge.id} className="h-full flex flex-col" padding="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge color={diffColor[challenge.difficulty]}>{challenge.difficulty}</Badge>
                    {isCompleted ? (
                      <Badge color="green" dot size="xs">Done</Badge>
                    ) : (
                      <span className="text-xs text-muted flex items-center gap-1">
                        <HiOutlineStar className="w-3.5 h-3.5 text-yellow-500" />
                        {challenge.points} XP
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{challenge.title}</h3>
                  <p className="text-muted text-sm leading-relaxed flex-1 mb-6">{challenge.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted mb-4">
                    <span className="flex items-center gap-1"><HiOutlineClock className="w-3.5 h-3.5" />{challenge.time}</span>
                    <span className="flex items-center gap-1"><HiOutlineFire className="w-3.5 h-3.5" />{challenge.completions.toLocaleString()}</span>
                  </div>
                  <Button
                    variant={isCompleted ? 'secondary' : 'primary'}
                    size="sm"
                    className="w-full"
                    icon={isCompleted ? HiOutlineCheckCircle : HiOutlineArrowRight}
                    onClick={() => isCompleted ? null : handleStartChallenge(challenge)}
                  >
                    {isCompleted ? 'Completed' : 'Accept Challenge'}
                  </Button>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <Modal
        isOpen={!!activeChallenge}
        onClose={() => { setActiveChallenge(null); setChallengeStep(0) }}
        title={activeChallenge?.title || ''}
        size="md"
      >
        {activeChallenge && (
          <div>
            <Badge color={diffColor[activeChallenge.difficulty]} size="sm" className="mb-4">
              {activeChallenge.difficulty} &middot; {activeChallenge.points} XP
            </Badge>
            <p className="text-sm text-muted mb-6">{activeChallenge.description}</p>
            <div className="flex items-center gap-2 mb-6">
              {challengeSteps[activeChallenge.id]?.map((_, i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= challengeStep ? 'bg-primary' : 'bg-border'}`} />
              )) || Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= challengeStep ? 'bg-primary' : 'bg-border'}`} />
              ))}
            </div>
            {challengeSteps[activeChallenge.id] ? (
              <div className="bg-[#0a0e14] border border-border rounded-xl p-5 mb-6">
                <p className="text-sm text-text mb-3">
                  Step {challengeStep + 1}: {challengeSteps[activeChallenge.id][challengeStep]?.instruction}
                </p>
                <code className="block bg-bg border border-border rounded-lg p-3 text-green font-mono text-sm">
                  $ {challengeSteps[activeChallenge.id][challengeStep]?.command}
                </code>
                <p className="text-xs text-muted mt-2">{challengeSteps[activeChallenge.id][challengeStep]?.hint}</p>
              </div>
            ) : (
              <div className="bg-[#0a0e14] border border-border rounded-xl p-5 mb-6">
                <p className="text-sm text-muted text-center">Complete this challenge using your Git knowledge.</p>
              </div>
            )}
            <div className="flex gap-3">
              {challengeSteps[activeChallenge.id] && challengeStep < (challengeSteps[activeChallenge.id]?.length || 0) - 1 ? (
                <Button variant="primary" className="flex-1" onClick={() => setChallengeStep(prev => prev + 1)}>
                  Next Step
                </Button>
              ) : (
                <Button variant="success" className="flex-1" onClick={handleCompleteChallenge} icon={HiOutlineCheckCircle}>
                  Complete Challenge (+{activeChallenge.points} XP)
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
