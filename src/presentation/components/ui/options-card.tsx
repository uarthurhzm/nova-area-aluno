import { ArrowRight, type LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface OptionsCardProps {
    options: OptionsCardOption[];
}

export interface OptionsCardOption {
    name: string;
    image?: string;
    route: string;
    description?: string;
    gradient?: string;
    Icon?: LucideIcon;
}

export default function OptionsCard({ options }: OptionsCardProps) {
    const navigate = useNavigate();

    return (
        <>
            {options.map((option: OptionsCardOption, index: number) => (
                <div
                    key={index}
                    className={`max-w-sm group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${option.gradient || 'bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900'
                        }`}
                    onClick={() => {
                        if (option.route.startsWith('http')) {
                            window.open(option.route, '_blank');
                        } else {
                            navigate(option.route);
                        }
                    }}
                >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />

                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Content */}
                    <div className="relative p-6 flex flex-col h-full min-h-[160px]">
                        {/* Icon/Image */}
                        <div className="mb-4 flex items-start justify-between">
                            <div className="w-14 h-14 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                {option.image ? (
                                    <img
                                        src={option.image}
                                        alt={option.name}
                                        className='w-8 h-8 brightness-0 invert'
                                    />
                                ) : (
                                    option.Icon && <option.Icon className="w-8 h-8 text-white" />
                                )}
                            </div>
                            <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                        </div>

                        {/* Title */}
                        <h3 className='text-white font-bold text-lg mb-2 line-clamp-2'>
                            {option.name}
                        </h3>

                        {/* Description */}
                        {option.description && (
                            <p className='text-white/70 text-sm line-clamp-2 group-hover:text-white/90 transition-colors duration-300'>
                                {option.description}
                            </p>
                        )}

                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shimmer" />
                    </div>
                </div>
            ))}
        </>
    )
}