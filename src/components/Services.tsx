import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { useRef, useState } from 'react'
import { SERVICE_GROUPS, whatsappUrl, type ServiceGroup } from '../data/site'
import { useScrollEffects } from '../hooks/useMediaQuery'
import { ArrowUpRight } from './Icons'
import { Photo } from './Photo'
import { FadeUp, LineReveal } from './Reveal'

function Panel({ group, index, onFocus }: { group: ServiceGroup; index: number; onFocus?: () => void }) {
  return (
    <article className={`panel panel--${group.theme}`} aria-labelledby={`srv-${group.id}`} onFocus={onFocus}>
      <div className="panel__intro">
        <span className="panel__index">
          {String(index + 1).padStart(2, '0')} / {String(SERVICE_GROUPS.length).padStart(2, '0')}
        </span>
        <h3 id={`srv-${group.id}`}>{group.title}</h3>
        <p>{group.lead}</p>
      </div>
      <div className="panel__photo">
        <Photo id={group.photo} alt={group.alt} sizes="(min-width: 900px) 50vw, 100vw" style={{ objectPosition: group.focus }} />
      </div>
      <ul className="panel__list">
        {group.services.map((s) => (
          <li key={s.name}>
            <a
              href={whatsappUrl(`Hola, quiero solicitar el servicio de ${s.name}`)}
              target="_blank"
              rel="noreferrer"
              aria-label={`Solicitar ${s.name} por WhatsApp`}
            >
              <span>
                <strong>{s.name}</strong>
                <small>{s.description}</small>
              </span>
              <span className="panel__go">
                <ArrowUpRight />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </article>
  )
}

function HorizontalPanels() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const n = SERVICE_GROUPS.length
  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${((n - 1) / n) * 100}%`])
  const [current, setCurrent] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setCurrent(Math.min(n - 1, Math.round(v * (n - 1))))
  })

  // Al navegar con teclado, lleva a la vista el panel que recibe el foco.
  const showPanel = (i: number) => {
    const top = ref.current!.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + i * window.innerHeight, behavior: 'instant' })
  }

  return (
    <div className="hscroll" ref={ref} style={{ height: `${n * 100}vh` }}>
      <div className="hscroll__stage">
        <motion.div className="hscroll__track" style={{ x, width: `${n * 100}vw` }}>
          {SERVICE_GROUPS.map((g, i) => (
            <Panel key={g.id} group={g} index={i} onFocus={() => showPanel(i)} />
          ))}
        </motion.div>
        <ol className="hscroll__dots" aria-hidden>
          {SERVICE_GROUPS.map((g, i) => (
            <li key={g.id} data-active={i === current} />
          ))}
        </ol>
      </div>
    </div>
  )
}

export function Services() {
  const effects = useScrollEffects()
  return (
    <section id="servicios" className="services">
      <div className="services__head">
        <p className="eyebrow eyebrow--dark">Servicios</p>
        <LineReveal className="display" lines={['Un solo proveedor,', 'cinco frentes de trabajo.']} />
        <FadeUp className="services__note">
          <p>Toca cualquier servicio y te abrimos el WhatsApp con la consulta lista para enviar.</p>
        </FadeUp>
      </div>
      {effects ? (
        <HorizontalPanels />
      ) : (
        <div className="panels-stack">
          {SERVICE_GROUPS.map((g, i) => (
            <Panel key={g.id} group={g} index={i} />
          ))}
        </div>
      )}
    </section>
  )
}
