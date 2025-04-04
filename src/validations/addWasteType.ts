import { number, object, string } from "yup";


export const addWasteTypeSchema = object({
    name: string().trim().required('required'),
    price: number().typeError('invalid').positive('invalid').required('required')
})