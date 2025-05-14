import { LucideIcon } from 'lucide-react'
import React from 'react'

type Props = {
    Icon: LucideIcon,
    text: string,
    count: number
}

const RequestSummary: React.FC<Props> = ({Icon, text, count}) => {
    return (
        <div className="shadow-2xl bg-seconday flex flex-col items-center gap-5  rounded-md p-5 transform duration-300 ease-in-out hover:scale-105 ">

            <div className="flex items-center ">
                <Icon className="text-accent2 " />
                <div className="ml-3 text-sm font-medium opacity-50">{text}</div>
            </div>

            <div className="font-bold text-xl">{count}</div>
        </div>
    )
}

export default RequestSummary