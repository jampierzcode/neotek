import { animate, motion, useInView, useMotionValue, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { ALL_SERVICES, BRANCHES, CREDENTIALS } from '../data/site'
import { useMediaQuery } from '../hooks/useMediaQuery'

const STATEMENT =
  'Somos una empresa operadora de residuos sólidos registrada ante el Ministerio del Ambiente, formada por profesionales especializados y un gran equipo de colaboradores capacitados.'

function Word({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.16, 1])
  return <motion.span style={{ opacity }}>{word} </motion.span>
}

function Counter({ to, label }: { to: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  const value = useMotionValue(reduced ? to : 0)
  const [shown, setShown] = useState(reduced ? to : 0)

  useEffect(() => {
    if (!inView || reduced) return
    const controls = animate(value, to, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: (v) => setShown(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, reduced, to, value])

  return (
    <div className="stat" ref={ref}>
      <strong>{shown}</strong>
      <span>{label}</span>
    </div>
  )
}

export function About() {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] })
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  const words = STATEMENT.split(' ')

  return (
    <section className="about" aria-label="Quiénes somos">
      <p className="about__statement" ref={ref}>
        {reduced
          ? STATEMENT
          : words.map((w, i) => (
              <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
            ))}
      </p>
      <div className="about__stats">
        <Counter to={ALL_SERVICES.length} label="servicios en una sola empresa" />
        <Counter to={BRANCHES.length} label="sedes entre el norte y Lima" />
        <Counter to={CREDENTIALS.length} label="resoluciones públicas de respaldo" />
      </div>
    </section>
  )
}
