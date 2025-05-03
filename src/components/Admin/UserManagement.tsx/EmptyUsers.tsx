import { LucideIcon } from 'lucide-react'
import React from 'react'

type Props = {
    Icon: LucideIcon,
    text: string
}

const EmptyUsers: React.FC<Props> = ({Icon, text}) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center mt-8 transition-all duration-300 ease-in-out">
            <div className="relative p-5 rounded-full mb-6 bg-gradient-to-br from-emerald-500/20 to-emerald-700/10 shadow-inner animate-pulse-slow">
                <div className="absolute inset-0 rounded-full bg-emerald-500/5 blur-md"></div>
                <Icon className="h-12 w-12 text-emerald-400 relative z-10 transform transition-transform duration-500 hover:scale-110" />
            </div>
            {/* <h3 className="text-2xl font-semibold text-gray-100 mb-3">No Messages Yet</h3> */}
            <p className="text-gray-400 max-w-sm leading-relaxed">
                {text}
            </p>
        </div>
    )
}

export default EmptyUsers