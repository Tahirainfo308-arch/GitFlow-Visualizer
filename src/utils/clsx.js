export function clsx(...args) {
  return args
    .flat()
    .filter((x) => typeof x === 'string' && x.length > 0)
    .join(' ')
}
