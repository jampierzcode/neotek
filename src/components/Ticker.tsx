const ITEMS = [
  'Registro EO-RS-00055-2021-MINAM',
  'R.D. N° 220-2021 · Salud Jaén',
  '13 servicios',
  '5 sedes',
  'Jaén · Cajamarca · Chiclayo · Olmos · Lima',
]

export function Ticker() {
  const row = (hidden: boolean) => (
    <ul className="ticker__row" aria-hidden={hidden || undefined}>
      {ITEMS.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  )
  return (
    <div className="ticker">
      <div className="ticker__track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
