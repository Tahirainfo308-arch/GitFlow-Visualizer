import { motion } from 'framer-motion'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { staggerContainer, staggerItem } from '../animations/variants'
import {
  HiOutlineBookOpen,
  HiOutlineFire,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineTrophy,
  HiOutlineArrowRight,
} from 'react-icons/hi2'

const stats = [
  { label: 'Lessons Completed', value: '24', icon: HiOutlineBookOpen, color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'Current Streak', value: '12 days', icon: HiOutlineFire, color: 'text-orange', bg: 'bg-orange/10' },
  { label: 'Challenges Solved', value: '8', icon: HiOutlineCheckCircle, color: 'text-green', bg: 'bg-green/10' },
  { label: 'Total Time', value: '18h 30m', icon: HiOutlineClock, color: 'text-muted', bg: 'bg-muted/10' },
]

const recentActivity = [
  { action: 'Completed lesson', detail: 'Branching & Merging - Conflict Resolution', time: '2 hours ago', color: 'bg-green/10 text-green' },
  { action: 'Solved challenge', detail: 'Interactive Rebase - Hard', time: '5 hours ago', color: 'bg-primary/10 text-primary' },
  { action: 'Quiz score', detail: 'Git Fundamentals Quiz - 90%', time: '1 day ago', color: 'bg-orange/10 text-orange' },
  { action: 'Achievement unlocked', detail: 'Week Warrior - 7 day streak', time: '2 days ago', color: 'bg-yellow-500/10 text-yellow-400' },
  { action: 'Completed lesson', detail: 'Remote Repositories - Fetch vs Pull', time: '3 days ago', color: 'bg-green/10 text-green' },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <section className="py-20 lg:py-28 bg-grid bg-radial relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge color="blue" dot>Dashboard</Badge>
            <h1 className="font-poppins text-4xl sm:text-5xl font-bold mt-4 mb-4">
              Welcome back, <span className="gradient-text">Developer</span>
            </h1>
            <p className="text-muted text-lg">
              Track your progress and continue your Git learning journey.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={staggerItem}>
                <Card padding="p-6" hover={false}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </div>
                  <p className="font-mono text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted mt-1">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card padding="p-6" hover={false}>
                <h3 className="font-semibold mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${activity.color.split(' ')[0]}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted truncate">{activity.detail}</p>
                      </div>
                      <span className="text-xs text-muted whitespace-nowrap">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="flex flex-col gap-6">
              <Card padding="p-6" hover={false}>
                <h3 className="font-semibold mb-4">Continue Learning</h3>
                <p className="text-sm text-muted mb-4">
                  You&apos;re 60% through &quot;Interactive Rebase&quot; module.
                </p>
                <div className="w-full h-2 bg-border rounded-full overflow-hidden mb-4">
                  <div className="h-full bg-primary rounded-full" style={{ width: '60%' }} />
                </div>
                <Button variant="primary" size="sm" className="w-full" iconRight={HiOutlineArrowRight}>
                  Continue
                </Button>
              </Card>

              <Card padding="p-6" hover={false}>
                <div className="flex items-center gap-2 mb-4">
                  <HiOutlineTrophy className="w-5 h-5 text-yellow-500" />
                  <h3 className="font-semibold">Achievements</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['First Commit', 'Streak Master', 'Quiz Pro', 'Challenger'].map((a) => (
                    <Badge key={a} color="orange" size="sm">{a}</Badge>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
