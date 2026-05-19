import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"

export const Hero = () => {
    const container = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        // Timeline
        const tl = gsap.timeline()

        // Animacion de entrada dek titulo
        tl.from('.hero-title', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
        })
        // Animacion de entrada de subtitulo
        .from('.hero-subtitle', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
        }, '-=0.4')
        // Animacion de boton
        .from('.hero-button', {
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            ease: 'back.out(1.2)',
        }, '-=0.2')
        .from('.hero-badge', {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            ease: 'back.out(1.2)',
        }, '-=0.8')
    }, { scope: container })

    return (
        <div ref={container} className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 to-gray-800 text-white">
        <div className="text-center px-4">
            <div className="hero-badge inline-block mb-4 px-3 py-1 bg-purple-500/20 rounded-full text-purple-300 text-sm">
                Bienvenido a mi portfolio
            </div>
            <h1 className="hero-title text-5xl md:text-7xl font-bold mb-4">
                Hola, soy <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-600">Sebastián</span>
            </h1>
            <p className="hero-subtitle text-xl md:text-2xl text-gray-300 mb-8">
                Desarrollo experiencias web con React
            </p>
            <button className="hero-button px-8 py-3 bg-purple-600 rounded-full font-semibold hover:bg-purple-700 transition-colors">
                Ver proyectos
            </button>
        </div>
        </div>
    )
}