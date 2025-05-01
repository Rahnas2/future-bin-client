
import axiosInstance from "./axiosInstance"

export const fetchPickupRequestById = async (id: string) => {
    const response = await axiosInstance.get(`/api/pickup-requests/${id}`)
    return response.data
}

export const fetchPickupRequestsByTypeAndStatus = async (type: string, status: string) => {
    const response = await axiosInstance.get(`/api/pickup-requests/${type}/${status}`)
    return response.data
}

export const completePickupRequestApi = async(id: string) => {
    const response = await axiosInstance.put('/api/pickup-requests/complete', {id})
    return response.data
}

export const fetchAreaDataForCollectorApi = async() => {
    const response = await axiosInstance.get('/api/pickup-requests/collector/area-data')
    return response.data
}