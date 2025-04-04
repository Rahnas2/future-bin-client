
import axiosInstance from "./axiosInstance";

export const fetchCollectorProfileApi = async () => {
    const response = await axiosInstance.get('/collector/profile')
    console.log('response', response)
    return response.data
}

//fetch nearby pending requests
export const fetchNearbyRequestsApi = async () => {
    const response = await axiosInstance.get('/collector/pickup-requests')
    return response.data
}

export const fetchRequestById = async (id: string) => {
    const response = await axiosInstance.get(`/collector/pickup-request/${id}`)
    return response.data
}

export const acceptPickupRequestApi = async (requestId: string, collectorName: string) => {
    const response = await axiosInstance.patch('/collector/pickup-request/accept', {requestId, collectorName})
    console.log('response ', response)
    return response.data
}

export const fetchMessagesBetweenTwoUserApi = async (userId: string) => {
    const response = await axiosInstance.get(`/chat/message-between?userId2=${userId}`)
    return response.data
}