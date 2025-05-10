import { object, string, number } from 'yup'

export interface subscriptionSchemaType {
    name: string,
    price: string,
    description: string,
    frequency: string,
    totalPickups: number,
    features?: string []
}
export const subscriptionSchema = object({
    name: string().trim().required('required'),
    price: number().typeError('invalid').positive('invalid').required('required'),
    description: string().trim().required('required'),
    frequency: string().trim().required('required'),
    totalPickups: number().typeError('total pickups must be a number').min(1, 'total pickups must be greater than 0').required('required')
})