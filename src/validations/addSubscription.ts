import { object, string, ref, mixed, array, number } from 'yup'

export interface subscriptionSchemaType {
    name: string,
    price: string,
    description: string,
    features?: string []
}
export const subscriptionSchema = object({
    name: string().trim().required('required'),
    price: number().typeError('invalid').positive('invalid').required('required'),
    description: string().trim().required('required')
})