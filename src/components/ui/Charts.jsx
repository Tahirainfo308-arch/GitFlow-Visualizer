import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export function XPBar({ xp, level, size = 'md' }) {
  const progress = xp % 100
  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-muted">Level {level}</span>
        <span className="text-xs text-muted font-mono">{progress}/100 XP</span>
      </div>
      <div className={`w-full ${sizes[size]} bg-border rounded-full overflow-hidden`}>
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-green rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}

export function MiniBarChart({ data, width = 200, height = 60, color = '#58A6FF' }) {
  if (!data || data.length === 0) return null
  const max = Math.max(...data.map(d => d.value), 1)
  const barWidth = (width / data.length) - 4

  return (
    <svg width={width} height={height} className="overflow-visible">
      {data.map((d, i) => {
        const barHeight = (d.value / max) * (height - 8)
        return (
          <g key={i}>
            <motion.rect
              x={i * (barWidth + 4) + 2}
              y={height - barHeight}
              width={barWidth}
              height={barHeight}
              rx={3}
              fill={d.color || color}
              fillOpacity={0.8}
              initial={{ height: 0, y: height }}
              animate={{ height: barHeight, y: height - barHeight }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            />
            {d.label && (
              <text
                x={i * (barWidth + 4) + 2 + barWidth / 2}
                y={height + 14}
                textAnchor="middle"
                fill="#8B949E"
                fontSize="9"
                fontFamily="'JetBrains Mono', monospace"
              >
                {d.label}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}

export function RadialProgress({ percentage, size = 80, strokeWidth = 6, color = '#58A6FF', label }) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#30363D"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-sm font-bold">{percentage}%</span>
        {label && <span className="text-[9px] text-muted">{label}</span>}
      </div>
    </div>
  )
}

export function LineChart({ data, width = 300, height = 80, color = '#58A6FF' }) {
  if (!data || data.length < 2) return null
  const max = Math.max(...data.map(d => d.value), 1)
  const min = 0
  const range = max - min || 1
  const padding = 4
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2

  const points = data.map((d, i) => ({
    x: padding + (i / (data.length - 1)) * chartWidth,
    y: padding + chartHeight - ((d.value - min) / range) * chartHeight,
  }))

  const pathD = points.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`
    const prev = points[i - 1]
    const cpx1 = prev.x + (p.x - prev.x) / 3
    const cpx2 = prev.x + (2 * (p.x - prev.x)) / 3
    return `${acc} C ${cpx1} ${prev.y}, ${cpx2} ${p.y}, ${p.x} ${p.y}`
  }, '')

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={`lineGrad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={areaD}
        fill={`url(#lineGrad-${color.replace('#', '')})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
      {points.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="3"
          fill={color}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 * i }}
        />
      ))}
    </svg>
  )
}

export function HeatMap({ data, weeks = 12 }) {
  const cellSize = 12
  const gap = 3
  const days = 7

  return (
    <div className="flex gap-0.5">
      {Array.from({ length: weeks }).map((_, week) => (
        <div key={week} className="flex flex-col gap-0.5">
          {Array.from({ length: days }).map((_, day) => {
            const index = week * 7 + day
            const value = data?.[index] || 0
            const opacity = value === 0 ? 0.1 : Math.min(0.3 + (value / 5) * 0.7, 1)
            return (
              <motion.div
                key={day}
                className="rounded-sm"
                style={{
                  width: cellSize,
                  height: cellSize,
                  backgroundColor: value > 0 ? '#3FB950' : '#30363D',
                  opacity,
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2, delay: (week * 7 + day) * 0.005 }}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}
