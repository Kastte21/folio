import { Hero } from './components/Hero'
import { About } from './components/About'
import { Projects } from './components/Projects'
import { CustomCursor } from './components/CustomCursor'
import { Skills} from './components/Skills'

function App() {
  return (
    <>
      <CustomCursor />
      <main className='overflow-x-hidden'>
        <Hero />
        <About />
        <Skills />
        <Projects />
      </main>
    </>
  )
}

export default App