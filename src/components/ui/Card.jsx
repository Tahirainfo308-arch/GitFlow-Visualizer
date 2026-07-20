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
    'bg-card border border-border rounded-2xl',
    padding,
    hover && 'transition-all duration-300 hover:border-muted/60 hover:shadow-lg hover:shadow-black/[0.04]',
    glow && 'glow-primary',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (hover) {
    return (
      <motion.div
        className={classes}
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
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
