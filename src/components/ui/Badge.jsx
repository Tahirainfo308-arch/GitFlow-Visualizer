const colorMap = {
  blue: 'bg-primary/10 text-primary border-primary/20',
  green: 'bg-green/10 text-green border-green/20',
  red: 'bg-red/10 text-red border-red/20',
  orange: 'bg-orange/10 text-orange border-orange/20',
  muted: 'bg-muted/10 text-muted border-muted/20',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
}

export default function Badge({
  children,
  color = 'blue',
  size = 'sm',
  dot = false,
  className = '',
}) {
  const sizes = {
    xs: 'px-1.5 py-0.5 text-[10px]',
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium border rounded-full ${colorMap[color]} ${sizes[size]} ${className}`}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${color === 'green' ? 'bg-green' : color === 'red' ? 'bg-red' : 'bg-primary'}`} />
      )}
      {children}
    </span>
  )
}
