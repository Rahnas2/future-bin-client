import { createPaymentSessionApi } from '@/api/collectorServices'
import { refundApi } from '@/api/paymentService'
import { updatePickupRequestApi } from '@/api/userService'
import PaymentQrModal from '@/components/common/Payment/PaymentQrModal'
import { useOnDemandComplete } from '@/context/OnDemandCompleteContex'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import PickupReqeustCard from '../../PickupReqeustCard'

type Props = {}

const ReqActionCompletion = (props: Props) => {

    const navigate = useNavigate()

    const { pickupRequest } = useOnDemandComplete()
    const [showPaymentQr, setShowPaymentQr] = useState(false)

    const [paymentSessionResponse, setPaymentSessionResponse] = useState({
        url: '',
        amount: 0
    });

    //handle complete balance amount for user 
    const handleCompletePayment = async () => {
        try {
            const balanceAmount = pickupRequest.totalAmount - (pickupRequest.paidAmount as number)
            const response = await createPaymentSessionApi(balanceAmount, pickupRequest.userId as string)

            setPaymentSessionResponse(response.session)
            setShowPaymentQr(true)
        } catch (error) {
            console.error('error hanling complete payment ', error)
        }

    }

    //handle complete request 
    const handleCompleteRequest = async () => {
        try {
            await updatePickupRequestApi(pickupRequest._id as string, { status: 'completed', paidAmount: pickupRequest.totalAmount, completedAt: new Date().toISOString() })

            const balance = pickupRequest.paidAmount as number - pickupRequest.totalAmount
            if(balance > 0){
                await refundApi(pickupRequest.paymentIntentId as string, balance)
            }

            toast.success('success')
            navigate(-1)

        } catch (error) {
            console.log('error for complete request ', error)
        }

    }

    return (
        <div className="flex gap-3 items-center">
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

            {showPaymentQr && <PaymentQrModal paymentUrl={paymentSessionResponse.url} amount={paymentSessionResponse.amount} />}
        </div>
    )

}

export default ReqActionCompletion