import { useEffect, useRef } from "react";
import gsap from "gsap";

export const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;
        if (!cursor || !follower) return

        // Posiciones actuales y objetivo
        let cursorX = 0, cursorY = 0
        let followerX = 0, followerY = 0

        // Actualizar posvcion del mouse
        const onMouseMove = (e: MouseEvent) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
            gsap.set(cursor, { x: cursorX, y: cursorY })
        }
        
        // Loop de anmacion para el seguidor (efecto de retraso)
        const animateFollower = () => {
            followerX += (cursorX - followerX) * 0.15;
            followerY += (cursorY - followerY) * 0.15;
            gsap.set(follower, { x: followerX, y: followerY })
            requestAnimationFrame(animateFollower)
        }

        window.addEventListener("mousemove", onMouseMove);
        const animationId = requestAnimationFrame(animateFollower)

        // Cambiar tamaño al pasar sobre elementos interactivos
        const interactiveElements = document.querySelectorAll("a, button, .project-card");

        const handleMouseEnter = () => {
            gsap.to(cursor, { scale: 1.5, duration: 0.3 })
            gsap.to(follower, { scale: 2.5, duration: 0.3 })
        }
        const handleMouseLeave = () => {
            gsap.to(cursor, { scale: 1, duration: 0.3 })
            gsap.to(follower, { scale: 1, duration: 0.3 })
        }

        interactiveElements.forEach(el => {
            el.addEventListener("mouseenter", handleMouseEnter)
            el.addEventListener("mouseleave", handleMouseLeave)
        })
    
        return () => {
        window.removeEventListener('mousemove', onMouseMove)
        cancelAnimationFrame(animationId)
        interactiveElements.forEach(el => {
            el.removeEventListener('mouseenter', handleMouseEnter)
            el.removeEventListener('mouseleave', handleMouseLeave)
        })}
    }, [])

    return (
        <>
        {/* Cursor pequeño y brillante */}
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 w-3 h-3 bg-purple-500 rounded-full pointer-events-none z-50 mix-blend-difference"
            style={{ transform: 'translate3d(0,0,0)' }}
        />
        {/* Anillo seguidor más grande con retraso */}
        <div
            ref={followerRef}
            className="fixed top-0 left-0 w-8 h-8 border-2 border-purple-400 rounded-full pointer-events-none z-50 opacity-70"
            style={{ transform: 'translate3d(0,0,0)' }}
        />
        </>
    )
}