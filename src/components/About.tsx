import { useGSAP } from "@gsap/react"
import gsap from "gsap"
//import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef } from "react"

export const About = () => {
    const sectionRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        const section = sectionRef.current

        // Animacion de entrada de toda la seccion cuando aparece en viewport
        gsap.fromTo('.about-content', 
            {
                y: 50,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger:{
                    trigger: section,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse', // reproduce al entrar , revierte al salir
                },
            }
        )
    }, { scope: sectionRef })
    
    return (
        <section ref={sectionRef} className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
            <div className="about-content max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
                Sobre mí
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Soy desarrollador backend y frontend especializado en crear experiencias web
                interactivas y fluidas. Me apasiona combinar diseño con tecnología
                para construir interfaces que no solo se ven bien, sino que se sienten
                increíbles al interactuar con ellas.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Con GSAP y React, convierto ideas en animaciones cautivadoras que
                cuentan historias y mejoran la experiencia del usuario.
            </p>
            </div>
        </div>
        </section>
    )
}