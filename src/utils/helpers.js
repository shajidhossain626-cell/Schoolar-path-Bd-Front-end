import { formatDistanceToNow, isPast, parseISO, differenceInDays } from 'date-fns'

export function formatDeadline(dateStr) {
  const date = parseISO(dateStr)
  const daysLeft = differenceInDays(date, new Date())
  if (isPast(date)) return { label: 'Closed', urgent: false, past: true }
  if (daysLeft <= 14) return { label: `${daysLeft}d left`, urgent: true, past: false }
  return { label: formatDistanceToNow(date, { addSuffix: true }), urgent: daysLeft <= 30, past: false }
}

export function getFundingLabel(funding) {
  return { full: 'Fully Funded', partial: 'Partial', tuition: 'Tuition Only' }[funding] || funding
}

export function getDegreeLabel(degree) {
  return { bachelors: "Bachelor's", masters: "Master's", phd: 'PhD' }[degree] || degree
}

export function getInitials(name) {
  return name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '??'
}

export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function formatCurrency(amount, currency = '৳') {
  return `${currency}${Number(amount).toLocaleString()}`
}

export function truncate(str, n = 120) {
  return str.length > n ? str.slice(0, n) + '…' : str
}
