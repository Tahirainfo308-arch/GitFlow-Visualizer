import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useProgress } from '../context/ProgressContext'
import { modules, getTotalLessons } from '../services/lessonData'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { XPBar, LineChart, MiniBarChart, RadialProgress, HeatMap } from '../components/ui/Charts'
import { staggerContainer, staggerItem } from '../animations/variants'
import {
  HiOutlineBookOpen,
  HiOutlineFire,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineTrophy,
  HiOutlineArrowRight,
  HiOutlineAcademicCap,
  HiOutlineStar,
} from 'react-icons/hi2'

export default function DashboardPage() {
  const { progress, allBadges, resetProgress } = useProgress()

  const totalLessons = getTotalLessons()
  const completedLessonsCount = progress.completedLessons.length
  const overallProgress = totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0

  const weeklyXP = useMemo(() => {
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    const today = new Date().getDay()
    return days.map((label, i) => {
      const dayLogs = progress.activityLog.filter(l => {
        const d = new Date(l.timestamp)
        return d.getDay() === i
      })
      return { label, value: dayLogs.reduce((sum, l) => sum + (l.xp || 0), 0) }
    })
  }, [progress.activityLog])

  const monthlyData = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (29 - i))
      const dayStr = date.toDateString()
      const count = progress.activityLog.filter(l => new Date(l.timestamp).toDateString() === dayStr).length
      return count
    })
  }, [progress.activityLog])

  const earnedBadgesList = useMemo(() => {
    return allBadges.filter(b => progress.earnedBadges.includes(b.id))
  }, [allBadges, progress.earnedBadges])

  const stats = [
    { label: 'Total XP', value: progress.xp.toLocaleString(), icon: HiOutlineStar, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    { label: 'Level', value: progress.level, icon: HiOutlineTrophy, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Streak', value: `${progress.streak} days`, icon: HiOutlineFire, color: 'text-orange', bg: 'bg-orange/10' },
    { label: 'Lessons Done', value: `${completedLessonsCount}/${totalLessons}`, icon: HiOutlineBookOpen, color: 'text-green', bg: 'bg-green/10' },
    { label: 'Challenges', value: progress.completedChallenges.length, icon: HiOutlineCheckCircle, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Badges', value: earnedBadgesList.length, icon: HiOutlineAcademicCap, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  ]

  const recentActivity = progress.activityLog.slice(0, 10)

  const activityIcon = (activity) => {
    switch (activity.type) {
      case 'lesson': return { icon: HiOutlineBookOpen, color: 'bg-green/10 text-green', text: 'Completed lesson' }
      case 'quiz': return { icon: HiOutlineCheckCircle, color: 'bg-primary/10 text-primary', text: 'Quiz completed' }
      case 'challenge': return { icon: HiOutlineTrophy, color: 'bg-orange/10 text-orange', text: 'Challenge completed' }
      case 'badge': return { icon: HiOutlineAcademicCap, color: 'bg-yellow-500/10 text-yellow-400', text: 'Badge earned' }
      case 'certificate': return { icon: HiOutlineAcademicCap, color: 'bg-green/10 text-green', text: 'Certificate earned' }
      case 'xp': return { icon: HiOutlineStar, color: 'bg-primary/10 text-primary', text: `Earned ${activity.amount || ''} XP` }
      default: return { icon: HiOutlineClock, color: 'bg-muted/10 text-muted', text: 'Activity' }
    }
  }

  const formatTime = (ts) => {
    const d = new Date(ts)
    const now = new Date()
    const diff = now - d
    if (diff < 60000) return 'Just now'
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
    return `${Math.floor(diff / 86400000)}d ago`
  }

  return (
    <div className="min-h-screen">
      <section className="py-8 lg:py-12 bg-grid bg-radial relative">
        <div className="px-5 sm:px-8 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge color="blue" dot>Dashboard</Badge>
            <h1 className="font-poppins text-4xl sm:text-5xl font-bold mt-4 mb-4">
              Welcome back, <span className="gradient-text">Developer</span>
            </h1>
            <p className="text-muted text-lg mb-6">Track your progress and continue your Git learning journey.</p>
            <div className="max-w-sm">
              <XPBar xp={progress.xp} level={progress.level} size="lg" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="px-5 sm:px-8 lg:px-12">
          <motion.div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10" variants={staggerContainer} initial="hidden" animate="visible">
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={staggerItem}>
                <Card padding="p-4" hover={false}>
                  <div className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center mb-2`}>
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                  <p className="font-mono text-lg font-bold">{stat.value}</p>
                  <p className="text-[11px] text-muted">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            <Card padding="p-6" hover={false} className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Weekly XP</h3>
                <Badge color="blue" size="xs">This Week</Badge>
              </div>
              <div className="flex justify-center">
                <MiniBarChart data={weeklyXP} width={400} height={100} color="#58A6FF" />
              </div>
            </Card>

            <Card padding="p-6" hover={false}>
              <h3 className="font-semibold mb-4">Overall Progress</h3>
              <div className="flex items-center justify-center">
                <RadialProgress percentage={overallProgress} size={120} strokeWidth={8} color="#58A6FF" label="lessons" />
              </div>
              <div className="mt-4 space-y-2">
                {modules.map(mod => {
                  const modCompleted = mod.lessons.filter(l => progress.completedLessons.includes(l.id)).length
                  return (
                    <div key={mod.id} className="flex items-center gap-2">
                      <span className="text-lg">{mod.icon}</span>
                      <span className="text-xs text-muted flex-1 truncate">{mod.title}</span>
                      <span className="text-xs font-mono text-muted">{modCompleted}/{mod.lessons.length}</span>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            <Card padding="p-6" hover={false} className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Recent Activity</h3>
                <Badge color="muted" size="xs">{recentActivity.length} items</Badge>
              </div>
              {recentActivity.length === 0 ? (
                <p className="text-sm text-muted text-center py-8">No activity yet. Start learning to see your progress here.</p>
              ) : (
                <div className="space-y-3">
                  {recentActivity.map((activity, i) => {
                    const info = activityIcon(activity)
                    return (
                      <div key={i} className="flex items-center gap-3 p-2 rounded-lg">
                        <div className={`w-8 h-8 rounded-lg ${info.color} flex items-center justify-center flex-shrink-0`}>
                          <info.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{info.text}</p>
                          {activity.xp && <p className="text-xs text-primary">+{activity.xp} XP</p>}
                          {activity.lessonId && <p className="text-xs text-muted truncate">{activity.lessonId}</p>}
                          {activity.challengeId && <p className="text-xs text-muted truncate">{activity.challengeId}</p>}
                          {activity.badgeId && <p className="text-xs text-yellow-500">{allBadges.find(b => b.id === activity.badgeId)?.name}</p>}
                        </div>
                        <span className="text-[11px] text-muted whitespace-nowrap">{formatTime(activity.timestamp)}</span>
                      </div>
                    )
                  })}
                </div>
              )}
            </Card>

            <div className="space-y-6">
              <Card padding="p-6" hover={false}>
                <h3 className="font-semibold mb-3">Activity Heatmap</h3>
                <HeatMap data={monthlyData} weeks={8} />
                <p className="text-[10px] text-muted mt-2">Last 8 weeks of activity</p>
              </Card>

              <Card padding="p-6" hover={false}>
                <div className="flex items-center gap-2 mb-4">
                  <HiOutlineTrophy className="w-5 h-5 text-yellow-500" />
                  <h3 className="font-semibold">Achievements</h3>
                </div>
                {earnedBadgesList.length === 0 ? (
                  <p className="text-xs text-muted text-center py-4">Complete lessons and quizzes to earn badges.</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {earnedBadgesList.map(badge => (
                      <div key={badge.id} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-card border border-border text-xs">
                        <span>{badge.icon}</span>
                        <span className="font-medium">{badge.name}</span>
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-[10px] text-muted mt-3">{earnedBadgesList.length}/{allBadges.length} badges earned</p>
              </Card>
            </div>
          </div>

          <div className="flex justify-center">
            <Button variant="ghost" size="sm" onClick={resetProgress} className="text-xs text-muted">
              Reset All Progress
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
