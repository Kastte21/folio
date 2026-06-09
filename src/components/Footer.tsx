import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
//import { FaGithub, FaLinkedinIn, FaInstagram } from 'react-icons/fa'
//import { RiTwitterXFill } from 'react-icons/ri'

export const Footer = () => {
    return (
        <footer className="border-t border-white/10 bg-black">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Sebastián. Todos los derechos reservados.
            </p>

            <div className="flex items-center gap-3">
            <a
                href="https://github.com/Kastte21"
                className="w-9 h-9 rounded-full border border-white/15 text-gray-300 hover:text-cyan-300 hover:border-cyan-300 flex items-center justify-center transition-colors"
                aria-label="GitHub"
            >
                <FaGithub />
            </a>
            <a
                href="https://www.linkedin.com/in/ssgk/"
                className="w-9 h-9 rounded-full border border-white/15 text-gray-300 hover:text-cyan-300 hover:border-cyan-300 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
            >
                <FaLinkedinIn />
            </a>
            {/*<a
                href="#"
                className="w-9 h-9 rounded-full border border-white/15 text-gray-300 hover:text-cyan-300 hover:border-cyan-300 flex items-center justify-center transition-colors"
                aria-label="Twitter X"
            >
                <RiTwitterXFill />
            </a>
            <a
                href="#"
                className="w-9 h-9 rounded-full border border-white/15 text-gray-300 hover:text-cyan-300 hover:border-cyan-300 flex items-center justify-center transition-colors"
                aria-label="Instagram"
            >
                <FaInstagram />
            </a>*/}
            </div>
        </div>
        </footer>
    )
}