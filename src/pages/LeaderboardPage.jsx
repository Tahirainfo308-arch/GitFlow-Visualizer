import { motion } from 'framer-motion'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { staggerContainer, staggerItem } from '../animations/variants'
import { HiOutlineTrophy, HiOutlineArrowUp, HiOutlineStar } from 'react-icons/hi2'

const leaderboard = [
  { rank: 1, name: 'Sarah Chen', avatar: 'SC', score: 12450, streak: 30, color: 'bg-primary/10 text-primary', badge: 'bg-yellow-500/10 text-yellow-400' },
  { rank: 2, name: 'Marcus Johnson', avatar: 'MJ', score: 11200, streak: 25, color: 'bg-green/10 text-green', badge: 'bg-gray-300/10 text-gray-300' },
  { rank: 3, name: 'Emily Park', avatar: 'EP', score: 10800, streak: 22, color: 'bg-orange/10 text-orange', badge: 'bg-orange/10 text-orange' },
  { rank: 4, name: 'Alex Rivera', avatar: 'AR', score: 9500, streak: 18, color: 'bg-primary/10 text-primary', badge: '' },
  { rank: 5, name: 'Priya Sharma', avatar: 'PS', score: 8900, streak: 15, color: 'bg-green/10 text-green', badge: '' },
  { rank: 6, name: 'David Kim', avatar: 'DK', score: 8200, streak: 12, color: 'bg-orange/10 text-orange', badge: '' },
  { rank: 7, name: 'Lisa Wang', avatar: 'LW', score: 7800, streak: 10, color: 'bg-primary/10 text-primary', badge: '' },
  { rank: 8, name: 'James Wilson', avatar: 'JW', score: 7200, streak: 9, color: 'bg-green/10 text-green', badge: '' },
  { rank: 9, name: 'Nina Patel', avatar: 'NP', score: 6800, streak: 8, color: 'bg-orange/10 text-orange', badge: '' },
  { rank: 10, name: 'Tom Garcia', avatar: 'TG', score: 6500, streak: 7, color: 'bg-primary/10 text-primary', badge: '' },
]

export default function LeaderboardPage() {
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
            <Badge color="yellow" dot>Leaderboard</Badge>
            <h1 className="font-poppins text-4xl sm:text-5xl font-bold mt-4 mb-4">
              Top <span className="text-yellow-400">Git Masters</span>
            </h1>
            <p className="text-muted text-lg">
              The most dedicated learners on the platform. Climb the ranks
              by completing lessons and challenges.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            {leaderboard.map((user) => (
              <motion.div key={user.rank} variants={staggerItem}>
                <Card
                  padding="p-4 sm:p-5"
                  className={`flex items-center gap-4 ${
                    user.rank <= 3 ? 'border-yellow-500/10' : ''
                  }`}
                >
                  <div className="w-8 text-center">
                    {user.rank <= 3 ? (
                      <HiOutlineTrophy className={`w-5 h-5 mx-auto ${
                        user.rank === 1 ? 'text-yellow-500' :
                        user.rank === 2 ? 'text-gray-300' :
                        'text-orange'
                      }`} />
                    ) : (
                      <span className="text-sm font-mono text-muted">#{user.rank}</span>
                    )}
                  </div>

                  <div className={`w-10 h-10 rounded-full ${user.color} flex items-center justify-center text-sm font-bold flex-shrink-0`}>
                    {user.avatar}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm truncate">{user.name}</p>
                      {user.badge && (
                        <Badge color={user.rank === 1 ? 'orange' : user.rank === 2 ? 'muted' : 'orange'} size="xs">
                          {user.rank === 1 ? 'Gold' : user.rank === 2 ? 'Silver' : 'Bronze'}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted">{user.streak} day streak</p>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <p className="font-mono font-bold text-primary">{user.score.toLocaleString()}</p>
                    <p className="text-xs text-muted">points</p>
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
