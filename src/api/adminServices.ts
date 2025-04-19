
import { wasteType } from "@/types/wasteTyp";
import { subscriptionType } from "../types/SubscriptionType";
import axiosInstance from "./axiosInstance";


export const fetchUsersApi = async (page: number, limit: number, search: string) => {
    const response = await axiosInstance.get(`/admin/fetch-users?page=${page}&limit=${limit}&search=${search}`)
    return response.data
}

export const fetchSingleUserApi = async (userId: string) => {
    const response = await axiosInstance.get(`/admin/user/view-detail?userId=${userId}`)
    return response.data
}
   
export const fetchCollectorsApi = async (status: string, page: number, limit: number, search: string) => {
    const response = await axiosInstance.get(`/admin/collectors?approvedStatus=${status}&page=${page}&limit=${limit}&search=${search}`)
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
    const response = await axiosInstance.delete(`/admin/subscription/delete?id=${id}`,)
    return response.data
}

export const fetchAllWasteTypesApi = async () => {
    const response = await axiosInstance.get('/admin/waste-types')
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