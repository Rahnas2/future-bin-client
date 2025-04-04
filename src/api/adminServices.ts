
import { wasteType } from "@/types/wasteTyp";
import { editSubscriptionDto } from "../types/editSubscriptionTypeDto";
import { subscriptionType } from "../types/SubscriptionType";
import axiosInstance from "./axiosInstance";


export const fetchUsersApi = async () => {
    const response = await axiosInstance.get('admin/fetch-users')
    return response.data
}
   
export const fetchCollectorsApi = async (status: string) => {
    const response = await axiosInstance.get(`admin/collectors?approvedStatus=${status}`)
    return response.data
}

export const addSubscriptionApi = async (data: subscriptionType) => {
    const response = await axiosInstance.post('admin/subscription', {data})
    return response.data
}

export const editSubscriptionApi = async (data: editSubscriptionDto) => {
    const response = await axiosInstance.put('admin/subscription', {...data})
    return response.data
}

export const deleteSubscriptionApi = async (id: string) => {
    const response = await axiosInstance.delete(`admin/subscription/delete?id=${id}`,)
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