import { useEffect, useRef } from "react";
import gsap from "gsap";

export const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null)
    const followerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const cursor = cursorRef.current
        const follower = followerRef.current
        if (!cursor || !follower) return

        const isTouch = window.matchMedia('(pointer: coarse)').matches
        if (isTouch) return

        const move = (e: MouseEvent) => {
        gsap.to(cursor, {
            x: e.clientX - 6,
            y: e.clientY - 6,
            duration: 0.08,
            ease: 'none',
        })

        gsap.to(follower, {
            x: e.clientX - 18,
            y: e.clientY - 18,
            duration: 0.25,
            ease: 'power3.out',
        })
        }

        const onEnterInteractive = () => {
        gsap.to(follower, { scale: 1.6, opacity: 0.35, duration: 0.2 })
        }

        const onLeaveInteractive = () => {
        gsap.to(follower, { scale: 1, opacity: 0.2, duration: 0.2 })
        }

        const interactive = Array.from(
        document.querySelectorAll('a, button, [role="button"], input, textarea, select')
        )

        interactive.forEach((el) => {
        el.addEventListener('mouseenter', onEnterInteractive)
        el.addEventListener('mouseleave', onLeaveInteractive)
        })

        window.addEventListener('mousemove', move)

        return () => {
        window.removeEventListener('mousemove', move)
        interactive.forEach((el) => {
            el.removeEventListener('mouseenter', onEnterInteractive)
            el.removeEventListener('mouseleave', onLeaveInteractive)
        })
        }
    }, [])

    return (
        <>
        <div
            ref={followerRef}
            className="pointer-events-none fixed top-0 left-0 z-9998 w-9 h-9 rounded-full border border-cyan-300/60 bg-cyan-200/10 mix-blend-screen hidden md:block"
        />
        <div
            ref={cursorRef}
            className="pointer-events-none fixed top-0 left-0 z-9999 w-3 h-3 rounded-full bg-cyan-300 hidden md:block"
        />
        </>
    )
}