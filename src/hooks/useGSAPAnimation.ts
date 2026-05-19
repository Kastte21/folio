import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export const useGSAPAnimation = (
    animationCallback: (ctx:gsap.Context) => void,
    deps: React.DependencyList = [],
) => {
    const scope = useRef<HTMLElement | null>(null)

    useEffect(() => {
        // Crear un contexto de GSAP para limpiar automaticamente
        const ctx = gsap.context(() => {
            animationCallback(ctx)
        }, scope)

        return () => ctx.revert()
        // desactivar regla de linting en esta linea
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)

    return scope
}