import logo_azul from '@/shared/assets/images/logos/logo-azul-login.png';
import TextCenter from './text-center';

export default function Loading() {

    return (
        <div className="relative w-full h-screen bg-gradient-to-br from-[#F0F0F0] to-white dark:from-[#0B0B0B] dark:to-black flex items-center justify-center">
            <div
                role="status"
                aria-live="polite"
                className="flex flex-col items-center justify-center space-y-8 p-8 max-w-md mx-auto"
            >
                {/* Logo animado */}
                <div className="relative">
                    <div className="absolute inset-0 bg-white/20 dark:bg-white/5 rounded-full blur-xl animate-pulse"></div>
                    <div className="relative bg-white/10 dark:bg-gray-800/60 backdrop-blur-sm rounded-full p-6 border border-white/20 dark:border-white/10">
                        <img
                            src={logo_azul}
                            alt="Logo Unilago"
                            className="w-16 h-16 animate-bounce dark:filter-none"
                        />
                    </div>
                </div>

                {/* Título */}
                <TextCenter text="Área do Aluno" className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white" />
                <TextCenter text="Carregando..." className="text-blue-700 dark:text-blue-200 text-sm md:text-base" />

                {/* Loading spinner premium */}
                <div className="relative">
                    <div className="w-12 h-12 rounded-full animate-spin border-4 border-white/20 dark:border-gray-700 border-t-white dark:border-t-blue-400"></div>
                    <div className="absolute inset-0 w-12 h-12 rounded-full animate-spin animation-delay-150 border-4 border-transparent border-r-blue-300 dark:border-r-blue-400"></div>
                </div>

                {/* Dots indicator */}
                <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-white/60 dark:bg-white/60 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-white/40 dark:bg-white/40 animate-pulse animation-delay-200"></div>
                    <div className="w-2 h-2 rounded-full bg-white/20 dark:bg-white/20 animate-pulse animation-delay-400"></div>
                </div>

                {/* Mensagem adicional */}
                <TextCenter className="text-blue-600 dark:text-blue-100/90 text-xs md:text-sm" text="Preparando sua experiência personalizada" />
            </div>

            {/* Background decorativo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 dark:bg-white/3 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl"></div>
            </div>
        </div>
    )
}