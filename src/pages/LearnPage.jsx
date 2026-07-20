import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { modules, getModuleProgress } from '../services/lessonData'
import { useProgress } from '../context/ProgressContext'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { XPBar, RadialProgress } from '../components/ui/Charts'
import { staggerContainer, staggerItem } from '../animations/variants'
import {
  HiOutlineBookOpen,
  HiOutlineCheckCircle,
  HiOutlineLockClosed,
  HiOutlineArrowRight,
  HiOutlineArrowLeft,
  HiOutlinePlay,
} from 'react-icons/hi2'

const levelColor = { Beginner: 'green', Intermediate: 'blue', Advanced: 'orange' }

function LessonViewer({ lesson, module, onClose }) {
  const { completeLesson, checkBadges, earnCertificate, progress } = useProgress()
  const [currentStep, setCurrentStep] = useState(0)
  const isCompleted = progress.completedLessons.includes(lesson.id)
  const isLast = currentStep >= lesson.content.length - 1

  const handleComplete = () => {
    completeLesson(module.id, lesson.id)
    setTimeout(() => {
      checkBadges()
      const allDone = module.lessons.every(l =>
        l.id === lesson.id || progress.completedLessons.includes(l.id)
      )
      if (allDone) earnCertificate(module.id)
    }, 100)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-bg overflow-y-auto"
    >
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-muted hover:text-text hover:bg-card transition-colors"
          >
            <HiOutlineArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <Badge color={levelColor[module.level]} size="sm">{module.title}</Badge>
            <h2 className="font-poppins text-2xl font-bold mt-2">{lesson.title}</h2>
          </div>
          {isCompleted && <Badge color="green" dot size="sm">Completed</Badge>}
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            {lesson.content.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  i <= currentStep ? 'bg-primary' : 'bg-border'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-muted">
            Step {currentStep + 1} of {lesson.content.length}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            {(() => {
              const block = lesson.content[currentStep]
              switch (block.type) {
                case 'text':
                  return <p className="text-text leading-relaxed text-base">{block.value}</p>
                case 'heading':
                  return <h3 className="font-poppins text-xl font-semibold mb-3 mt-6">{block.value}</h3>
                case 'code':
                  return (
                    <pre className="bg-surface border border-border rounded-xl p-5 overflow-x-auto font-mono text-sm text-green leading-relaxed">
                      <code>{block.value}</code>
                    </pre>
                  )
                case 'callout':
                  return (
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-sm text-muted leading-relaxed">
                      {block.value}
                    </div>
                  )
                default:
                  return null
              }
            })()}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="md"
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          {isLast && !isCompleted ? (
            <Button
              variant="success"
              size="md"
              onClick={handleComplete}
              icon={HiOutlineCheckCircle}
              className="flex-1"
            >
              Complete Lesson (+{lesson.xp} XP)
            </Button>
          ) : isLast && isCompleted ? (
            <Button variant="secondary" size="md" onClick={onClose} className="flex-1">
              Back to Lessons
            </Button>
          ) : (
            <Button
              variant="primary"
              size="md"
              onClick={() => setCurrentStep(prev => prev + 1)}
              iconRight={HiOutlineArrowRight}
              className="flex-1"
            >
              Continue
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function LearnPage() {
  const { progress } = useProgress()
  const [selectedModule, setSelectedModule] = useState(null)
  const [activeLesson, setActiveLesson] = useState(null)

  const activeMod = activeLesson ? modules.find(m => m.lessons.some(l => l.id === activeLesson.id)) : null

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
            <p className="text-muted text-lg leading-relaxed mb-6">
              Structured modules from beginner to advanced. Each lesson includes
              interactive examples and practice exercises.
            </p>
            <div className="max-w-xs">
              <XPBar xp={progress.xp} level={progress.level} size="md" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="space-y-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {modules.map((mod) => {
              const moduleProgress = getModuleProgress(mod.id, progress.completedLessons)
              const completedCount = mod.lessons.filter(l => progress.completedLessons.includes(l.id)).length
              const isExpanded = selectedModule === mod.id

              return (
                <motion.div key={mod.id} variants={staggerItem}>
                  <Card padding="p-0" hover={false} className="overflow-hidden">
                    <button
                      onClick={() => setSelectedModule(isExpanded ? null : mod.id)}
                      className="w-full text-left p-6 flex items-center gap-5 hover:bg-card-hover transition-colors"
                    >
                      <div className="text-3xl">{mod.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-poppins font-semibold text-lg">{mod.title}</h3>
                          <Badge color={levelColor[mod.level]} size="xs">{mod.level}</Badge>
                        </div>
                        <p className="text-sm text-muted truncate">{mod.description}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs text-muted">{completedCount}/{mod.lessons.length} lessons</span>
                          <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden max-w-[200px]">
                            <motion.div
                              className="h-full bg-primary rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${moduleProgress}%` }}
                              transition={{ duration: 0.8, ease: 'easeOut' }}
                            />
                          </div>
                          <span className="text-xs text-primary font-medium">{moduleProgress}%</span>
                        </div>
                      </div>
                      <RadialProgress percentage={moduleProgress} size={56} strokeWidth={4} color="#58A6FF" />
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-border p-6 space-y-2">
                            {mod.lessons.map((lesson, i) => {
                              const isCompleted = progress.completedLessons.includes(lesson.id)
                              return (
                                <div
                                  key={lesson.id}
                                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-card-hover transition-colors group"
                                >
                                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono ${
                                    isCompleted ? 'bg-green/10 text-green' : 'bg-border text-muted'
                                  }`}>
                                    {isCompleted ? <HiOutlineCheckCircle className="w-4 h-4" /> : i + 1}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium">{lesson.title}</p>
                                    <p className="text-xs text-muted">{lesson.xp} XP</p>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => { e.stopPropagation(); setActiveLesson(lesson) }}
                                    icon={HiOutlinePlay}
                                  >
                                    {isCompleted ? 'Review' : 'Start'}
                                  </Button>
                                </div>
                              )
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {activeLesson && activeMod && (
          <LessonViewer
            lesson={activeLesson}
            module={activeMod}
            onClose={() => setActiveLesson(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
