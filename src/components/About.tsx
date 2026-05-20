import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef } from "react"

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { label: 'Componentes UI', value: 20, suffix: '+' },
    { label: 'Animaciones', value: 10, suffix: '+' },
    { label: 'Responsive', value: 100, suffix: '%' },
    { label: 'Aprendizaje', value: 999, suffix: '+', displayInfinity: true },
]

export const About = () => {
    const sectionRef = useRef<HTMLElement>(null)
    const statValueRefs = useRef<(HTMLElement | null)[]>([]);

    useGSAP(
        () => {
        const q = gsap.utils.selector(sectionRef)

        gsap.fromTo(
            q('.about-reveal'),
            { opacity: 0, y: 35 },
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

        statValueRefs.current.forEach((el, idx) => {
            if (!el) return
            const stat = stats[idx]
            const counter = { val: 0 }

            gsap.to(counter, {
            val: stat.value,
            duration: 1.6,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
            },
            onUpdate: () => {
                const rounded = Math.round(counter.val)
                if (stat.displayInfinity && rounded >= stat.value) {
                el.textContent = '∞'
                } else {
                el.textContent = `${rounded}${stat.suffix}`
                }
            },
            })
        })
        },
        { scope: sectionRef }
    )

    return (
        <section id="sobre-mi" ref={sectionRef} className="py-24 bg-black">
        <div className="max-w-5xl mx-auto px-4">
            <p className="about-reveal text-cyan-300 tracking-widest uppercase text-sm text-center mb-3">About</p>
            <h2 className="about-reveal text-4xl md:text-5xl font-bold text-center mb-10">Sobre Mí</h2>

            <div className="about-reveal rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-7 md:p-10">
            <p className="text-gray-200 leading-relaxed text-lg mb-5">
                Soy desarrollador frontend con enfoque en experiencias visuales modernas.
            </p>

            <p className="text-gray-300 leading-relaxed mb-7">
                Trabajo con React, TypeScript y Tailwind, cuidando accesibilidad, responsive y rendimiento.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                <div key={stat.label} className="about-reveal rounded-xl border border-white/10 p-4 bg-black/30">
                    <p
                    ref={(el) => {
                        statValueRefs.current[idx] = el
                    }}
                    className="text-2xl font-bold text-cyan-300"
                    >
                    0
                    </p>
                    <p className="text-sm text-gray-300">{stat.label}</p>
                </div>
                ))}
            </div>
            </div>
        </div>
        </section>
    )
}