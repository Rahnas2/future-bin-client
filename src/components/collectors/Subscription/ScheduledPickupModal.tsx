import { sendOtpService } from '@/api/authService'
import { fetchScheduledPickupsByRequestIdApi } from '@/api/scheduledPickups'
import ComponentSpinner from '@/components/common/ComponentSpinner'
import { scheduledPickupType } from '@/types/scheduledPickup'
import { Calendar, CheckCircle, CheckSquare, Component, X, XCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
    pickupRequestId: string
    email: string
    onClose: () => void
}

const ScheduledPickupModal: React.FC<Props> = ({ pickupRequestId, email, onClose }) => {

    const navigate = useNavigate()

    const [scheduledPickups, setScheduledPickups] = useState<scheduledPickupType[] | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [tab, setTab] = useState<'pending' | 'completed' | 'missed'>('pending')

    useEffect(() => {
        const fetchSchduledPickups = async () => {
            try {
                setIsLoading(true)
                const result = await fetchScheduledPickupsByRequestIdApi(pickupRequestId)
                console.log('result ...', result)
                setScheduledPickups(result.scheduledPickups)
            } catch (error) {
                console.log('error fetching scheduled pickups ', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchSchduledPickups()
    }, [])

    // To Navigate OTP Verification Page
    const handleNavigation  = async (id: string) => {
        try {
            await sendOtpService(email)
            navigate('/otp-verification', { state: { email: email, mode: 'scheduled-pickup-completed', id: id } })
        } catch (error) {
            console.log('error sending otp ', error)
        }
    }

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-Us', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    const isToday = (date: string) => {
        const today = new Date()
        const scheduledDate = new Date(date)

        if (scheduledDate.toDateString() === today.toDateString()) {
            return true
        }

        return false
    }

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className='bg-primary p-6 shadow-2xl border border-gray-500 rounded-md w-xl h-[90vh] flex flex-col'>
                <div className='flex justify-between mb-5'>
                    <h2 className='font-medium text-lg'>Pickup Schedule</h2>
                    <button onClick={onClose} className="text-accent2 cursor-pointer"><X /></button>
                </div>

                {/* nav */}
                <div className='flex gap-6 mb-8 *:flex *:items-center  *:text-sm *:pb-4 *:px4 '>
                    <button onClick={() => setTab('pending')} className={`cursor-pointer  ${tab === 'pending' ? 'border-b border-blue-500 text-blue-500' : ''}`}><Calendar className='h-4 w-w inline mr-2' /> <span>UpComing</span></button>
                    <button onClick={() => setTab('completed')} className={`cursor-pointer ${tab === 'completed' ? 'border-b border-accent2 text-accent2 ' : ''}`}><CheckSquare className='h-4 w-w inline mr-2' /><span>Completed</span></button>
                    <button onClick={() => setTab('missed')} className={`cursor-pointer ${tab === 'missed' ? 'border-b border-red-500 text-red-500 ' : ''}`}><XCircle className='h-4 w-w inline mr-2' /><span>Missed</span></button>
                </div>

                <div className='overflow-y-auto flex-1'>
                    {isLoading ? <ComponentSpinner /> :
                        (scheduledPickups && scheduledPickups.filter(pickup => pickup.status === tab).map(pickup => (
                            <div className='border border-gray-700 p-3 rounded-lg mb-2 shadow-sm'>
                                <div className={`${pickup.status === 'pending' ? 'flex justify-between' : ''}`}>

                                    <div>
                                        <p className='font-medium'>{formatDate(pickup.scheduledDate.toString())}</p>
                                        <p className={`${pickup.status === 'completed' ? 'text-accent2' : pickup.status === 'missed' ? 'text-red-500' : 'opacity-50 '} `}>Status: {pickup.status}</p>
                                    </div>

                                    {pickup.status === 'pending' && <button disabled={isToday(pickup.scheduledDate.toString())} onClick={() => handleNavigation(pickup._id)} className='px-3 py-0.5 flex items-center bg-accent rounded-md'><CheckCircle className='inline w-4 h-4 mr-1' />Complete</button>}
                                </div>

                            </div>
                        )
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ScheduledPickupModal