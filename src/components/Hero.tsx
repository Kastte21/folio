import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";
import Typed from "typed.js";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
    const container = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const subtitleRef = useRef<HTMLParagraphElement>(null)
    const typedRef = useRef<HTMLSpanElement>(null)
    const ctaRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        gsap.set([titleRef.current, subtitleRef.current, typedRef.current, ctaRef.current],{
            opacity: 0,
            y: 40,
        })

        tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.9 })
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
        .to(typedRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.3')
        
    }, { scope: container })

    useEffect(() => {
        if (!typedRef.current) return

        const typed = new Typed(typedRef.current, {
            strings:[
                'React + TypeScript',
                'Interfaces modernas con motion',
                'Experiencias web de alto impacto',
                'MySQL + MsSQL + PostgreSQL + Python',
                'Automatizaciones y análisis de datos',
                'Administración de bases de datos',
            ],
            typeSpeed: 45,
            backSpeed: 28,
            backDelay: 1400,
            loop: true,
        })

        return () => typed.destroy()
    }, [])

    const scrollToProjects = () => {
        document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth' })
    }
    
    return (
        <section
        id="inicio"
        ref={container}
        className="relative min-h-screen flex items-center justify-center px-4"
        >
        <div className="absolute inset-0 -z-10 bg-linear-to-br from-slate-950 via-black to-slate-900" />
        <div className="absolute top-24 left-10 w-64 h-64 bg-cyan-500/20 blur-3xl rounded-full -z-10" />
        <div className="absolute bottom-16 right-12 w-72 h-72 bg-fuchsia-500/20 blur-3xl rounded-full -z-10" />

        <div className="max-w-4xl text-center">
            <p className="mb-4 text-cyan-300 tracking-widest uppercase text-sm">Portfolio</p>
            <h1 ref={titleRef} className="text-5xl md:text-7xl font-extrabold leading-tight mb-5">
            Hola, soy <span className="bg-linear-to-r from-cyan-300 to-fuchsia-400 bg-clip-text text-transparent">Sebastián</span>
            </h1>
            <p ref={subtitleRef} className="text-gray-300 text-lg md:text-2xl mb-4">
            Desarrollo experiencias web interactivas y elegantes.
            </p>
            <p className="text-cyan-200 text-xl md:text-2xl h-10 mb-10">
            <span ref={typedRef} />
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
                onClick={scrollToProjects}
                className="px-8 py-3 rounded-full bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition-colors"
            >
                Ver proyectos
            </button>
            <button
                onClick={() => document.getElementById('trayectoria')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 rounded-full border border-white/30 text-white hover:bg-white/10 transition-colors"
            >
                Ver trayectoria
            </button>
            </div>
        </div>
        </section>
    )
}