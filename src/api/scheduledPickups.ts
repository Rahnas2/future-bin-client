import axiosInstance from "./axiosInstance"

export const fetchScheduledPickupsByRequestIdApi = async ( pickupRequestId: string ) => {
    const response = await axiosInstance.get(`/api/scheduled-pickups/${pickupRequestId}`)
    return response.data
}

export const scheduledPickupCompletedApi = async (id: string) => {
    const response = await axiosInstance.put(`/api/scheduled-pickups/${id}/complete`)
    return response.data
}