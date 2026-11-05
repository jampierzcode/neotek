import { motion } from 'motion/react'
import { useState } from 'react'
import { BRANCHES } from '../data/site'
import { ArrowUpRight } from './Icons'
import { EASE } from './ease'
import { LineReveal } from './Reveal'

// Proyección simple: latitud y longitud a un lienzo de 400 × 620.
const LAT = { max: -5, min: -12.6 }
const LON = { min: -80.6, max: -76.2 }
const project = (lat: number, lon: number) => ({
  x: ((lon - LON.min) / (LON.max - LON.min)) * 400,
  y: ((LAT.max - lat) / (LAT.max - LAT.min)) * 620,
})
const POINTS = BRANCHES.map((b) => ({ ...b, ...project(b.lat, b.lon) }))
const ROUTE = `M ${POINTS.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' L ')}`
// Evita que las etiquetas de ciudades cercanas se monten.
const LABEL_LEFT = new Set(['olmos', 'chiclayo'])

const mapsUrl = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address + ', Perú')}`

export function Coverage() {
  const [hover, setHover] = useState<string | null>(null)

  return (
    <section id="sedes" className="coverage">
      <div className="coverage__list">
        <p className="eyebrow eyebrow--dark">Sedes</p>
        <LineReveal className="display" lines={['Cinco puntos', 'de atención.']} />
        <ul>
          {BRANCHES.map((b) => (
            <li key={b.id} data-active={hover === b.id}>
              <a
                href={mapsUrl(b.address)}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setHover(b.id)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(b.id)}
                onBlur={() => setHover(null)}
              >
                <span>
                  <strong>{b.city}</strong>
                  <small>{b.address}</small>
                </span>
                <ArrowUpRight />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <figure className="coverage__map">
        <svg viewBox="-10 -10 420 640" role="img" aria-label="Esquema de ubicación de las cinco sedes de Neotek en el Perú">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0H0V40" fill="none" stroke="currentColor" strokeOpacity=".12" />
            </pattern>
          </defs>
          <rect x="-10" y="-10" width="420" height="640" fill="url(#grid)" />
          <motion.path
            d={ROUTE}
            fill="none"
            stroke="var(--green)"
            strokeWidth="1.5"
            strokeDasharray="1 0"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 2, ease: EASE }}
          />
          {POINTS.map((p, i) => {
            const on = hover === p.id
            const left = LABEL_LEFT.has(p.id)
            return (
              <motion.g
                key={p.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.3 + i * 0.25, duration: 0.4 }}
              >
                <motion.circle
                  cx={p.x}
                  cy={p.y}
                  fill="var(--green)"
                  fillOpacity=".2"
                  animate={{ r: on ? 24 : 12 }}
                  transition={{ duration: 0.3, ease: EASE }}
                />
                <circle cx={p.x} cy={p.y} r="5" fill={on ? 'var(--ink)' : 'var(--green)'} />
                <text
                  x={p.x + (left ? -16 : 16)}
                  y={p.y + 5}
                  textAnchor={left ? 'end' : 'start'}
                  className="coverage__label"
                >
                  {p.city}
                </text>
              </motion.g>
            )
          })}
        </svg>
        <figcaption>Esquema referencial de las sedes. Toca una dirección para abrirla en Google Maps.</figcaption>
      </figure>
    </section>
  )
}
