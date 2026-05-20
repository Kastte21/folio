import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const fadeInUp = (el: gsap.TweenTarget, trigger?: gsap.DOMTarget) => {
    gsap.fromTo(el, 
        { opacity: 0, y: 20 }, 
        {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: (trigger || el) as gsap.DOMTarget,
                start: 'top 80%',
                toggleActions: 'play none none none',
            }
        });
}

export const staggerIn = (els: gsap.TweenTarget, trigger?: gsap.DOMTarget) => {
    gsap.fromTo(els, 
        { opacity: 0, y: 20 }, 
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: (trigger || els) as gsap.DOMTarget,
                start: 'top 80%',
                toggleActions: 'play none none none',
            }
        });
}