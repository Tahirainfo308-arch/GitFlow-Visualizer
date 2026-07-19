import { motion } from 'framer-motion'
import { buttonTap } from '../../animations/variants'

const variants = {
  primary:
    'bg-primary text-bg hover:bg-primary-dark shadow-[0_0_20px_rgba(88,166,255,0.2)]',
  secondary:
    'bg-card border border-border text-text hover:bg-card-hover hover:border-muted',
  ghost: 'bg-transparent text-muted hover:text-text hover:bg-card',
  danger: 'bg-red/10 text-red border border-red/20 hover:bg-red/20',
  success: 'bg-green/10 text-green border border-green/20 hover:bg-green/20',
  outline:
    'bg-transparent border border-border text-text hover:bg-card hover:border-primary',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-md gap-1.5',
  md: 'px-4 py-2 text-sm rounded-lg gap-2',
  lg: 'px-6 py-3 text-base rounded-lg gap-2',
  xl: 'px-8 py-4 text-lg rounded-xl gap-2.5',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconRight: IconRight,
  disabled,
  loading,
  onClick,
  href,
  type = 'button',
  ...props
}) {
  const classes = [
    'inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer select-none whitespace-nowrap',
    'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-bg',
    disabled && 'opacity-50 cursor-not-allowed',
    loading && 'pointer-events-none',
    variants[variant],
    sizes[size],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {!loading && Icon && <Icon className="w-4 h-4" />}
      {children}
      {typeof IconRight === 'function' && <IconRight className="w-4 h-4" />}
    </>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileTap={disabled ? {} : 'tap'}
        variants={buttonTap}
        {...props}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      whileTap={disabled ? {} : 'tap'}
      variants={buttonTap}
      {...props}
    >
      {content}
    </motion.button>
  )
}
