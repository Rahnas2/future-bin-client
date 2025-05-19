import { Box, ThemeProvider } from '@mui/material'
import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import Input from '../../themes/input'
import { changePasswordApi } from '../../api/userService'
import toast from 'react-hot-toast'
import { changePasswordSchema, changePasswordType } from '../../validations/validation'
import { ValidationError } from 'yup'
import PasswordField from './PasswordField'

type Props = {
    onClose: () => void
}

const ChangePasswordModal = (props: Props) => {

    const [data, setData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    })

    const [errors, setErrors] = useState<Partial<changePasswordType>>()

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setData({ ...data, [name]: value })

        try {
            await changePasswordSchema.validateAt(name, { ...data, [name]: value })
            setErrors({ ...errors, [name]: null })

        } catch (error) {

            if (error instanceof ValidationError) {
                setErrors({ ...errors, [name]: error.message })
            }
        }
    }

    const handleSubmit = async () => {
        try {

            await changePasswordSchema.validate(data, { abortEarly: false })
            setErrors({})

            const result = await changePasswordApi(data.currentPassword, data.newPassword)
            props.onClose()
            toast.success(result.message)
        } catch (error: any) {

            if (error instanceof ValidationError) {
                const ValidationErrors: { [key: string]: string } = {}
                error.inner.forEach(err => {
                    if (err.path) {
                        ValidationErrors[err.path] = err.message
                    }
                })
                setErrors(ValidationErrors)
                return
            }
            console.error('error submit password ', error)
            error?.response?.data.message && toast.error(error.response.data.message)
        }
    }
    return (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center">
            <div className="w-xs bg-primary border border-gray-700 px-3 py-3 rounded-md">
                <div onClick={props.onClose} className="font-bold text-end text-accent2 cursor-pointer"><IoMdClose className="inline" /></div>
                <div className='px-8 py-4'>
                    <ThemeProvider theme={Input}>
                        <Box
                            sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
                            <PasswordField label="Current Password"
                                name='currentPassword'
                                value={data.currentPassword}
                                onChange={handleChange}
                                error={!!errors?.currentPassword}
                                helperText={errors?.currentPassword}
                                // size='medium'
                            />

                            <PasswordField label="New Password"
                                name='newPassword'
                                value={data.newPassword}
                                onChange={handleChange}
                                error={!!errors?.newPassword}
                                helperText={errors?.newPassword}
                                // size='medium'
                            />

                            <PasswordField label="Confirm Password"
                                name='confirmPassword'
                                value={data.confirmPassword}
                                onChange={handleChange}
                                error={!!errors?.confirmPassword}
                                helperText={errors?.confirmPassword}
                                // size='medium'
                            />

                        </Box>
                    </ ThemeProvider>

                    <div className='flex justify-center mt-8'>
                        <span onClick={handleSubmit} className='bg-accent rounded-md px-6 py-1 cursor-pointer'>Submit</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePasswordModal