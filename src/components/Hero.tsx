import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { BRANCHES, whatsappUrl } from '../data/site'
import { useScrollEffects } from '../hooks/useMediaQuery'
import { ArrowRight, WhatsApp } from './Icons'
import { Photo } from './Photo'
import { EASE } from './ease'
import { LineReveal } from './Reveal'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const animated = useScrollEffects()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // El marco cambia de tamaño de verdad: así la foto siempre encuadra a las personas, sea cual sea la pantalla.
  const top = useTransform(p, [0, 0.72], ['28%', '0%'])
  const right = useTransform(p, [0, 0.72], ['4%', '0%'])
  const bottom = useTransform(p, [0, 0.72], ['7%', '0%'])
  const left = useTransform(p, [0, 0.72], ['55%', '0%'])
  const borderRadius = useTransform(p, [0, 0.72], [20, 0])
  const scale = useTransform(p, [0, 0.72], [1.06, 1])
  const copyOpacity = useTransform(p, [0, 0.32], [1, 0])
  const copyY = useTransform(p, [0, 0.32], [0, -70])
  const copyEvents = useTransform(p, (v) => (v < 0.28 ? 'auto' : 'none'))
  const outroOpacity = useTransform(p, [0.62, 0.82], [0, 1])
  const outroY = useTransform(p, [0.62, 0.82], [40, 0])

  return (
    <section id="inicio" ref={ref} className={`hero ${animated ? 'hero--animated' : ''}`}>
      <div className="hero__stage">
        <motion.div className="hero__media" style={animated ? { top, right, bottom, left, borderRadius } : undefined}>
          <motion.div className="hero__scale" style={animated ? { scale } : undefined}>
            <Photo
              id="portada"
              alt="Equipo de Neotek con cascos durante un monitoreo ambiental en campo"
              loading="eager"
              fetchPriority="high"
            />
          </motion.div>
          {animated && <motion.div className="hero__shade" style={{ opacity: outroOpacity }} />}
        </motion.div>

        <motion.div className="hero__copy" style={animated ? { opacity: copyOpacity, y: copyY, pointerEvents: copyEvents } : undefined}>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Empresa operadora de residuos sólidos · Registro MINAM
          </motion.p>
          <LineReveal
            as="h1"
            className="hero__title"
            delay={0.1}
            lines={['Salud y', 'ambiente,', <em key="e">resueltos</em>, 'en campo.']}
          />
          <motion.div
            className="hero__foot"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
          >
            <p>
              Saneamiento, residuos sólidos, agua, monitoreos y asesoría, con profesionales especializados y
              colaboradores capacitados.
            </p>
            <div className="hero__actions">
              <a
                className="btn btn--lime"
                href={whatsappUrl('Hola, quiero más información')}
                target="_blank"
                rel="noreferrer"
              >
                <WhatsApp /> Escríbenos por WhatsApp
              </a>
              <a className="btn btn--ghost" href="#servicios">
                Ver servicios <ArrowRight />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {animated && (
          <motion.div className="hero__outro" style={{ opacity: outroOpacity, y: outroY }} aria-hidden>
            <p className="hero__outro-title">Trabajamos donde está el problema.</p>
            <ul>
              {BRANCHES.map((b) => (
                <li key={b.id}>{b.city}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </section>
  )
}
