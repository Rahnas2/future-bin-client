import axiosInstance from "./axiosInstance"

export const fetchAllNotificatoinOfReceiverApi = async() => {
    const response = await axiosInstance.get('api/notifications')
    console.log('response notifcaion api call ->> ', response)
    return response.data
}


export const deleteNotificationApi = async(id: string) => {
    const response = await axiosInstance.delete(`api/notifications?id=${id}`)
    console.log('response ', response)
    return response.data
}