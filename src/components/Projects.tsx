import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

type Project = {
  title: string
  description: string
  stack: string[]
  demo: string
  repo: string
  gradient: string
}

const projects: Project[] = [
  {
    title: 'Portfolio Motion',
    description: 'Sitio personal con narrativa visual, transiciones suaves y foco en performance.',
    stack: ['React', 'TypeScript', 'Tailwind'],
    demo: '#',
    repo: '#',
    gradient: 'from-cyan-400 to-blue-500',
  },
  {
    title: 'Dashboard Analytics',
    description: 'Panel con componentes reutilizables, estados complejos y visualización de métricas.',
    stack: ['React', 'TypeScript', 'Charting', 'Tailwind'],
    demo: '#',
    repo: '#',
    gradient: 'from-fuchsia-400 to-purple-500',
  },
  {
    title: 'E-commerce UI',
    description: 'Frontend modular orientado a UX, microinteracciones y flujo de compra optimizado.',
    stack: ['React', 'TypeScript', 'REST API'],
    demo: '#',
    repo: '#',
    gradient: 'from-emerald-400 to-teal-500',
  },
  {
    title: 'Landing Product',
    description: 'Landing de alto impacto con secciones animadas y layout fully responsive.',
    stack: ['React', 'Tailwind', 'Vite'],
    demo: '#',
    repo: '#',
    gradient: 'from-orange-400 to-rose-500',
  },
]

export const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLElement | null)[]>([])

  useGSAP(
    () => {
      const cards = cardsRef.current.filter(Boolean) as HTMLElement[]
      const cleanupFns: Array<() => void> = []

      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      cards.forEach((card) => {
        const glow = card.querySelector<HTMLElement>('.project-glow')
        const content = card.querySelector<HTMLElement>('.project-content')
        if (!glow || !content) return

        const onMove = (event: MouseEvent) => {
          const rect = card.getBoundingClientRect()
          const x = event.clientX - rect.left
          const y = event.clientY - rect.top
          const nx = (x / rect.width) * 2 - 1
          const ny = (y / rect.height) * 2 - 1

          gsap.to(card, {
            rotateY: clamp(nx * 8, -8, 8),
            rotateX: clamp(-ny * 8, -8, 8),
            transformPerspective: 900,
            duration: 0.25,
            ease: 'power2.out',
          })

          gsap.to(glow, {
            x: x - rect.width / 2,
            y: y - rect.height / 2,
            duration: 0.2,
            ease: 'power2.out',
          })

          gsap.to(content, {
            x: clamp(nx * 14, -14, 14),
            duration: 0.3,
            ease: 'power2.out',
          })
        }

        const onLeave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.45,
            ease: 'power3.out',
          })
          gsap.to(glow, {
            x: 0,
            y: 0,
            duration: 0.35,
            ease: 'power2.out',
          })
          gsap.to(content, {
            x: 0,
            duration: 0.4,
            ease: 'power3.out',
          })
        }

        card.addEventListener('mousemove', onMove)
        card.addEventListener('mouseleave', onLeave)

        cleanupFns.push(() => {
          card.removeEventListener('mousemove', onMove)
          card.removeEventListener('mouseleave', onLeave)
        })
      })

      return () => {
        cleanupFns.forEach((cleanup) => cleanup())
      }
    },
    { scope: sectionRef }
  )

  return (
    <section id='proyectos' ref={sectionRef} className='py-24 bg-linear-to-b from-slate-950 to-black'>
      <div className='max-w-6xl mx-auto px-4'>
        <p className='text-cyan-300 tracking-widest uppercase text-sm text-center mb-3'>Works</p>
        <h2 className='text-4xl md:text-5xl font-bold text-center mb-14'>Proyectos Destacados</h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {projects.map((project, idx) => (
            <article
              key={project.title}
              ref={(el) => {
                cardsRef.current[idx] = el
              }}
              className='project-card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition-transform duration-300 hover:-translate-y-1'
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className='project-glow pointer-events-none absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/20 blur-3xl' />

              <div className='project-content will-change-transform'>
                <div className={`h-1.5 w-24 rounded-full bg-linear-to-r ${project.gradient} mb-5`} />
                <h3 className='text-2xl font-bold mb-3'>{project.title}</h3>
                <p className='text-gray-300 mb-5 leading-relaxed'>{project.description}</p>

                <div className='flex flex-wrap gap-2 mb-6'>
                  {project.stack.map((tech) => (
                    <span key={tech} className='px-3 py-1 rounded-full text-xs border border-white/20 text-gray-200 bg-white/5'>
                      {tech}
                    </span>
                  ))}
                </div>

                <div className='flex gap-3'>
                  <a
                    href={project.demo}
                    target='_blank'
                    rel='noreferrer'
                    className='px-4 py-2 rounded-lg bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition-colors'
                  >
                    Demo
                  </a>
                  <a
                    href={project.repo}
                    target='_blank'
                    rel='noreferrer'
                    className='px-4 py-2 rounded-lg border border-white/25 text-white hover:bg-white/10 transition-colors'
                  >
                    Código
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
