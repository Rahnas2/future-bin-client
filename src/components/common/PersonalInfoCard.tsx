import React from 'react'
import { FaUserCircle } from 'react-icons/fa'

type Props = {
    image?: string,
    userName: string,
    mobile: string,
    email: string
}

const PersonalInfoCard: React.FC<Props> = ({ image, userName, mobile, email }) => {
    return (
        <div className="flex gap-8 items-center border-1 border-gray-500 px-8 py-5 rounded-lg shadow-lg min-w-sm">
            <div className="inline">
                {image ? <img className="w-32 h-32 rounded-full" src={image} /> :
                    <FaUserCircle className='inline m-0 h-32 w-32' />
                }
            </div>
            <div>
                <div className="font-bold text-2xl mb-2">{userName}</div>
                <div className="mb-1 opacity-50">{email}</div>
                <div className="opacity-50">{mobile}</div>
            </div>
        </div>
    )
}

export default PersonalInfoCard