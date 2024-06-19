import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

// Extend dayjs with the duration plugin
dayjs.extend(duration)

export const calculateDuration = (hireDate: Date) => {
  const now = dayjs()
  const hireDay = dayjs(hireDate)
  const diff = dayjs.duration(now.diff(hireDay))

  const years = diff.years()
  const months = diff.months()
  const days = diff.days()

  return ` (${years}y - ${months}m - ${days}d)`
}
