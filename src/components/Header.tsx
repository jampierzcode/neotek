import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'
import { NAV, whatsappUrl } from '../data/site'
import { Close, WhatsApp } from './Icons'
import { EASE } from './ease'

export function Header() {
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > prev && y > 240)
  })

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter((s): s is HTMLElement => !!s)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id)
          else if (e.target.id === active) setActive(null)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [active])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <motion.div className="progress" style={{ scaleX: progress }} aria-hidden />
      <motion.header
        className="header"
        animate={{ y: hidden && !open ? '-140%' : 0 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <a href="#inicio" className="header__logo" aria-label="Neotek, ir al inicio">
          <img src="/logo.png" alt="Neotek Soluciones Integrales" width={300} height={103} />
        </a>
        <nav className="header__nav" aria-label="Principal">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} aria-current={active === n.id ? 'true' : undefined}>
              {active === n.id && (
                <motion.span layoutId="nav-pill" className="header__pill" transition={{ duration: 0.35, ease: EASE }} />
              )}
              <span className="header__label">{n.label}</span>
            </a>
          ))}
        </nav>
        <a
          className="header__cta"
          href={whatsappUrl('Hola, quiero más información')}
          target="_blank"
          rel="noreferrer"
        >
          <WhatsApp width={18} height={18} /> Cotizar
        </a>
        <button
          className="header__burger"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-movil"
        >
          {open ? <Close /> : 'Menú'}
        </button>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu-movil"
            className="mobile-menu"
            aria-label="Menú móvil"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {NAV.map((n, i) => (
              <motion.a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.12 + i * 0.05 }}
              >
                {n.label}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
