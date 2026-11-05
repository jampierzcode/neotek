import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { GALLERY, type GalleryPhoto } from '../data/site'
import { useMediaQuery, useScrollEffects } from '../hooks/useMediaQuery'
import { ArrowLeft, ArrowRight, Close } from './Icons'
import { Photo } from './Photo'
import { EASE } from './ease'
import { LineReveal } from './Reveal'

const SPEEDS = [-60, -190, -20, -140]

function Column({
  photos,
  progress,
  distance,
  onOpen,
}: {
  photos: { photo: GalleryPhoto; index: number }[]
  progress: MotionValue<number>
  distance: number
  onOpen: (i: number) => void
}) {
  const y = useTransform(progress, [0, 1], [0, distance])
  return (
    <motion.div className="gallery__col" style={{ y }}>
      {photos.map(({ photo, index }) => (
        <button
          key={photo.id}
          className="gallery__item"
          onClick={() => onOpen(index)}
          aria-label={`Ampliar foto: ${photo.alt}`}
        >
          <motion.span layoutId={`photo-${photo.id}`} className="gallery__frame">
            <Photo id={photo.id} alt="" sizes="(min-width: 900px) 25vw, 50vw" />
          </motion.span>
        </button>
      ))}
    </motion.div>
  )
}

function Lightbox({
  index,
  onClose,
  onMove,
}: {
  index: number
  onClose: () => void
  onMove: (delta: number) => void
}) {
  const photo = GALLERY[index]
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onMove(1)
      if (e.key === 'ArrowLeft') onMove(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      previous?.focus({ preventScroll: true })
    }
  }, [onClose, onMove])

  return (
    <motion.div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Foto ampliada"
      initial={{ backgroundColor: 'rgba(8,16,12,0)' }}
      animate={{ backgroundColor: 'rgba(8,16,12,0.94)' }}
      exit={{ backgroundColor: 'rgba(8,16,12,0)' }}
      onClick={onClose}
    >
      <motion.figure
        className="lightbox__figure"
        layoutId={`photo-${photo.id}`}
        transition={{ duration: 0.5, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        <Photo id={photo.id} alt={photo.alt} sizes="90vw" loading="eager" />
      </motion.figure>
      <motion.div
        className="lightbox__bar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <p>
          <span>
            {index + 1} / {GALLERY.length}
          </span>{' '}
          {photo.alt}
        </p>
        <div>
          <button onClick={() => onMove(-1)} aria-label="Foto anterior">
            <ArrowLeft />
          </button>
          <button onClick={() => onMove(1)} aria-label="Foto siguiente">
            <ArrowRight />
          </button>
          <button ref={closeRef} onClick={onClose} aria-label="Cerrar">
            <Close />
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Gallery() {
  const ref = useRef<HTMLDivElement>(null)
  const effects = useScrollEffects()
  const wide = useMediaQuery('(min-width: 900px)')
  const cols = wide ? 4 : 2
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const close = useCallback(() => setOpenIndex(null), [])
  const move = useCallback(
    (delta: number) =>
      setOpenIndex((i) => (i === null ? i : (i + delta + GALLERY.length) % GALLERY.length)),
    [],
  )

  const columns = Array.from({ length: cols }, (_, c) =>
    GALLERY.map((photo, index) => ({ photo, index })).filter(({ index }) => index % cols === c),
  )

  return (
    <section id="campo" className="gallery">
      <div className="gallery__head">
        <p className="eyebrow">En campo</p>
        <LineReveal className="display" lines={['Sin fotos de catálogo.', 'Este es el trabajo real.']} />
      </div>
      <div className="gallery__grid" ref={ref} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {columns.map((photos, c) => (
          <Column
            key={c}
            photos={photos}
            progress={scrollYProgress}
            distance={effects ? SPEEDS[c] : 0}
            onOpen={setOpenIndex}
          />
        ))}
      </div>
      <AnimatePresence>
        {openIndex !== null && <Lightbox index={openIndex} onClose={close} onMove={move} />}
      </AnimatePresence>
    </section>
  )
}
