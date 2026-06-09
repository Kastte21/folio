import { useRef } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const Contact = () => {
    const sectionRef = useRef<HTMLElement>(null)

    useGSAP(() => {
        const q = gsap.utils.selector(sectionRef)

        gsap.fromTo(
            q('.contact-reveal'),
            { opacity:0, y: 35 },
            {
                opacity: 1,
                y: 0,
                duration: 0.75,
                ease: 'power2.out',
                stagger: 0.12,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 78%',
                    toggleActions: 'play none none reverse',
                },
            }
        )
    },{ scope: sectionRef })

    return (
        <section id="contacto" ref={sectionRef} className="py-24 bg-linear-to-b from-black to-slate-950">
        <div className="max-w-4xl mx-auto px-4">
            <p className="contact-reveal text-cyan-300 tracking-widest uppercase text-sm text-center mb-3">Contact</p>
            <h2 className="contact-reveal text-4xl md:text-5xl font-bold text-center mb-6">Hablemos</h2>
            <p className="contact-reveal text-gray-300 text-center mb-12">
            Si necesitas apoyo en BI, automatización, análisis de datos o una interfaz web para mostrar resultados, escríbeme.
            </p>

            <div className="contact-reveal rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                type="text"
                placeholder="Tu nombre"
                className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-300"
                />
                <input
                type="email"
                placeholder="Tu correo"
                className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-300"
                />
                <input
                type="text"
                placeholder="Asunto"
                className="md:col-span-2 bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-300"
                />
                <textarea
                rows={6}
                placeholder="Cuéntame sobre tu proyecto..."
                className="md:col-span-2 bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-300 resize-none"
                />
                <button
                type="button"
                className="md:col-span-2 px-6 py-3 rounded-lg bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition-colors"
                >
                Enviar mensaje
                </button>
            </form>
            </div>
        </div>
        </section>
    )
}
