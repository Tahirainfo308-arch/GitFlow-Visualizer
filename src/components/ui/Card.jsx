import { motion } from 'framer-motion'

export default function Card({
  children,
  className = '',
  hover = true,
  glow = false,
  padding = 'p-6',
  ...props
}) {
  const classes = [
    'bg-card border border-border rounded-3xl',
    padding,
    hover && 'transition-all duration-300 hover:border-muted/60 hover:shadow-xl',
    glow && 'glow-primary',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (hover) {
    return (
      <motion.div
        className={classes}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}
