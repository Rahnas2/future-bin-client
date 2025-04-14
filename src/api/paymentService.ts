import axiosInstance from "./axiosInstance";

export const refundApi = async( paymentIntentId: string, amount: number ) => {
    const response = await axiosInstance.post('/api/refund', {paymentIntentId, amount})
    console.log('refund response ', response)
    return response.data
}