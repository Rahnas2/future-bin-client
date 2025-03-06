import axiosInstance from "./axiosInstance";

export const fetchCollectorProfileApi = async () => {
    const response = await axiosInstance.get('/collector/profile')
    console.log('response', response)
    return response.data
}