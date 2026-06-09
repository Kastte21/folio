import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { FaReact, FaGitAlt, FaDatabase } from 'react-icons/fa';
import { SiTypescript, SiPostgresql, SiMysql, SiPython } from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

const skills = [
    { name: 'React', icon: FaReact, color: '#61DAFB', group: 'Frontend' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', group: 'Frontend / Backend' },
    { name: 'Git', icon: FaGitAlt, color: '#F05032', group: 'Frontend / Backend / Datos' },
    { name: 'SQL Server', icon: FaDatabase, color: '#CC2927', group: 'Datos / BI' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791', group: 'Datos / BI' },
    { name: 'MySQL', icon: SiMysql, color: '#4479A1', group: 'Datos / BI' },
    { name: 'Python', icon: SiPython, color: '#3776AB', group: 'Automatización' },
]

export const Skills = () => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const cardsRef = useRef<(HTMLDivElement | null)[]>([])

    useGSAP(() => {
        const cards = cardsRef.current.filter(c => c !== null);

        gsap.fromTo(cards,
            { y: 40, opacity: 0, scale: 0.95 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.7,
                stagger: 0.08,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse',
                },
            }
        );
    }, { scope: sectionRef })

    return (
        <section id="skills" ref={sectionRef} className="py-24 bg-linear-to-b from-black to-slate-950">
        <div className="max-w-6xl mx-auto px-4">
            <p className="text-cyan-300 tracking-widest uppercase text-sm text-center mb-3">Stack</p>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Herramientas y tecnologías</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {skills.map((skill, idx) => (
                <div
                key={skill.name}
                ref={(el) => { cardsRef.current[idx] = el }}
                className="rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur-sm text-center transition-transform duration-300 hover:-translate-y-1"
                >
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">{skill.group}</p>
                <skill.icon className="w-12 h-12 mx-auto mb-4" style={{ color: skill.color }} />
                <h3 className="text-lg font-semibold">{skill.name}</h3>
                </div>
            ))}
            </div>
        </div>
        </section>
    )
}
