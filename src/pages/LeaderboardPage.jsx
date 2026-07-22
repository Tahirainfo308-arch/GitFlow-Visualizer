import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useProgress } from '../context/ProgressContext'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { staggerContainer, staggerItem } from '../animations/variants'
import { HiOutlineTrophy, HiOutlineFire, HiOutlineStar, HiOutlineAcademicCap } from 'react-icons/hi2'

const BOT_NAMES = [
  'Sarah Chen', 'Marcus Johnson', 'Emily Park', 'Alex Rivera',
  'Priya Sharma', 'David Kim', 'Lisa Wang', 'James Wilson',
  'Nina Patel', 'Tom Garcia', 'Mia Thompson', 'Raj Patel',
]

function generateBotUsers() {
  const names = [...BOT_NAMES]
  const shuffled = names.sort(() => 0.5 - Math.random())
  return shuffled.map((name, i) => ({
    name,
    avatar: name.split(' ').map(n => n[0]).join(''),
    xp: Math.floor(Math.random() * 800) + 200,
    streak: Math.floor(Math.random() * 20) + 1,
    badges: Math.floor(Math.random() * 8) + 1,
    lessons: Math.floor(Math.random() * 12) + 2,
    isBot: true,
    color: ['bg-primary/10 text-primary', 'bg-green/10 text-green', 'bg-orange/10 text-orange'][i % 3],
  }))
}

export default function LeaderboardPage() {
  const { progress } = useProgress()

  const allUsers = useMemo(() => {
    const bots = generateBotUsers()
    const me = {
      name: 'You',
      avatar: 'YO',
      xp: progress.xp,
      streak: progress.streak,
      badges: progress.earnedBadges.length,
      lessons: progress.completedLessons.length,
      isBot: false,
      color: 'bg-primary/10 text-primary',
      isYou: true,
    }
    return [...bots, me].sort((a, b) => b.xp - a.xp)
  }, [progress])

  const myRank = allUsers.findIndex(u => u.isYou) + 1

  return (
    <div className="min-h-screen">
      <section className="py-8 lg:py-12 bg-grid bg-radial relative">
        <div className="px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <Badge color="yellow" dot>Leaderboard</Badge>
            <h1 className="font-poppins text-4xl sm:text-5xl font-bold mt-4 mb-4">
              Top <span className="text-yellow-400">Git Masters</span>
            </h1>
            <p className="text-muted text-lg">
              Earn XP by completing lessons, quizzes, and challenges to climb the ranks.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-6">
          {myRank > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 rounded-xl border border-primary/20 bg-primary/5"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-mono text-primary">#{myRank}</span>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">YO</div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Your Rank</p>
                  <p className="text-xs text-muted">{progress.xp.toLocaleString()} XP &middot; Level {progress.level}</p>
                </div>
                <Badge color="blue" size="sm">#{myRank} of {allUsers.length}</Badge>
              </div>
            </motion.div>
          )}

          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-2">
            {allUsers.map((user, index) => (
              <motion.div key={user.name + index} variants={staggerItem}>
                <Card
                  padding="p-3 sm:p-4"
                  className={`flex items-center gap-3 sm:gap-4 ${
                    user.isYou ? 'border-primary/30 bg-primary/5' : ''
                  } ${index < 3 ? 'border-yellow-500/10' : ''}`}
                >
                  <div className="w-8 text-center flex-shrink-0">
                    {index === 0 ? <HiOutlineTrophy className="w-5 h-5 text-yellow-500 mx-auto" /> :
                     index === 1 ? <HiOutlineTrophy className="w-5 h-5 text-gray-400 mx-auto" /> :
                     index === 2 ? <HiOutlineTrophy className="w-5 h-5 text-orange mx-auto" /> :
                     <span className="text-sm font-mono text-muted">#{index + 1}</span>}
                  </div>

                  <div className={`w-10 h-10 rounded-full ${user.color} flex items-center justify-center text-sm font-bold flex-shrink-0`}>
                    {user.avatar}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm truncate">{user.name}</p>
                      {user.isYou && <Badge color="blue" size="xs">You</Badge>}
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-[11px] text-muted flex items-center gap-1">
                        <HiOutlineFire className="w-3 h-3 text-orange" />{user.streak}
                      </span>
                      <span className="text-[11px] text-muted flex items-center gap-1">
                        <HiOutlineAcademicCap className="w-3 h-3" />{user.badges}
                      </span>
                      <span className="text-[11px] text-muted flex items-center gap-1">
                        <HiOutlineStar className="w-3 h-3 text-yellow-500" />{user.lessons} lessons
                      </span>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <p className="font-mono font-bold text-primary text-sm">{user.xp.toLocaleString()}</p>
                    <p className="text-[10px] text-muted">XP</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
