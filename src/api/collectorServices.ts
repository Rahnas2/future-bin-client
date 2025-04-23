
import { CollectorType } from "@/types/CollectorType";
import axiosInstance from "./axiosInstance";
import { CollectorDocType } from "@/types/CollectorDocType";

export const fetchCollectorProfileApi = async () => {
    const response = await axiosInstance.get('/api/collector/profile')
    console.log('response', response)
    return response.data
}

export const updateCollectorDataApi = async (_id:string,  data: Partial<CollectorDocType>) => {
    const response = await axiosInstance.patch('/api/collector', {_id, ...data})
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
export const createPaymentSessionApi = async(amount: number, userId: string, pickupRequestId: string) => {
    const response = await axiosInstance.post('/api/collector/create-payment-session', {amount, userId, pickupRequestId})
    console.log('respose create payment session ', response)
    return response.data
}

export const fetchCollectorEarningsSummaryApi = async() => {
    const response = await axiosInstance.get('/api/collector/my-earnings')
    return response.data
}
//Stripe Onboarding Url 
export const getStripeOnboardingUrlApi = async(stripeAccountId: string) => {
    const response = await axiosInstance.get(`/api/collector/onboarding-link/${stripeAccountId}`)
    console.log('fetch stripe on-boarding url ', response)
    return response.data
}

export const withdrawBalanceCollectorApi = async(amount: number) => {
    const response = await axiosInstance.post('/api/collector/money/withdraw', {amount})
    return response.data
}