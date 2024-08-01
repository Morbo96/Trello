
export function getRandomColor(): string {
  return `hsla(${~~(360 * Math.random())}, 70%,  72%, 0.8)`
}
