import { Hero } from './components/Hero'
import { About } from './components/About'
import { Projects } from './components/Projects'
import { CustomCursor } from './components/CustomCursor'
import { Skills } from './components/Skills'
import { Navigation } from './components/Navigation'
import { Timeline } from './components/Timeline'
import { ScrollProgress } from './components/ScrollProgress'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { HoldConfetti } from './components/HoldConfetti'

function App() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <HoldConfetti />
      <Navigation />
      <main className='overflow-x-hidden bg-black text-white'>
        <Hero />
        <Projects />
        <Skills />
        <Timeline />
        <About />
        <Contact />
        <Footer />
      </main>
    </>
  )
}

export default App
