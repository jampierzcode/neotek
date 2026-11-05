import { motion } from 'motion/react'
import { useState, type FormEvent } from 'react'
import {
  ALL_SERVICES,
  BRANCHES,
  EMAIL,
  FACEBOOK,
  LEGAL_NAME,
  NAV,
  PHONE_PRIMARY,
  PHONE_PRIMARY_LABEL,
  PHONE_SECONDARY,
  PHONE_SECONDARY_LABEL,
  RUC,
  whatsappUrl,
} from '../data/site'
import { Facebook, WhatsApp } from './Icons'
import { EASE } from './ease'
import { LineReveal } from './Reveal'

function buildMessage(services: string[], city: string, detail: string) {
  const parts = ['Hola, quiero una cotización.']
  if (services.length) parts.push(`Servicios: ${services.join(', ')}.`)
  if (city) parts.push(`Ubicación: ${city}.`)
  if (detail.trim()) parts.push(`Detalle: ${detail.trim()}`)
  return parts.join('\n')
}

const YEAR = new Date().getFullYear()

export function Contact() {
  const [services, setServices] = useState<string[]>([])
  const [city, setCity] = useState('')
  const [detail, setDetail] = useState('')

  const toggle = (name: string) =>
    setServices((s) => (s.includes(name) ? s.filter((x) => x !== name) : [...s, name]))

  const submit = (e: FormEvent) => {
    e.preventDefault()
    window.open(whatsappUrl(buildMessage(services, city, detail)), '_blank', 'noreferrer')
  }

  return (
    <footer id="contacto" className="contact">
      <div className="contact__grid">
        <div className="contact__intro">
          <p className="eyebrow">Contacto</p>
          <LineReveal className="display" lines={['Cuéntanos qué', 'necesitas resolver.']} />
          <dl className="contact__data">
            <div>
              <dt>WhatsApp y teléfono</dt>
              <dd>
                <a href={`tel:+${PHONE_PRIMARY}`}>{PHONE_PRIMARY_LABEL}</a>
                <a href={`tel:+${PHONE_SECONDARY}`}>{PHONE_SECONDARY_LABEL}</a>
              </dd>
            </div>
            <div>
              <dt>Correo</dt>
              <dd>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </dd>
            </div>
            <div>
              <dt>Redes</dt>
              <dd>
                <a href={FACEBOOK} target="_blank" rel="noreferrer" className="contact__social">
                  <Facebook width={16} height={16} /> Neotek Soluciones Integrales
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <form className="quote" onSubmit={submit}>
          <fieldset>
            <legend>¿Qué servicio necesitas?</legend>
            <div className="quote__chips">
              {ALL_SERVICES.map((name) => {
                const on = services.includes(name)
                return (
                  <motion.button
                    type="button"
                    key={name}
                    className="chip"
                    aria-pressed={on}
                    onClick={() => toggle(name)}
                    whileTap={{ scale: 0.96 }}
                    transition={{ duration: 0.15, ease: EASE }}
                  >
                    {name}
                  </motion.button>
                )
              })}
            </div>
          </fieldset>
          <label>
            <span>¿Dónde?</span>
            <select value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="">Elige la ciudad más cercana</option>
              {BRANCHES.map((b) => (
                <option key={b.id} value={b.city}>
                  {b.city}
                </option>
              ))}
              <option value="Otra zona">Otra zona</option>
            </select>
          </label>
          <label>
            <span>Detalles (opcional)</span>
            <textarea
              rows={3}
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder="Ej.: limpieza de un pozo séptico en un local comercial"
            />
          </label>
          <button type="submit" className="btn btn--lime btn--wide">
            <WhatsApp /> Enviar por WhatsApp
          </button>
          <p className="quote__note">Se abre WhatsApp con tu mensaje listo. Tú decides cuándo enviarlo.</p>
        </form>
      </div>

      <div className="contact__wordmark" aria-hidden>
        <svg viewBox="0 0 1000 150">
          <text x="0" y="146" textLength="1000" lengthAdjust="spacingAndGlyphs">
            NEOTEK
          </text>
        </svg>
      </div>

      <div className="contact__base">
        <p suppressHydrationWarning>
          © {YEAR} {LEGAL_NAME} · RUC {RUC}
        </p>
        <nav aria-label="Pie de página">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`}>
              {n.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
