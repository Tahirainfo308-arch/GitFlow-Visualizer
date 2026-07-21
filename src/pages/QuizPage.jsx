import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useProgress } from '../context/ProgressContext'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { staggerContainer, staggerItem } from '../animations/variants'
import { HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineArrowRight, HiOutlineTrophy } from 'react-icons/hi2'

const quizzes = [
  {
    id: 'fundamentals-quiz',
    title: 'Git Fundamentals',
    module: 'Fundamentals',
    color: 'green',
    questions: [
      { q: 'What does "git init" do?', options: ['Creates a new file', 'Initializes a new Git repository', 'Connects to GitHub', 'Deletes a repository'], correct: 1 },
      { q: 'What is the staging area?', options: ['Where files are deleted', 'An intermediate area for preparing commits', 'The GitHub server', 'A backup folder'], correct: 1 },
      { q: 'What command shows the commit history?', options: ['git history', 'git log', 'git show', 'git list'], correct: 1 },
      { q: 'What does .gitignore do?', options: ['Deletes files', 'Tells Git which files to ignore', 'Hides the .git folder', 'Ignores merge conflicts'], correct: 1 },
      { q: 'What is the correct way to commit with a message?', options: ['git commit "msg"', 'git commit -m "msg"', 'git message "msg"', 'git save "msg"'], correct: 1 },
    ],
  },
  {
    id: 'branching-quiz',
    title: 'Branching & Merging',
    module: 'Branching',
    color: 'blue',
    questions: [
      { q: 'What does "git checkout -b" do?', options: ['Deletes a branch', 'Creates and switches to a new branch', 'Merges two branches', 'Lists all branches'], correct: 1 },
      { q: 'What causes merge conflicts?', options: ['Slow internet', 'Both branches modify the same lines', 'Using GitHub', 'Having too many commits'], correct: 1 },
      { q: 'What does HEAD represent?', options: ['The first commit', 'The current branch or commit', 'The remote repository', 'The staging area'], correct: 1 },
      { q: 'What is a fast-forward merge?', options: ['A merge with conflicts', 'When main hasn\'t changed, Git moves the pointer', 'A merge with --no-ff', 'A merge that deletes branches'], correct: 1 },
      { q: 'How do you delete a branch?', options: ['git delete branch', 'git branch -d name', 'git remove branch', 'git branch --delete-all'], correct: 1 },
    ],
  },
  {
    id: 'advanced-quiz',
    title: 'Advanced Git',
    module: 'Advanced',
    color: 'orange',
    questions: [
      { q: 'What does "git rebase -i" do?', options: ['Merges branches', 'Interactive rebase to rewrite history', 'Creates a new branch', 'Shows commit diff'], correct: 1 },
      { q: 'What is cherry-pick?', options: ['Deleting commits', 'Applying a specific commit to another branch', 'Merging all branches', 'Resetting to the first commit'], correct: 1 },
      { q: 'What is the difference between reset and revert?', options: ['No difference', 'Reset moves HEAD; revert creates an undo commit', 'Revert is faster', 'Reset only works on main'], correct: 1 },
      { q: 'What does "git stash" do?', options: ['Deletes changes', 'Temporarily saves uncommitted changes', 'Pushes to remote', 'Creates a tag'], correct: 1 },
      { q: 'How do you recover lost commits?', options: ['git recover', 'git reflog', 'git undo', 'git rescue'], correct: 1 },
    ],
  },
]

export default function QuizPage() {
  const { progress, saveQuizScore, checkBadges, addXP } = useProgress()
  const [selectedQuiz, setSelectedQuiz] = useState(null)
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [answers, setAnswers] = useState([])

  const question = selectedQuiz?.questions[current]

  const handleAnswer = (index) => {
    if (selected !== null) return
    setSelected(index)
    setAnswers([...answers, { q: current, selected: index, correct: question.correct }])
    if (index === question.correct) setScore(score + 1)
  }

  const handleNext = () => {
    if (current + 1 >= selectedQuiz.questions.length) {
      saveQuizScore(selectedQuiz.id, score + (selected === question.correct ? 1 : 0), selectedQuiz.questions.length)
      setTimeout(() => checkBadges(), 100)
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

  const handleBack = () => {
    setSelectedQuiz(null)
    handleRestart()
  }

  if (showResult && selectedQuiz) {
    const total = selectedQuiz.questions.length
    const percentage = Math.round((score / total) * 100)
    const xpEarned = score * 20

    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-[88px] pb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <Card padding="p-10" hover={false} className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6"
            >
              <HiOutlineTrophy className="w-10 h-10 text-primary" />
            </motion.div>
            <h2 className="font-poppins text-2xl font-bold mb-2">Quiz Complete!</h2>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-4xl font-bold gradient-text">{score}/{total}</span>
            </div>
            <div className="flex items-center justify-center gap-4 mb-6 text-sm">
              <Badge color={percentage === 100 ? 'green' : percentage >= 60 ? 'blue' : 'red'}>
                {percentage}%
              </Badge>
              <Badge color="orange">+{xpEarned} XP</Badge>
            </div>
            <p className="text-muted text-sm mb-8">
              {percentage === 100
                ? 'Perfect score! You are a Git master!'
                : percentage >= 60
                ? 'Great job! Keep practicing to reach 100%.'
                : 'Review the lessons and try again.'}
            </p>
            <div className="flex flex-col gap-3">
              <Button variant="primary" className="w-full" onClick={handleRestart}>
                Retake Quiz
              </Button>
              <Button variant="secondary" className="w-full" onClick={handleBack}>
                Back to Quizzes
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    )
  }

  if (selectedQuiz && question) {
    return (
      <div className="min-h-screen">
        <section className="py-20 sm:py-[100px] lg:py-[120px] bg-grid bg-radial relative">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
              <button onClick={handleBack} className="text-sm text-muted hover:text-text mb-4 flex items-center gap-1">
                Back to quizzes
              </button>
              <Badge color={selectedQuiz.color} dot>{selectedQuiz.title}</Badge>
              <h1 className="font-poppins text-4xl sm:text-5xl font-bold mt-4 mb-4">
                Git <span className="gradient-text">Knowledge Check</span>
              </h1>
            </motion.div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="max-w-2xl mx-auto px-5 sm:px-8 lg:px-12">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted">Question {current + 1} of {selectedQuiz.questions.length}</span>
                <span className="text-sm text-primary font-medium">Score: {score}</span>
              </div>
              <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  animate={{ width: `${((current + 1) / selectedQuiz.questions.length) * 100}%` }}
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
                        {selected !== null && index === question.correct && <HiOutlineCheckCircle className="w-5 h-5 text-green flex-shrink-0" />}
                        {selected !== null && index === selected && index !== question.correct && <HiOutlineXCircle className="w-5 h-5 text-red flex-shrink-0" />}
                      </button>
                    )
                  })}
                </div>

                {selected !== null && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                    <Button variant="primary" className="w-full" onClick={handleNext} iconRight={HiOutlineArrowRight}>
                      {current + 1 >= selectedQuiz.questions.length ? 'See Results' : 'Next Question'}
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

  return (
    <div className="min-h-screen">
      <section className="py-20 sm:py-[100px] lg:py-[120px] bg-grid bg-radial relative">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <Badge color="purple" dot>Quiz</Badge>
            <h1 className="font-poppins text-4xl sm:text-5xl font-bold mt-4 mb-4">
              Git <span className="gradient-text">Knowledge Check</span>
            </h1>
            <p className="text-muted text-lg">Test your understanding. Earn XP for every correct answer.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.div className="grid grid-cols-1 gap-4" variants={staggerContainer} initial="hidden" animate="visible">
            {quizzes.map((quiz) => {
              const prevScore = progress.quizScores[quiz.id]
              return (
                <motion.div key={quiz.id} variants={staggerItem}>
                  <Card className="flex items-center gap-5" padding="p-6">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{quiz.title}</h3>
                        <Badge color={quiz.color} size="xs">{quiz.questions.length} questions</Badge>
                      </div>
                      <p className="text-sm text-muted mb-2">{quiz.questions.length * 20} XP available</p>
                      {prevScore && (
                        <div className="flex items-center gap-2">
                          <Badge color={prevScore.percentage === 100 ? 'green' : 'muted'} size="xs">
                            Best: {prevScore.percentage}%
                          </Badge>
                          <span className="text-xs text-muted">{prevScore.score}/{prevScore.total}</span>
                        </div>
                      )}
                    </div>
                    <Button
                      variant={prevScore?.percentage === 100 ? 'secondary' : 'primary'}
                      size="sm"
                      onClick={() => { setSelectedQuiz(quiz); handleRestart() }}
                    >
                      {prevScore ? 'Retake' : 'Start Quiz'}
                    </Button>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
