import { useSyncExternalStore } from 'react'

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (notify) => {
      const list = window.matchMedia(query)
      list.addEventListener('change', notify)
      return () => list.removeEventListener('change', notify)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

/** Efectos ligados al scroll: solo en pantallas amplias y sin movimiento reducido. */
export function useScrollEffects() {
  const wide = useMediaQuery('(min-width: 900px) and (min-height: 600px)')
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  return wide && !reduced
}
