import { reviewType } from "@/types/reviewType";
import axiosInstance from "./axiosInstance";

export const addReviewApi = async(data: Partial<reviewType>) => {
    const response = await axiosInstance.post('/api/reviews', {...data} )
    console.log('api response for post review ', response)
    return response.data
}

export const updateReviewApi = async(data: Partial<reviewType>) => {
    const response = await axiosInstance.put('/api/reviews', {...data})
    console.log('response ', response)
    return response.data
}

export const getAllReviewsApi = async() => {
    const response = await axiosInstance.get('/api/reviews')
    console.log('api response for get all reviews ', response)
    return response.data
}

export const getAllAppReviewApi = async() => {
    const response = await axiosInstance.get('/api/reviews/app')
    console.log('api response for all app reviews ', response)
    return response.data
}

export const getUserReviewAboutAppApi = async() => {
    const response = await axiosInstance.get('/api/reviews/my-review/app')
    console.log('api response for get user review about app ', response)
    return response.data
}

export const fetchUserReviewWithCollectorIdApi = async (collectorId: string) => {
    const response = await axiosInstance.get(`/api/reviews/my-review/${collectorId}`)
    return response.data
}


export const getUserReviewsAboutCollectorsApi = async() => {
    const response = await axiosInstance.get('/api/reviews/my-reviews/collectors')
    console.log('api response for get user reviews about collectors ', response)
    return response.data
}

export const getCollectorReviewsApi = async(collectorId: string) => {
    const response = await axiosInstance.get(`/api/reviews/collector/${collectorId}`)
    console.log('api response for get user reviews ', response)
    return response.data
}

export const deleteReviewApi = async(id: string) => {
    const response = await axiosInstance.delete(`/api/reviews?id=${id}`)
    console.log('api response for delete review ', response)
    return response.data
}