import { PanelLeftClose } from 'lucide-react'

import styles from './TopicSidebarChrome.module.css'

type Props = {
  onCollapseRail: () => void
}

/** Branding + collapse control for the desktop topic rail only */
export function TopicSidebarChrome({ onCollapseRail }: Props) {
  return (
    <div className={styles.brandRow}>
      <div className={styles.brand}>
        <span className={styles.logo} aria-hidden>
          ▸
        </span>
        <div className={styles.brandText}>
          <p className={styles.title}>CodeStep</p>
          <p className={styles.subtitle}>Guided JS foundations</p>
        </div>
      </div>
      <button
        type="button"
        className={styles.collapseRail}
        aria-label="Collapse topic sidebar"
        onClick={onCollapseRail}
      >
        <PanelLeftClose size={18} strokeWidth={2.25} aria-hidden />
      </button>
    </div>
  )
}
