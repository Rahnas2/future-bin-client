import axiosInstance from "./axiosInstance"

export const fetchOverviewCountsApi = async () => {
    const response = await axiosInstance.get('/api/overview/counts')
    return response.data
}