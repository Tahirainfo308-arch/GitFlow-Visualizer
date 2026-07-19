import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { staggerContainer, staggerItem } from '../animations/variants'
import { HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineArrowRight } from 'react-icons/hi2'

const questions = [
  {
    q: 'What does "git stash" do?',
    options: [
      'Permanently deletes uncommitted changes',
      'Temporarily saves uncommitted changes for later use',
      'Creates a new branch from the current state',
      'Pushes changes to the remote repository',
    ],
    correct: 1,
    topic: 'Stashing',
  },
  {
    q: 'Which command creates a new Git branch?',
    options: [
      'git switch --new feature',
      'git branch feature',
      'git create branch feature',
      'git new-branch feature',
    ],
    correct: 1,
    topic: 'Branching',
  },
  {
    q: 'What is the difference between "git merge" and "git rebase"?',
    options: [
      'They are identical commands',
      'Merge creates a merge commit; rebase replays commits on a new base',
      'Rebase is only for remote repositories',
      'Merge is faster than rebase',
    ],
    correct: 1,
    topic: 'Merging',
  },
  {
    q: 'What does "git reset --soft HEAD~1" do?',
    options: [
      'Deletes the last commit and all changes',
      'Moves HEAD back one commit, keeping changes staged',
      'Unstages all files',
      'Creates a new commit',
    ],
    correct: 1,
    topic: 'Undoing Changes',
  },
  {
    q: 'What is a "bare repository" in Git?',
    options: [
      'A repository with no files',
      'A repository without a working directory, containing only the .git folder',
      'An empty repository that has never been committed to',
      'A repository on a private server',
    ],
    correct: 1,
    topic: 'Git Internals',
  },
]

export default function QuizPage() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [answers, setAnswers] = useState([])

  const question = questions[current]
  const isCorrect = selected === question.correct

  const handleAnswer = (index) => {
    if (selected !== null) return
    setSelected(index)
    setAnswers([...answers, { q: current, selected: index, correct: question.correct }])
    if (index === question.correct) setScore(score + 1)
  }

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setShowResult(true)
    } else {
      setCurrent(current + 1)
      setSelected(null)
    }
  }

  const handleRestart = () => {
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setShowResult(false)
    setAnswers([])
  }

  if (showResult) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <Card padding="p-10">
            <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl font-bold text-primary">{score}/{questions.length}</span>
            </div>
            <h2 className="font-poppins text-2xl font-bold mb-2">Quiz Complete!</h2>
            <p className="text-muted mb-8">
              {score === questions.length
                ? 'Perfect score! You are a Git master!'
                : score >= questions.length * 0.7
                ? 'Great job! You have strong Git knowledge.'
                : 'Keep practicing to improve your skills.'}
            </p>
            <div className="flex flex-col gap-3">
              <Button variant="primary" className="w-full" onClick={handleRestart}>
                Retake Quiz
              </Button>
              <Button variant="secondary" className="w-full" href="/challenges">
                Try Challenges
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    )
  }

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
            <Badge color="purple" dot>Quiz</Badge>
            <h1 className="font-poppins text-4xl sm:text-5xl font-bold mt-4 mb-4">
              Git <span className="gradient-text">Knowledge Check</span>
            </h1>
            <p className="text-muted text-lg">
              Test your understanding of Git concepts and commands.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted">
                Question {current + 1} of {questions.length}
              </span>
              <span className="text-sm text-primary font-medium">Score: {score}</span>
            </div>
            <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((current + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Badge color="muted" className="mb-4">{question.topic}</Badge>
              <h2 className="text-xl font-semibold mb-6">{question.q}</h2>

              <div className="space-y-3">
                {question.options.map((option, index) => {
                  let borderClass = 'border-border hover:border-muted'
                  let bgClass = 'bg-card hover:bg-card-hover'
                  if (selected !== null) {
                    if (index === question.correct) {
                      borderClass = 'border-green/50'
                      bgClass = 'bg-green/5'
                    } else if (index === selected && index !== question.correct) {
                      borderClass = 'border-red/50'
                      bgClass = 'bg-red/5'
                    } else {
                      borderClass = 'border-border opacity-50'
                      bgClass = 'bg-card'
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={selected !== null}
                      className={`w-full text-left p-4 rounded-xl border ${borderClass} ${bgClass} transition-all duration-200 flex items-center gap-3`}
                    >
                      <span className="w-7 h-7 rounded-lg bg-bg border border-border flex items-center justify-center text-xs font-mono flex-shrink-0">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="text-sm flex-1">{option}</span>
                      {selected !== null && index === question.correct && (
                        <HiOutlineCheckCircle className="w-5 h-5 text-green flex-shrink-0" />
                      )}
                      {selected !== null && index === selected && index !== question.correct && (
                        <HiOutlineXCircle className="w-5 h-5 text-red flex-shrink-0" />
                      )}
                    </button>
                  )
                })}
              </div>

              {selected !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6"
                >
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={handleNext}
                    iconRight={HiOutlineArrowRight}
                  >
                    {current + 1 >= questions.length ? 'See Results' : 'Next Question'}
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
