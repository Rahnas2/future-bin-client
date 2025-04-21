
import axiosInstance from "./axiosInstance";


export const refundApi = async( paymentIntentId: string, amount: number ) => {
    const response = await axiosInstance.post('/api/payment/refund', {paymentIntentId, amount})
    console.log('refund response ', response)
    return response.data
}

export const getClientSecretApi = async(requestId: string) => {
    const response = await axiosInstance.get(`/api/payment/client-secret/${requestId}`)
    return response.data
}