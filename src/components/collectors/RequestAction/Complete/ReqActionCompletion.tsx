import { createPaymentSessionApi } from '@/api/collectorServices'
import { completePickupRequestApi } from '@/api/pickupRequest'
import PaymentQrModal from '@/components/common/Payment/PaymentQrModal'
import { useOnDemandComplete } from '@/context/OnDemandCompleteContex'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { getSocket } from '@/services/socket';
import { useNavigate } from 'react-router-dom'

type Props = {}

const ReqActionCompletion = (props: Props) => {

    const socket = getSocket();
    const navigate = useNavigate()

    const { pickupRequest, setPickupRequest } = useOnDemandComplete()
    const [showPaymentQr, setShowPaymentQr] = useState(false)

    const [paymentSessionResponse, setPaymentSessionResponse] = useState({
        url: '',
        amount: 0
    });

    useEffect(() => {
        if (!socket || !pickupRequest) return

        socket.emit('register', pickupRequest.userId) // register user to socket

        socket.on('payment_status', (data) => {
            if (data.pickupRequestId === pickupRequest._id) {
                if (data.status === 'success') {
                    toast.success('payment success')
                    setPickupRequest(prev => ({...prev, paidAmount: pickupRequest.totalAmount }) )
                    setShowPaymentQr(false)
                } else {
                    toast.error('failed! please try again')
                    setShowPaymentQr(false)
                }
            }
        })

        return () => {
            socket.off('payment_status')
        }
    }, [socket, pickupRequest])

    //handle complete balance amount for user 
    const handleCompletePayment = async () => {
        try {
            const balanceAmount = pickupRequest.totalAmount - (pickupRequest.paidAmount as number)
            const response = await createPaymentSessionApi(balanceAmount, pickupRequest.userId as string, pickupRequest._id as string)

            setPaymentSessionResponse(response.session)
            setShowPaymentQr(true)
        } catch (error) {
            console.error('error hanling complete payment ', error)
        }
    }

    const handleClose = async () => {
        setShowPaymentQr(false)
    }

    //handle complete request 
    const handleCompleteRequest = async () => {
        try {

            await completePickupRequestApi(pickupRequest._id!)
            toast.success('success')
            navigate(-1)

        } catch (error) {
            console.log('error for complete request ', error)
        }

    }

    return (
        <div className="flex gap-3 items-center justify-center">
            <button
                disabled={pickupRequest.totalAmount <= (pickupRequest.paidAmount as number)}
                onClick={handleCompletePayment}
                className={`px-4 py-2 rounded-lg font-medium transition-colors
                    ${pickupRequest.totalAmount <= (pickupRequest.paidAmount as number)
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'}`}
            >
                Complete Payment
            </button>

            <button
                disabled={pickupRequest.totalAmount > (pickupRequest.paidAmount as number)}
                onClick={handleCompleteRequest}
                className={`px-4 py-2 rounded-lg font-medium transition-colors
                    ${pickupRequest.totalAmount > (pickupRequest.paidAmount as number)
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-accent text-white hover:bg-green-600 cursor-pointer'}`}
            >
                Done
            </button>

            {showPaymentQr && <PaymentQrModal paymentUrl={paymentSessionResponse.url} amount={paymentSessionResponse.amount} onClose={handleClose} />}
        </div>
    )

}

export default ReqActionCompletion