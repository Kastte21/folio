import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef } from "react"

gsap.registerPlugin(ScrollTrigger);

const events = [
    { year: '2021', month: 'Ene', title: 'Soporte técnico', desc: 'Mantenimiento, usuarios y administración de infraestructura básica.' },
    { year: '2023', month: 'Abr', title: 'Base técnica sólida', desc: 'Trabajo con hardware, software, redes, Windows Server y SQL.' },
    { year: '2025', month: 'Ene', title: 'Entrada a BI', desc: 'Automatización, reportes, bases de datos y análisis operativo.' },
    { year: '2025', month: 'Jun', title: 'Portfolio mixto', desc: 'Consolidación de una marca personal que une datos, BI y frontend.' },
];

export const Timeline = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        gsap.fromTo(lineRef.current,
            { scaleY: 0, transformOrigin: 'top center' },
            {
                scaleY: 1,
                duration: 1.4,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%'
                },
            }
        );

        const items = itemsRef.current.filter(Boolean);
        items.forEach((item, idx) => {
            gsap.fromTo(
                item,
                { opacity: 0, x: idx % 2 === 0 ? -50 : 50, y: 20 },
                {
                    opacity: 1, 
                    x: 0,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            )
        })
    }, { scope: sectionRef });

    return (
        <section id="trayectoria" ref={sectionRef} className="py-24 bg-black">
        <div className="max-w-5xl mx-auto px-4">
            <p className="text-cyan-300 tracking-widest uppercase text-sm text-center mb-3">Milestones</p>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Trayectoria</h2>

            <div className="relative">
            <div ref={lineRef} className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-linear-to-b from-cyan-400 to-fuchsia-500" />

            <div className="space-y-12">
                {events.map((ev, idx) => (
                <div
                    key={`${ev.year}-${ev.title}`}
                    ref={(el) => { itemsRef.current[idx] = el }}
                    className={`relative flex ${idx % 2 === 0 ? 'justify-start pr-8 md:pr-16' : 'justify-end pl-8 md:pl-16'}`}
                >
                    <div className="w-full md:w-[46%] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
                    <span className="text-cyan-300 text-sm">{ev.month} {ev.year}</span>
                    <h3 className="text-xl font-bold mt-1 mb-2">{ev.title}</h3>
                    <p className="text-gray-300">{ev.desc}</p>
                    </div>

                    <div className="absolute left-1/2 -translate-x-1/2 top-7 w-4 h-4 rounded-full bg-cyan-300 border-4 border-black" />
                </div>
                ))}
            </div>
            </div>
        </div>
        </section>
    )
}
