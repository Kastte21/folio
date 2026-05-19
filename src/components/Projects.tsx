import { useGSAP } from "@gsap/react"
import gsap from "gsap"
//import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef } from "react"

const projectsData = [
    {
        id: 1,
        title: "Proyecto Alpha",
        description: "Aplicacion web interactiva con animaciones avanzadas",
        image: "https://placehold.co/600x400",
        tags: ["React", "GSAP", "Tailwind"],
    },
    {
        id: 2,
        title: 'Dashboard Creativo',
        description: 'Panel de control con transiciones fluidas',
        image: 'https://placehold.co/600x400',
        tags: ['TypeScript', 'Framer Motion', 'GSAP'],
    },
    {
        id: 3,
        title: 'Landing Animada',
        description: 'Página promocional con efectos parallax',
        image: 'https://placehold.co/600x400',
        tags: ['GSAP', 'ScrollTrigger', 'Three.js'],
    },
]

export const Projects = () => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const cardsRef = useRef<(HTMLDivElement | null)[]>([])

    useGSAP(() => {
        const cards = cardsRef.current.filter(card => card !== null)
        const isMobile = window.innerWidth < 768

        gsap.fromTo(
            cards,
            {
                y: isMobile ? 30:60,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: isMobile ? 0.5 : 0.8,
                stagger: isMobile ? 0.1 : 0.2, // Efecto escalonado cada tarjeta aparece con 0.2s de diferencia
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            }
        )

        // Limpiadores
        const cleanups: (() => void)[] = []

        // Configuracion de hovers para cada tarjeta
        cards.forEach(card => {
            const image = card.querySelector('.project-image') as HTMLImageElement
            const title = card.querySelector('.project-title') as HTMLElement
            const button = card.querySelector('.project-button') as HTMLElement

            if (!image) return

            const onMouseEnter = () => {
                gsap.to(image, { scale: 1.05, duration: 0.4, ease: 'power2.out' })
                gsap.to(title, { color: '#a855f7', duration: 0.3 })
                gsap.to(button, { scale: 1.05, backgroundColor: '#7e22ce', duration: 0.3 })

            }

            const onMouseLeave = () => {
                gsap.to(image, { scale: 1, duration: 0.4 })
                gsap.to(title, { color: '', duration: 0.3 })
                gsap.to(button, { scale: 1, backgroundColor: '#9333ea', duration: 0.3 })
            }

            card.addEventListener('mouseenter', onMouseEnter)
            card.addEventListener('mouseleave', onMouseLeave)

            // Guardar limpieza
            cleanups.push(() => {
            card.removeEventListener('mouseenter', onMouseEnter)
            card.removeEventListener('mouseleave', onMouseLeave)
            })
        })

        // Limpiar cunado se desmonte el componente
        return () => {
            cleanups.forEach(cleanup => cleanup())
        }
    }, { scope: sectionRef })

    return (
        <section ref={sectionRef} className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800 dark:text-white">
                Mis Proyectos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project, index) => (
                <div
                key={project.id}
                ref={(el) => {(cardsRef.current[index] = el)}}
                className="bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 project-card"
                >
                <div className="overflow-hidden">
                    <img
                    src={project.image}
                    alt={project.title}
                    className="project-image w-full h-48 object-cover transition-transform duration-300"
                    />
                </div>
                <div className="p-6">
                    <h3 className="project-title text-xl font-bold mb-2 text-gray-800 dark:text-white">
                        {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                            <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full"
                            >
                            {tag}
                            </span>
                        ))}
                    </div>
                    <button className="project-button px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold transition-colors">
                        Ver detalles
                    </button>
                </div>
                </div>
            ))}
            </div>
        </div>
        </section>
    )
}

