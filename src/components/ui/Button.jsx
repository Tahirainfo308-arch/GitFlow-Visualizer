import { motion } from 'framer-motion'

const variantStyles = {
  primary: {
    backgroundColor: '#0284c7',
    color: '#ffffff',
    border: 'none',
  },
  secondary: {
    backgroundColor: '#ffffff',
    color: '#0f172a',
    border: '1px solid #cbd5e1',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: 'var(--c-muted)',
    border: 'none',
  },
  danger: {
    backgroundColor: 'transparent',
    color: 'var(--c-red)',
    border: '1px solid var(--c-red, #cf222e)',
  },
  success: {
    backgroundColor: 'transparent',
    color: 'var(--c-green)',
    border: '1px solid var(--c-green, #1a7f37)',
  },
  outline: {
    backgroundColor: 'transparent',
    color: 'var(--c-text)',
    border: '1px solid var(--c-border)',
  },
}

const sizes = {
  sm: 'px-3.5 py-2 text-[13px] rounded-lg gap-1.5',
  md: 'px-5 py-2.5 text-[14px] rounded-lg gap-2',
  lg: 'px-6 py-3 text-[15px] rounded-lg gap-2',
  xl: 'px-8 py-3.5 text-[16px] rounded-lg gap-2.5',
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
    'inline-flex items-center justify-center font-semibold cursor-pointer select-none whitespace-nowrap',
    'transition-all duration-200 ease-out',
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    loading && 'pointer-events-none',
    sizes[size],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const style = {
    ...variantStyles[variant],
    borderRadius: '0.5rem',
    overflow: 'hidden',
    textDecoration: 'none',
  }

  const content = (
    <>
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {!loading && Icon && <Icon className="w-4 h-4 shrink-0" />}
      {children}
      {typeof IconRight === 'function' && <IconRight className="w-4 h-4 shrink-0" />}
    </>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        style={style}
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
      style={style}
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
