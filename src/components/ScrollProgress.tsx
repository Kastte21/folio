import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export const ScrollProgress = () => {
    const barRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const onScroll = () => {
            const doc = document.documentElement
            const scrollTop = doc.scrollTop || document.body.scrollTop
            const scrollHeight = doc.scrollHeight - doc.clientHeight
            const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0

            gsap.to(barRef.current, {
                width: `${progress}%`,
                duration: 0.15,
                ease: 'none',
            })
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()

        return () => window.removeEventListener('scroll', onScroll)
    }, [])
    return (
        <div className="fixed top-0 left-0 w-full h-1 z-60 bg-transparent">
        <div
            ref={barRef}
            className="h-full w-0 bg-linear-to-r from-cyan-300 via-blue-400 to-fuchsia-400"
        />
        </div>
    )
}