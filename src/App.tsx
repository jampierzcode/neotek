import { MotionConfig } from 'motion/react'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Coverage } from './components/Coverage'
import { Credentials } from './components/Credentials'
import { Gallery } from './components/Gallery'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { Ticker } from './components/Ticker'
import { WhatsAppFab } from './components/WhatsAppFab'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#servicios">
        Saltar al contenido
      </a>
      <Header />
      <main>
        <Hero />
        <Ticker />
        <About />
        <Services />
        <Gallery />
        <Credentials />
        <Coverage />
      </main>
      <Contact />
      <WhatsAppFab />
    </MotionConfig>
  )
}
