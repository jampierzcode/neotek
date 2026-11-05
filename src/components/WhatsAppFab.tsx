import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'
import { whatsappUrl } from '../data/site'
import { WhatsApp } from './Icons'

export function WhatsAppFab() {
  const { scrollY } = useScroll()
  const [show, setShow] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setShow(y > 500))

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          className="fab"
          href={whatsappUrl('Hola, quiero más información')}
          target="_blank"
          rel="noreferrer"
          aria-label="Escríbenos por WhatsApp"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
        >
          <WhatsApp width={26} height={26} />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
