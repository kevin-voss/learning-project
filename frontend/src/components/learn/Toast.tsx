import styles from './Toast.module.css'

type Props = {
  message: string
  variant?: 'info' | 'success' | 'error'
  visible: boolean
}

export function Toast({ message, variant = 'info', visible }: Props) {
  return (
    <div
      className={`${styles.toast} ${styles[variant]} ${visible ? styles.show : ''}`}
      role="status"
    >
      {message}
    </div>
  )
}
