import { createContext, useContext, useState, useCallback } from 'react'

const ProgressContext = createContext()

const ALL_BADGES = [
  { id: 'first-commit', name: 'First Commit', description: 'Complete your first lesson', icon: '🎯', color: 'green', requirement: { type: 'lessons', count: 1 } },
  { id: 'quiz-ace', name: 'Quiz Ace', description: 'Score 100% on any quiz', icon: '🏆', color: 'orange', requirement: { type: 'perfect_quiz' } },
  { id: 'streak-3', name: 'On Fire', description: '3 day streak', icon: '🔥', color: 'orange', requirement: { type: 'streak', count: 3 } },
  { id: 'streak-7', name: 'Week Warrior', description: '7 day streak', icon: '⚡', color: 'yellow', requirement: { type: 'streak', count: 7 } },
  { id: 'xp-100', name: 'Century Club', description: 'Earn 100 XP', icon: '💎', color: 'blue', requirement: { type: 'xp', count: 100 } },
  { id: 'xp-500', name: 'XP Hunter', description: 'Earn 500 XP', icon: '🌟', color: 'purple', requirement: { type: 'xp', count: 500 } },
  { id: 'xp-1000', name: 'Git Master', description: 'Earn 1000 XP', icon: '👑', color: 'orange', requirement: { type: 'xp', count: 1000 } },
  { id: 'challenge-3', name: 'Challenger', description: 'Complete 3 challenges', icon: '⚔️', color: 'red', requirement: { type: 'challenges', count: 3 } },
  { id: 'challenge-5', name: 'Conqueror', description: 'Complete 5 challenges', icon: '🎖️', color: 'orange', requirement: { type: 'challenges', count: 5 } },
  { id: 'lessons-5', name: 'Bookworm', description: 'Complete 5 lessons', icon: '📚', color: 'blue', requirement: { type: 'lessons', count: 5 } },
  { id: 'lessons-10', name: 'Scholar', description: 'Complete 10 lessons', icon: '🎓', color: 'purple', requirement: { type: 'lessons', count: 10 } },
  { id: 'all-modules', name: 'Graduate', description: 'Complete all modules', icon: '🏅', color: 'yellow', requirement: { type: 'all_modules' } },
]

const INITIAL_STATE = {
  xp: 0,
  level: 1,
  streak: 1,
  lastActive: new Date().toDateString(),
  completedLessons: [],
  completedModules: [],
  quizScores: {},
  completedChallenges: [],
  earnedBadges: [],
  activityLog: [],
  certificates: [],
}

function calculateLevel(xp) {
  return Math.floor(xp / 100) + 1
}

function xpForLevel(level) {
  return (level - 1) * 100
}

function xpProgress(xp) {
  return xp % 100
}

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem('gitflow-progress')
      return saved ? { ...INITIAL_STATE, ...JSON.parse(saved) } : INITIAL_STATE
    } catch {
      return INITIAL_STATE
    }
  })

  const saveProgress = useCallback((newState) => {
    setProgress(newState)
    try {
      localStorage.setItem('gitflow-progress', JSON.stringify(newState))
    } catch {}
  }, [])

  const addXP = useCallback((amount, reason) => {
    setProgress(prev => {
      const newXP = prev.xp + amount
      const newLevel = calculateLevel(newXP)
      const now = new Date().toDateString()
      let newStreak = prev.streak
      if (prev.lastActive !== now) {
        const last = new Date(prev.lastActive)
        const today = new Date(now)
        const diff = Math.floor((today - last) / (1000 * 60 * 60 * 24))
        newStreak = diff === 1 ? prev.streak + 1 : 1
      }
      const newState = {
        ...prev,
        xp: newXP,
        level: newLevel,
        streak: newStreak,
        lastActive: now,
        activityLog: [
          { type: 'xp', amount, reason, timestamp: Date.now() },
          ...prev.activityLog,
        ].slice(0, 50),
      }
      try { localStorage.setItem('gitflow-progress', JSON.stringify(newState)) } catch {}
      return newState
    })
  }, [])

  const completeLesson = useCallback((moduleId, lessonId) => {
    setProgress(prev => {
      if (prev.completedLessons.includes(lessonId)) return prev
      const newCompleted = [...prev.completedLessons, lessonId]
      const now = new Date().toDateString()
      let newStreak = prev.streak
      if (prev.lastActive !== now) {
        const last = new Date(prev.lastActive)
        const today = new Date(now)
        const diff = Math.floor((today - last) / (1000 * 60 * 60 * 24))
        newStreak = diff === 1 ? prev.streak + 1 : 1
      }
      const xpGain = 25
      const newXP = prev.xp + xpGain
      const newState = {
        ...prev,
        completedLessons: newCompleted,
        xp: newXP,
        level: calculateLevel(newXP),
        streak: newStreak,
        lastActive: now,
        activityLog: [
          { type: 'lesson', lessonId, moduleId, timestamp: Date.now(), xp: xpGain },
          ...prev.activityLog,
        ].slice(0, 50),
      }
      try { localStorage.setItem('gitflow-progress', JSON.stringify(newState)) } catch {}
      return newState
    })
  }, [])

  const completeChallenge = useCallback((challengeId) => {
    setProgress(prev => {
      if (prev.completedChallenges.includes(challengeId)) return prev
      const xpGain = 50
      const newXP = prev.xp + xpGain
      const now = new Date().toDateString()
      const newState = {
        ...prev,
        completedChallenges: [...prev.completedChallenges, challengeId],
        xp: newXP,
        level: calculateLevel(newXP),
        lastActive: now,
        activityLog: [
          { type: 'challenge', challengeId, timestamp: Date.now(), xp: xpGain },
          ...prev.activityLog,
        ].slice(0, 50),
      }
      try { localStorage.setItem('gitflow-progress', JSON.stringify(newState)) } catch {}
      return newState
    })
  }, [])

  const saveQuizScore = useCallback((quizId, score, total) => {
    setProgress(prev => {
      const percentage = Math.round((score / total) * 100)
      const xpGain = score * 20
      const newXP = prev.xp + xpGain
      const now = new Date().toDateString()
      const isPerfect = score === total
      const newState = {
        ...prev,
        quizScores: {
          ...prev.quizScores,
          [quizId]: { score, total, percentage, timestamp: Date.now() },
        },
        xp: newXP,
        level: calculateLevel(newXP),
        lastActive: now,
        activityLog: [
          { type: 'quiz', quizId, score, total, percentage, timestamp: Date.now(), xp: xpGain },
          ...prev.activityLog,
        ].slice(0, 50),
      }
      try { localStorage.setItem('gitflow-progress', JSON.stringify(newState)) } catch {}
      return newState
    })
  }, [])

  const earnBadge = useCallback((badgeId) => {
    setProgress(prev => {
      if (prev.earnedBadges.includes(badgeId)) return prev
      const newState = {
        ...prev,
        earnedBadges: [...prev.earnedBadges, badgeId],
        activityLog: [
          { type: 'badge', badgeId, timestamp: Date.now() },
          ...prev.activityLog,
        ].slice(0, 50),
      }
      try { localStorage.setItem('gitflow-progress', JSON.stringify(newState)) } catch {}
      return newState
    })
  }, [])

  const earnCertificate = useCallback((moduleId) => {
    setProgress(prev => {
      if (prev.certificates.includes(moduleId)) return prev
      const now = new Date()
      const newState = {
        ...prev,
        certificates: [...prev.certificates, moduleId],
        completedModules: [...prev.completedModules, moduleId],
        activityLog: [
          { type: 'certificate', moduleId, timestamp: now.getTime() },
          ...prev.activityLog,
        ].slice(0, 50),
      }
      try { localStorage.setItem('gitflow-progress', JSON.stringify(newState)) } catch {}
      return newState
    })
  }, [])

  const checkBadges = useCallback(() => {
    const { xp, streak, completedLessons, completedChallenges, quizScores } = progress
    ALL_BADGES.forEach(badge => {
      if (progress.earnedBadges.includes(badge.id)) return
      const req = badge.requirement
      let earned = false
      if (req.type === 'xp' && xp >= req.count) earned = true
      if (req.type === 'streak' && streak >= req.count) earned = true
      if (req.type === 'lessons' && completedLessons.length >= req.count) earned = true
      if (req.type === 'challenges' && completedChallenges.length >= req.count) earned = true
      if (req.type === 'perfect_quiz') {
        earned = Object.values(quizScores).some(s => s.percentage === 100)
      }
      if (req.type === 'all_modules') {
        earned = progress.completedModules.length >= 3
      }
      if (earned) earnBadge(badge.id)
    })
  }, [progress, earnBadge])

  const resetProgress = useCallback(() => {
    saveProgress(INITIAL_STATE)
  }, [saveProgress])

  return (
    <ProgressContext.Provider value={{
      progress,
      allBadges: ALL_BADGES,
      addXP,
      completeLesson,
      completeChallenge,
      saveQuizScore,
      earnBadge,
      earnCertificate,
      checkBadges,
      resetProgress,
      calculateLevel,
      xpForLevel,
      xpProgress,
    }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (!context) throw new Error('useProgress must be used within ProgressProvider')
  return context
}
