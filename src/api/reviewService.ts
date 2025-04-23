import { reviewType } from "@/types/reviewType";
import axiosInstance from "./axiosInstance";


//Add Review
export const addReviewApi = async(data: Partial<reviewType>) => {
    const response = await axiosInstance.post('/api/reviews', {...data} )
    console.log('api response for post review ', response)
    return response.data
}

//Update Review
export const updateReviewApi = async(data: Partial<reviewType>) => {
    const response = await axiosInstance.put('/api/reviews', {...data})
    console.log('response ', response)
    return response.data
}


//Fetch All Reviews
export const getAllReviewsApi = async() => {
    const response = await axiosInstance.get('/api/reviews')
    console.log('api response for get all reviews ', response)
    return response.data
}

//Fetch All App Reviews
export const getAllAppReviewApi = async() => {
    const response = await axiosInstance.get('/api/reviews/app')
    console.log('api response for all app reviews ', response)
    return response.data
}

//Fetch Single User Review About App
export const getUserReviewAboutAppApi = async() => {
    const response = await axiosInstance.get('/api/reviews/my-review/app')
    console.log('api response for get user review about app ', response)
    return response.data
}

//Fetch User Review About Collector
export const fetchUserReviewWithCollectorIdApi = async (collectorId: string) => {
    const response = await axiosInstance.get(`/api/reviews/my-review/${collectorId}`)
    return response.data
}

//Fetch User Review About Collector
export const getUserReviewsAboutCollectorsApi = async() => {
    const response = await axiosInstance.get('/api/reviews/my-reviews/collectors')
    console.log('api response for get user reviews about collectors ', response)
    return response.data
}

//Fetch Single Collector Reviews
export const getCollectorReviewsApi = async(collectorId: string) => {
    const response = await axiosInstance.get(`/api/reviews/collector/${collectorId}`)
    console.log('api response for get user reviews ', response)
    return response.data
}

//Delete Review
export const deleteReviewApi = async(id: string) => {
    const response = await axiosInstance.delete(`/api/reviews?id=${id}`)
    console.log('api response for delete review ', response)
    return response.data
}