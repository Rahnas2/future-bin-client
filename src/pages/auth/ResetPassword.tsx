import { Box, ThemeProvider } from '@mui/material'
import React, { useState } from 'react'
import Input from '../../themes/input'
import { changePasswordType, passwordSchema } from '../../validations/validation'
import { ValidationError } from 'yup'
import { resetPasswordApi } from '../../api/authService'
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import PasswordField from '../../components/common/PasswordField'


const ResetPassword = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const { email } = location.state

    const [data, setData] = useState({
        newPassword: "",
        confirmPassword: ""
    })

    const [errors, setErrors] = useState<Partial<changePasswordType>>()

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setData({ ...data, [name]: value })

        try {
            await passwordSchema.validateAt(name, { ...data, [name]: value })
            setErrors({ ...errors, [name]: null })

        } catch (error) {

            if (error instanceof ValidationError) {
                setErrors({ ...errors, [name]: error.message })
            }
        }
    }

    const handleSubmit = async () => {
        try {
            await passwordSchema.validate(data, { abortEarly: false })
            setErrors({})

            const result = await resetPasswordApi(email, data.newPassword)
            toast.success(result.message)
            navigate('/login')
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
            console.log('error ', error)
        }
    }
    return (
        <div className='flex flex-col items-center mt-32 mb-8 '>
            <div className='font-bold text-2xl mb-12'>RESET PASSWORD</div>
            <ThemeProvider theme={Input}>
                <Box
                    sx={{ display: "flex", gap: 2 }}>

                    <PasswordField label="New Password"
                        name='newPassword'
                        value={data.newPassword}
                        onChange={handleChange}
                        error={!!errors?.newPassword}
                        helperText={errors?.newPassword}
                    />

                    <PasswordField label="Confirm Password"
                        name='confirmPassword'
                        value={data.confirmPassword}
                        onChange={handleChange}
                        error={!!errors?.confirmPassword}
                        helperText={errors?.confirmPassword}
                    />

                </Box>
            </ ThemeProvider>

            <div className='flex justify-center mt-8'>
                <span onClick={handleSubmit} className='bg-accent rounded-md px-6 py-1 cursor-pointer'>Submit</span>
            </div>

        </div>
    )
}

export default ResetPassword