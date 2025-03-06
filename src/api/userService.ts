import axiosInstance from "./axiosInstance";

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