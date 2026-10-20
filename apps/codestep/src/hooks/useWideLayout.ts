import { useEffect, useState } from 'react'

const WIDE_LAYOUT_MEDIA_QUERY = '(min-width: 56.25rem)'

export function useWideLayout() {
  const [wide, setWide] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(WIDE_LAYOUT_MEDIA_QUERY).matches : true,
  )

  useEffect(() => {
    const mq = window.matchMedia(WIDE_LAYOUT_MEDIA_QUERY)
    const update = () => setWide(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return wide
}
