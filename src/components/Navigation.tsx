import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

const navItems = [
    { label: 'Inicio', id: 'inicio' },
    { label: 'Sobre mí', id: 'sobre-mi' },
    { label: 'Proyectos', id: 'proyectos' },
    { label: 'Skills', id: 'skills' },
    { label: 'Trayectoria', id: 'trayectoria' },
]

export const Navigation = () => {
    const [active, setActive] = useState('inicio')
    const [isHidden, setIsHidden] = useState(false)
    const lastScrollY = useRef(0)

    useEffect(() => {
        const handleScroll = () => {
        const currentY = window.scrollY
        const scrollingDown = currentY > lastScrollY.current && currentY > 100
        setIsHidden(scrollingDown)

        for (let i = navItems.length - 1; i >= 0; i--) {
            const section = document.getElementById(navItems[i].id)
            if (section && section.offsetTop <= currentY + 150) {
            setActive(navItems[i].id)
            break
            }
        }

        lastScrollY.current = currentY
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollTo = (id: string) => {
        const element = document.getElementById(id)
        if (!element) return

        gsap.to(window, {
        duration: 1,
        ease: 'power2.out',
        scrollTo: { y: element, offsetY: 80 },
        })
    }

    return (
        <nav
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
            isHidden ? '-translate-y-full' : 'translate-y-0'
        } bg-black/60 backdrop-blur-md border-b border-white/10`}
        >
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-center gap-6 md:gap-8">
            {navItems.map((item) => (
            <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-sm md:text-base font-medium transition-colors duration-300 ${
                active === item.id
                    ? 'text-cyan-300'
                    : 'text-gray-300 hover:text-white'
                }`}
            >
                {item.label}
            </button>
            ))}
        </div>
        </nav>
    )
}