import { motion } from 'framer-motion'
import Button from '../ui/Button'
import { staggerContainer, staggerItem } from '../../animations/variants'
import { HiOutlineArrowRight, HiOutlinePlay } from 'react-icons/hi2'

function GitGraphSVG() {
  return (
    <svg viewBox="0 0 520 420" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="glow-blue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#58A6FF" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#58A6FF" stopOpacity="0" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <ellipse cx="260" cy="210" rx="200" ry="180" fill="url(#glow-blue)" />

      {Array.from({ length: 8 }).map((_, row) =>
        Array.from({ length: 10 }).map((_, col) => (
          <circle key={`${row}-${col}`} cx={40 + col * 50} cy={30 + row * 52} r="1" fill="var(--c-border, #30363D)" opacity="0.5" />
        ))
      )}

      <motion.path d="M 100 60 L 100 380" stroke="#58A6FF" strokeWidth="2.5" strokeOpacity="0.4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: 'easeInOut' }} />
      <motion.path d="M 100 120 C 160 120, 180 120, 240 140 L 240 260 C 240 280, 260 300, 300 320 L 340 340" stroke="#3FB950" strokeWidth="2.5" strokeOpacity="0.4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }} />
      <motion.path d="M 100 280 C 160 280, 180 260, 200 240 L 380 240 C 400 240, 400 260, 380 340" stroke="#F1502F" strokeWidth="2" strokeOpacity="0.35" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 1, ease: 'easeInOut' }} />

      {[{ cx: 100, cy: 60, color: '#58A6FF', delay: 0.3 }, { cx: 100, cy: 120, color: '#58A6FF', delay: 0.5 }, { cx: 100, cy: 190, color: '#58A6FF', delay: 0.7 }, { cx: 100, cy: 280, color: '#58A6FF', delay: 1.2 }, { cx: 100, cy: 350, color: '#58A6FF', delay: 1.6 }].map((c, i) => (
        <g key={`m-${i}`} filter="url(#glow)">
          <motion.circle cx={c.cx} cy={c.cy} r="8" fill="var(--c-card, #0D1117)" stroke={c.color} strokeWidth="2.5" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4, delay: c.delay, type: 'spring', stiffness: 200 }} />
          <motion.circle cx={c.cx} cy={c.cy} r="3" fill={c.color} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3, delay: c.delay + 0.2 }} />
        </g>
      ))}

      {[{ cx: 240, cy: 140, color: '#3FB950', delay: 1.0 }, { cx: 240, cy: 200, color: '#3FB950', delay: 1.3 }, { cx: 240, cy: 260, color: '#3FB950', delay: 1.5 }].map((c, i) => (
        <g key={`f-${i}`} filter="url(#glow)">
          <motion.circle cx={c.cx} cy={c.cy} r="7" fill="var(--c-card, #0D1117)" stroke={c.color} strokeWidth="2" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4, delay: c.delay, type: 'spring', stiffness: 200 }} />
          <motion.circle cx={c.cx} cy={c.cy} r="2.5" fill={c.color} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3, delay: c.delay + 0.15 }} />
        </g>
      ))}

      {[{ cx: 380, cy: 240, color: '#F1502F', delay: 1.8 }, { cx: 380, cy: 340, color: '#F1502F', delay: 2.0 }].map((c, i) => (
        <g key={`h-${i}`} filter="url(#glow)">
          <motion.circle cx={c.cx} cy={c.cy} r="6" fill="var(--c-card, #0D1117)" stroke={c.color} strokeWidth="2" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4, delay: c.delay, type: 'spring', stiffness: 200 }} />
          <motion.circle cx={c.cx} cy={c.cy} r="2" fill={c.color} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3, delay: c.delay + 0.15 }} />
        </g>
      ))}

      <motion.circle cx={340} cy={340} r="12" fill="none" stroke="#58A6FF" strokeWidth="1.5" strokeDasharray="4 3" initial={{ scale: 0, opacity: 0 }} animate={{ scale: [1, 1.3, 1], opacity: [0, 0.6, 0] }} transition={{ duration: 2, delay: 2.2, repeat: Infinity, repeatDelay: 3 }} />

      <motion.g initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2, duration: 0.5 }}>
        <rect x="55" y="337" width="40" height="20" rx="4" fill="#58A6FF" fillOpacity="0.15" stroke="#58A6FF" strokeWidth="1" />
        <text x="75" y="351" textAnchor="middle" fill="#58A6FF" fontSize="10" fontWeight="600" fontFamily="JetBrains Mono, monospace">HEAD</text>
      </motion.g>

      {[{ x: 60, y: 57, label: 'main', color: '#58A6FF', delay: 0.5 }, { x: 195, y: 137, label: 'feat/auth', color: '#3FB950', delay: 1.2 }, { x: 160, y: 277, label: 'hotfix/1.2', color: '#F1502F', delay: 2.0 }].map((l) => (
        <motion.g key={l.label} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: l.delay, duration: 0.4 }}>
          <rect x={l.x} y={l.y} width={l.label.length * 7.5 + 12} height="18" rx="4" fill={l.color} fillOpacity="0.12" stroke={l.color} strokeWidth="0.8" />
          <text x={l.x + (l.label.length * 7.5 + 12) / 2} y={l.y + 12.5} textAnchor="middle" fill={l.color} fontSize="9" fontWeight="500" fontFamily="JetBrains Mono, monospace">{l.label}</text>
        </motion.g>
      ))}
    </svg>
  )
}

function TerminalPreview() {
  const lines = [
    { prompt: '~$', cmd: 'git checkout -b feat/auth', color: 'text-text' },
    { prompt: '~$', cmd: 'git commit -m "add auth"', color: 'text-text' },
    { prompt: '~$', cmd: 'git checkout main', color: 'text-text' },
    { prompt: '~$', cmd: 'git merge feat/auth', color: 'text-green' },
    { prompt: '\u2713', cmd: 'Merge successful \u2014 3 commits', color: 'text-primary' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="bg-surface border border-border rounded-xl overflow-hidden shadow-2xl shadow-black/20"
    >
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border">
        <div className="w-2.5 h-2.5 rounded-full bg-red/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-orange/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-green/80" />
        <span className="ml-2 text-[10px] text-muted font-mono">terminal</span>
      </div>
      <div className="px-4 py-3 space-y-1">
        {lines.map((line, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.5 + i * 0.15, duration: 0.3 }} className="flex items-center gap-2 text-[11px] font-mono leading-relaxed">
            <span className="text-primary">{line.prompt}</span>
            <span className={line.color}>{line.cmd}</span>
          </motion.div>
        ))}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="flex items-center gap-2 text-[11px] font-mono">
          <span className="text-primary">~$</span>
          <span className="w-1.5 h-4 bg-primary/60 animate-pulse" />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function HeroSection() {
  const stats = [
    { value: '16+', label: 'Lessons' },
    { value: '8', label: 'Challenges' },
    { value: '12', label: 'Badges' },
    { value: '100%', label: 'Free' },
  ]

  return (
    <section
      className="break-out"
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - 90px)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', inset: 0 }} className="bg-grid opacity-40" />
      <div style={{ position: 'absolute', inset: 0 }} className="bg-radial" />

      <div
        style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1280px', margin: '0 auto', paddingTop: '3rem', paddingBottom: '3rem', paddingLeft: '2rem', paddingRight: '2rem' }}
      >
        <div
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '3rem' }}
          className="flex-col lg:!flex-row"
        >
          {/* LEFT: Text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            style={{ maxWidth: '560px' }}
          >
            <motion.div variants={staggerItem} style={{ marginBottom: '1.5rem' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 16px',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(88,166,255,0.1)',
                  border: '1px solid rgba(88,166,255,0.2)',
                  color: 'var(--c-primary)',
                  fontSize: '13px',
                  fontWeight: 500,
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--c-primary)' }} className="animate-pulse-glow" />
                Interactive Git Learning Platform
              </span>
            </motion.div>

            <motion.h1
              variants={staggerItem}
              style={{
                fontSize: 'clamp(36px, 5vw, 64px)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                marginBottom: '1.5rem',
              }}
            >
              Learn Git{' '}
              <span className="gradient-text">Visually.</span>
              <br />
              <span style={{ color: 'var(--c-muted)', fontWeight: 600, fontSize: 'clamp(22px, 3vw, 38px)' }}>
                Master Every Command.
              </span>
            </motion.h1>

            <motion.p
              variants={staggerItem}
              style={{
                color: 'var(--c-muted)',
                fontSize: 'clamp(16px, 1.5vw, 18px)',
                maxWidth: '480px',
                lineHeight: 1.7,
                marginBottom: '2.5rem',
              }}
            >
              Interactive lessons, real-time branch visualizations, and
              hands-on practice. The modern way to learn Git.
            </motion.p>

            <motion.div variants={staggerItem} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }} className="flex-col sm:!flex-row">
              <Button variant="primary" size="lg" href="/learn" iconRight={HiOutlineArrowRight}>
                Start Learning Free
              </Button>
              <Button variant="secondary" size="lg" href="/playground" icon={HiOutlinePlay}>
                Open Playground
              </Button>
            </motion.div>

            <motion.div
              variants={staggerItem}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '500px', width: '100%', marginTop: '2.5rem' }}
            >
              {stats.map((stat, i) => (
                <div key={stat.label} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.2 }}>{stat.value}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--c-muted)', marginTop: '2px' }}>{stat.label}</p>
                  </div>
                  {i < stats.length - 1 && (
                    <div style={{ width: '1px', height: '40px', backgroundColor: 'var(--c-border)' }} />
                  )}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT: Graph + Terminal */}
          <motion.div
            style={{ width: '100%', maxWidth: '520px' }}
            className="mx-auto lg:mx-0"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              style={{
                position: 'relative',
                borderRadius: '16px',
                border: '1px solid var(--c-border)',
                backgroundColor: 'var(--c-card)',
                padding: '8px',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
              }}
            >
              <div style={{ aspectRatio: '5/4', borderRadius: '12px', overflow: 'hidden', backgroundColor: 'var(--c-bg)' }}>
                <GitGraphSVG />
              </div>
            </div>
            <div style={{ marginTop: '16px' }}>
              <TerminalPreview />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
