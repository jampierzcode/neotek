import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { CREDENTIALS, LEGAL_NAME, RUC } from '../data/site'
import { ArrowUpRight, FileText, ShieldCheck } from './Icons'
import { EASE } from './ease'
import { FadeUp, LineReveal } from './Reveal'

export function Credentials() {
  const [selected, setSelected] = useState(0)
  const doc = CREDENTIALS[selected]

  return (
    <section id="respaldo" className="creds">
      <div className="creds__head">
        <p className="eyebrow">Respaldo legal</p>
        <LineReveal className="display" lines={['No nos creas a nosotros.', 'Lee las resoluciones.']} />
        <FadeUp className="creds__legal">
          <p>
            Razón social: <strong>{LEGAL_NAME}</strong>
            <br />
            RUC: <strong>{RUC}</strong>
          </p>
        </FadeUp>
      </div>

      <div className="creds__body">
        <div className="creds__stack">
          {CREDENTIALS.map((c, i) => {
            const isOn = i === selected
            return (
              <motion.button
                key={c.id}
                className="creds__sheet"
                onClick={() => setSelected(i)}
                aria-label={`Ver ${c.number}`}
                aria-pressed={isOn}
                animate={{
                  x: isOn ? '0%' : i === 0 ? '-24%' : '24%',
                  rotate: isOn ? 0 : i === 0 ? -7 : 7,
                  scale: isOn ? 1 : 0.9,
                  zIndex: isOn ? 2 : 1,
                }}
                whileHover={isOn ? undefined : { scale: 0.93 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <img src={c.image} alt="" width={1040} height={1430} loading="lazy" />
              </motion.button>
            )
          })}
        </div>

        <div className="creds__detail" aria-live="polite">
          <div className="creds__tabs" role="group" aria-label="Elegir resolución">
            {CREDENTIALS.map((c, i) => (
              <button key={c.id} data-active={i === selected} onClick={() => setSelected(i)}>
                {c.id === 'minam' ? 'MINAM' : 'Salud Jaén'}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <p className="creds__authority">{doc.authority}</p>
              <h3>{doc.title}</h3>
              <p className="creds__number">{doc.number}</p>
              <p className="creds__date">
                {doc.place}, {doc.date}
              </p>
              <p>{doc.summary}</p>
              <ul className="creds__scope">
                {doc.scope.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <div className="creds__actions">
                <a className="btn btn--lime" href={doc.pdf} target="_blank" rel="noreferrer">
                  <FileText /> Leer la resolución (PDF)
                </a>
                {doc.verify && (
                  <a className="btn btn--ghost" href={doc.verify.url} target="_blank" rel="noreferrer">
                    <ShieldCheck /> Verificar con clave {doc.verify.key} <ArrowUpRight />
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
