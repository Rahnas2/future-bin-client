
import axiosInstance from "./axiosInstance";

export const fetchCollectorProfileApi = async () => {
    const response = await axiosInstance.get('/collector/profile')
    console.log('response', response)
    return response.data
}

//fetch nearby pending requests
export const fetchNearbyRequestsApi = async () => {
    const response = await axiosInstance.get('/api/pickup-requests/collector/near')
    console.log('near request api call response ', response)
    return response.data
}

export const acceptPickupRequestApi = async (requestId: string, collectorName: string) => {
    const response = await axiosInstance.patch('/api/pickup-requests/collector/accept', {requestId, collectorName})
    console.log('response ', response)
    return response.data
}

export const fetchMessagesBetweenTwoUserApi = async (userId: string) => {
    const response = await axiosInstance.get(`/chat/message-between?userId2=${userId}`)
    return response.data
}

//payment 
export const createPaymentSessionApi = async(amount: number, userId: string) => {
    const response = await axiosInstance.post('/collector/create-payment-session', {amount, userId})
    console.log('respose create payment session ', response)
    return response.data
}