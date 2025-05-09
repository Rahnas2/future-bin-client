
import { wasteType } from "@/types/wasteTyp";
import { subscriptionType } from "../types/SubscriptionType";
import axiosInstance from "./axiosInstance";


// Fetch All Users
export const fetchUsersApi = async (page: number, limit: number, search: string) => {
    const response = await axiosInstance.get(`/admin/fetch-users?page=${page}&limit=${limit}&search=${search}`)
    return response.data
}

// Fetch Single User By User Id
export const fetchSingleUserApi = async (userId: string) => {
    const response = await axiosInstance.get(`/admin/user/view-detail?userId=${userId}`)
    return response.data
}

// Fetch All Collectors 
export const fetchCollectorsApi = async (status: string, page: number, limit: number, search: string) => {
    const response = await axiosInstance.get(`/admin/collectors?approvedStatus=${status}&page=${page}&limit=${limit}&search=${search}`)
    return response.data
}

// Fetch Collector By UserId
export const fetchSingleCollectorApi = async(userId: string) => {
    const response = await axiosInstance.get(`/admin/collector/view-detail?userId=${userId}`)
    return response.data
}

// Block & Unblock (User & Collector)
export const blockUserApi = async (userId: string) => {
    const response = await axiosInstance.patch('/admin/user/status', { userId: userId})
    return response.data
}

export const acceptRegisterationReqeustApi = async(collectorId: string, name: string, email: string) => {
    const response = await axiosInstance.patch('/admin/collector/request/approve', {collectorId, name, email})
    return response.data
}

export const rejectRegisterationRequestApi = async(collectorId: string, name: string, email: string) => {
    const response = await axiosInstance.patch('/admin/collector/request/reject', {collectorId, name, email})
    return response.data
}

export const addSubscriptionApi = async (data: subscriptionType) => {
    const response = await axiosInstance.post('/admin/subscription', {data})
    return response.data
}

export const editSubscriptionApi = async (data: Partial<subscriptionType>) => {
    const response = await axiosInstance.put('/admin/subscription', {...data})
    return response.data
}

export const deleteSubscriptionApi = async (id: string) => {
    const response = await axiosInstance.delete(`/admin/subscription?id=${id}`)
    return response.data
}

export const fetchAllWasteTypesApi = async (page: number, limit: number, search: string) => {
    const response = await axiosInstance.get(`/admin/waste-types?page=${page}&limit=${limit}&search=${search}`)
    return response.data
}

export const addWasteTypeApi = async (name: string, price: number) => {
    const response = await axiosInstance.post('/admin/waste-types', {name, price})
    return response.data
}


export const editWasteTypeApi = async (data: Partial<wasteType>) => {
    const response = await axiosInstance.put('/admin/waste-types', {...data})
    return response.data
}


export const deleteWasteTypeApi = async (id: string) => {
    const response = await axiosInstance.delete(`/admin/waste-types?_id=${id}`)
    return response.data
}

//Dashboard
export const fetchPickupRequestSummaryApi = async () => {
    const response = await axiosInstance.get('/admin/dashboard/summary')
    return response.data
}

export const fetchPickupRequestAnalyticsApi = async (from: string, to: string) => {
    const response = await axiosInstance.get(`/admin/dashboard/analytics?from=${from}&to=${to}`)
    return response.data
}

//Revenue
export const fetchRevenueSummaryApi = async() => {
    const response = await axiosInstance.get('/admin/revenue')
    return response.data
}