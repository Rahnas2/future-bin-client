import { TextField, ThemeProvider } from '@mui/material'
import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import Input from '../../themes/input'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { forgotPasswordApi } from '../../api/authService'
import { useNavigate } from 'react-router-dom'

type Props = {
    onClose: () => void
}

const ForgotPasswordModal = (props: Props) => {

    const navigate = useNavigate()
    const [email, setEmail] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleSubmit = async() => {
        try {
            await forgotPasswordApi(email)
            navigate('/otp-verification', { state: { email: email, mode: 'forgot-password' } })
        } catch (error) {
            console.log('error ')
        }
    }


    return (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center">
            <div className="w-sm bg-primary border border-gray-500 px-3 py-3 rounded-lg">
                <div onClick={props.onClose} className="font-bold text-end text-accent2 cursor-pointer"><IoMdClose className="inline" /></div>
                <div className='px-8 py-4'>
                    <ThemeProvider theme={Input}>
                        <TextField label="Enter your email"
                            name='email'
                            value={email}
                            onChange={handleChange}
                            fullWidth
                        />
                    </ThemeProvider>

                    <div className='flex justify-center mt-5'>
                        <span onClick={handleSubmit} className='bg-accent px-5 py-2 rounded-xl flex justify-center items-center cursor-pointer'>continue&nbsp;&nbsp;
                            <span className=''><MdKeyboardArrowRight className='inline font-bold' /></span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPasswordModal