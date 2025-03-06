
import axiosInstance from "./axiosInstance";


export const fetchUsersApi = async () => {
    const response = await axiosInstance.get('admin/fetch-users')
    return response.data
}
   
export const fetchCollectorsApi = async (status: string) => {
    const response = await axiosInstance.get(`admin/collectors?approvedStatus=${status}`)
    return response.data
}