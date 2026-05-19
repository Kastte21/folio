import { useGSAP } from "@gsap/react";
import gsap from "gsap";
//import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

const skillsData = [
    { name: "React", /*icon: "/icons/react.svg" ,*/ level:75 },
    { name: 'TypeScript', level: 85 },
    { name: 'GSAP', level: 70 },
    { name: 'MSSQL Sever', level: 90 },
    { name: 'MySQL', level: 75 },
    { name: 'Python', level: 90 },
    { name: 'Java', level: 78 },
]

export const Skills = () => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const barsRef = useRef<(HTMLDivElement | null)[]>([])

    useGSAP(() => {
        // Las barras comienzan con width 0
        barsRef.current.forEach(bar => {
            if (bar) gsap.set(bar, { width: '0%' })
        })

        // Timeline que se disparara con ScrollTrigger
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            },
        })

        // Animaciones del titulo y subtitulo
        tl.from('.skills-title', {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
        })
        .from('.skills-subtitle', {
            y: 30,
            opacity: 0,
            duration: 0.6,
        }, '-=0.4')
        // Animacion de cada fila de Skill (etiqueta + barra)
        .from('.skill-item',{
            opacity: 0,
            x: -30,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
        }, '-=0.2')
        // Barras de progreso a su ancho de objetivo
        .to(barsRef.current, {
            width: (i) => `${skillsData[i].level}%`,
            duration: 1,
            stagger: 0.05,
            ease: 'power2.inOut',
        }, '-=0.8')
    }, { scope: sectionRef })

    return (
        <section ref={sectionRef} className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="skills-title text-4xl md:text-5xl font-bold text-center mb-4 text-gray-800 dark:text-white">
                Skills
            </h2>
            <p className="skills-subtitle text-center text-gray-600 dark:text-gray-300 mb-12">
                Tecnologías que domino y disfruto usar
            </p>

            <div className="space-y-6">
                {skillsData.map((skill, index) => (
                    <div key={skill.name} className="skill-item">
                    <div className="flex justify-between mb-2">
                        <span className="font-semibold text-gray-700 dark:text-gray-200">{skill.name}</span>
                        <span className="text-gray-500 dark:text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div
                        ref={(el) => {(barsRef.current[index] = el)}}
                        className="bg-linear-to-r from-purple-500 to-pink-500 h-3 rounded-full"
                        style={{ width: '0%' }}
                        />
                    </div>
                    </div>
                ))}
            </div>
        </div>
        </section>
    )
}