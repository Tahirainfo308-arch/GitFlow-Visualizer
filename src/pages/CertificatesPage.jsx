import { motion } from 'framer-motion'
import { useProgress } from '../context/ProgressContext'
import { modules, getModuleProgress } from '../services/lessonData'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { staggerContainer, staggerItem } from '../animations/variants'
import { HiOutlineAcademicCap, HiOutlineCheckCircle, HiOutlineLockClosed } from 'react-icons/hi2'

function CertificateCard({ module, earned, progress }) {
  return (
    <motion.div variants={staggerItem}>
      <div className={`relative rounded-2xl border overflow-hidden ${
        earned
          ? 'border-primary/30 bg-gradient-to-br from-card via-card to-primary/5'
          : 'border-border bg-card opacity-70'
      }`}>
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="relative p-8 text-center">
          <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${
            earned ? 'bg-primary/10 border border-primary/20' : 'bg-border/50'
          }`}>
            <HiOutlineAcademicCap className={`w-8 h-8 ${earned ? 'text-primary' : 'text-muted'}`} />
          </div>

          <div className="mb-3">
            <span className="text-3xl">{module.icon}</span>
          </div>

          <h3 className="font-poppins text-lg font-bold mb-1">{module.title}</h3>
          <p className="text-xs text-muted mb-4">{module.level} &middot; {module.lessons.length} lessons</p>

          {earned ? (
            <div className="border-t border-primary/20 pt-4 mt-4">
              <Badge color="green" dot size="sm">Certificate Earned</Badge>
              <div className="mt-3 p-3 rounded-xl bg-surface border border-border">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <HiOutlineAcademicCap className="w-4 h-4 text-primary" />
                  <span className="font-poppins font-bold text-sm gradient-text">Certificate of Completion</span>
                </div>
                <p className="text-[10px] text-muted">Awarded for completing all {module.lessons.length} lessons in {module.title}</p>
                <div className="mt-2 flex items-center justify-center gap-4 text-[9px] text-muted">
                  <span>GitFlow Visualizer</span>
                  <span>&middot;</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="border-t border-border pt-4 mt-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <HiOutlineLockClosed className="w-4 h-4 text-muted" />
                <span className="text-xs text-muted">Complete all lessons to unlock</span>
              </div>
              <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-[10px] text-muted mt-1">{progress}% complete</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function CertificatesPage() {
  const { progress } = useProgress()
  const earnedCount = modules.filter(m =>
    m.lessons.every(l => progress.completedLessons.includes(l.id))
  ).length

  return (
    <div className="min-h-screen">
      <section className="py-20 sm:py-[100px] lg:py-[120px] bg-grid bg-radial relative">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <Badge color="yellow" dot>Certificates</Badge>
            <h1 className="font-poppins text-4xl sm:text-5xl font-bold mt-4 mb-4">
              Your <span className="gradient-text">Certificates</span>
            </h1>
            <p className="text-muted text-lg">
              Complete all lessons in a module to earn a certificate of completion.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-4 mb-10">
            <Badge color="green" size="sm">{earnedCount}/{modules.length} Earned</Badge>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {modules.map(mod => {
              const modProgress = getModuleProgress(mod.id, progress.completedLessons)
              const isEarned = mod.lessons.every(l => progress.completedLessons.includes(l.id))
              return (
                <CertificateCard
                  key={mod.id}
                  module={mod}
                  earned={isEarned}
                  progress={modProgress}
                />
              )
            })}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
