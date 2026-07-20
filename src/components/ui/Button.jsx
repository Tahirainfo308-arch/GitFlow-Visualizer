import { motion } from 'framer-motion'

const variants = {
  primary:
    'bg-[image:var(--btn-gradient)] text-white shadow-md hover:shadow-lg hover:shadow-primary/20',
  secondary:
    'bg-card border border-border text-text hover:bg-card-hover hover:border-muted shadow-sm',
  ghost:
    'bg-transparent text-muted hover:text-text hover:bg-card',
  danger:
    'bg-red/10 text-red border border-red/20 hover:bg-red/20 shadow-sm',
  success:
    'bg-green/10 text-green border border-green/20 hover:bg-green/20 shadow-sm',
  outline:
    'bg-transparent border border-border text-text hover:bg-card hover:border-primary hover:text-primary',
}

const sizes = {
  sm: 'px-3.5 py-1.5 text-xs rounded-lg gap-1.5',
  md: 'px-5 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-7 py-3.5 text-base rounded-xl gap-2.5',
  xl: 'px-9 py-4 text-lg rounded-xl gap-2.5',
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
    'inline-flex items-center justify-center font-medium cursor-pointer select-none whitespace-nowrap',
    'transition-all duration-200 ease-out',
    'focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 focus:ring-offset-bg',
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
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
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
        whileHover={disabled ? {} : { scale: 1.02 }}
        whileTap={disabled ? {} : { scale: 0.97 }}
        transition={{ duration: 0.15 }}
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
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      transition={{ duration: 0.15 }}
      {...props}
    >
      {content}
    </motion.button>
  )
}
