import { clsx } from './clsx'

export function cn(...inputs) {
  return clsx(inputs)
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}

export function truncate(str, length = 100) {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}
