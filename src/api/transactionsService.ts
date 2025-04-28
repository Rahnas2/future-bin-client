import axiosInstance from "./axiosInstance"

export const fetchTransactiosHistory = async(page: number, limit: number) => {
    const response = await axiosInstance.get(`/api/transactions?page=${page}&limit=${limit}`)
    return response.data
}

export const transactionAnalyticsApi = async(queryParams: string) => {
    const response = await axiosInstance.get(`/api/transactions/analytics?${queryParams}`)
    return response.data
}