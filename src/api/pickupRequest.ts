import axiosInstance from "./axiosInstance"

export const fetchPickupRequestById = async (id: string) => {
    const response = await axiosInstance.get(`/api/pickup-requests/${id}`)
    return response.data
}


