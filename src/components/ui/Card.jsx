import { motion } from 'framer-motion'
import { cardHover } from '../../animations/variants'

export default function Card({
  children,
  className = '',
  hover = true,
  glow = false,
  padding = 'p-6',
  ...props
}) {
  const classes = [
    'bg-card border border-border rounded-xl',
    padding,
    hover && 'transition-colors duration-300 hover:border-muted',
    glow && 'glow-primary',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (hover) {
    return (
      <motion.div
        className={classes}
        initial="rest"
        whileHover="hover"
        variants={cardHover}
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
