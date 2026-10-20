import type { StatusState } from '../types/pokemon'

interface StatusMessageProps {
  status: StatusState
}

/** Shows loading or error text; hidden when message is empty. */
export function StatusMessage({ status }: StatusMessageProps) {
  if (!status.message) {
    return null
  }

  const className = [
    'status',
    status.type === 'loading' ? 'is-loading' : '',
    status.type === 'error' ? 'has-error' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <p className={className} role="status">
      {status.message}
    </p>
  )
}
