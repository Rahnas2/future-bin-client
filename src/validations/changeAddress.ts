import { object, string } from "yup";

export const changeAddressSchema = object({
    name: string().trim().required('required'),
    address: object({
            street: string().trim().required('Street address is required'),
            houseNo: string().trim().required('House number is required'),
            district: string().trim().required('District is required'),
            city: string().trim().required('City is required'),
            pincode: string().trim()
                .required('Pincode is required')
                .matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits')
        }),
        mobile: string().trim()
                .required('Mobile number is required')
                .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits'),
})