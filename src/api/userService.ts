
import axiosInstance from "./axiosInstance";
import { pickupRequestType } from "../types/PickupRequest";
import axios from "axios";

export const fetchUserProfileApi = async() => {
    const response = await axiosInstance.get('/profile')
    console.log('response api service ', response)
    return response.data
}

export const editProfileApi = async(formData: FormData) => {
    console.log('form data ', formData)
    const response = await axiosInstance.put('/profile', formData)
    console.log('api service -> edit profile response ', response)
    return response.data
}

export const changePasswordApi = async(currentPassword: string, newPassword: string) => {
    const response = await axiosInstance.post('/change-password', {currentPassword, newPassword})
    return response.data
}

export const fetchAllSubscriptionsApi = async () => {
    const response = await axiosInstance.get('/subscriptions')
    return response.data
}

export const fetchCurrentSubscriptionApi = async (subscriptionId: string) => {
    const response = await axiosInstance.get(`/subscriptions/${subscriptionId}`)
    return response.data
}

export const pickupRequestApi = async (requestData: pickupRequestType) => {
    const response = await axiosInstance.post('/pickup-request', {...requestData})
    return response.data
}

//fetch pickupRequest history for users and collectors
export const fetchPickupRequestHistoryApi = async() => {
    const response = await axiosInstance.get('/pickup-request/history')
    console.log('response ', response)
    return response.data
}

export const fetchAllNotificatoinOfUserApi = async() => {
    const response = await axiosInstance.get('/notications')
    console.log('response notifcaion api call ->> ', response)
    return response.data
}


export const deleteNotificationApi = async(id: string) => {
    const response = await axiosInstance.delete(`/notications?id=${id}`)
    console.log('response ', response)
    return response.data
}



//chat
export const fetchChatListApi = async() => {
    const response = await axiosInstance.get('/chat-list')
    return response.data
}

export const fetchMessagesApi = async (chatId: string) => {
    const response = await axiosInstance.get(`/chat/messages?chatId=${chatId}`)
    return response.data
}

export const deleteImageApi = async (public_id: string) => {
    const response = await axiosInstance.post('/chat/delete-image', {public_id})
    return response.data
}

//payment 
export const updatePaymentStatusApi = async(requestId: string, paymentStatus: string) => {
    const response = await axiosInstance.put('/payment-status', {requestId, paymentStatus})
    return response.data
}