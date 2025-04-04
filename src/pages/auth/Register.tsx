
import { MdKeyboardArrowRight } from 'react-icons/md'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ThemeProvider } from '@mui/material/styles'
import Input from '../../themes/input';

import { useState, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { basicInfo, sendOtp } from '../../redux/slices/authSlice';
import { AppDispatch } from '../../redux/store';

import { string, ValidationError } from 'yup';
import { basicInfoSchema } from '../../validations/validation';
import { basicInfoSchemaType } from '../../validations/validation';
import Banner from '../../components/common/Banner';
import OAuth from '../../components/OAuth';
import { GoogleOAuthProvider } from '@react-oauth/google';
import toast from 'react-hot-toast';
import PasswordField from '../../components/common/PasswordField';


const Register = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch<AppDispatch>()

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [errors, setError] = useState<basicInfoSchemaType>({})

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData(prevData => {
            return { ...prevData, [name]: value }
        })

        try {
            await basicInfoSchema.validateAt(name, { ...data, [name]: value })

            setError(prevError => ({
                ...prevError,
                [name]: null
            }))
        } catch (error) {
            if (error instanceof ValidationError) {
                setError(prevError => ({
                    ...prevError,
                    [name]: error.message
                }))
            }
        }
    }

    const handleSubmit = async () => {
        try {
            //validation 
            await basicInfoSchema.validate(data, { abortEarly: false })

            //clear previous errors
            setError({})

            const { confirmPassword, ...userData } = data

            await dispatch(basicInfo(userData)).unwrap()

            navigate('/otp-verification', { state: { email: data.email } })
        } catch (error:any) {

            //validation errors 
            if (error instanceof ValidationError) {
                const ValidationErrors: { [key: string]: string } = {};
                error.inner.forEach(err => {
                    if (err.path) {
                        ValidationErrors[err.path] = err.message
                    }
                })
                setError(ValidationErrors)
            }

            error.message && toast.error(error.message)
            console.log('basic info error ', error)
        }
    }

    return (
        <div className="xl:grid grid-cols-2 ">
            {/* left section */}
            <div className="py-9 flex flex-col items-center xl:block xl:px-20 ">
                <h1 className='font-bold text-2xl mb-2'>Create a new account</h1>
                <p className='opacity-50 text-sm font-light'>Fill in the details to get started</p>

                {/* social authentication */}
                <GoogleOAuthProvider clientId="3144012594-6hqsjqjc8gf3880dkp3n7vqsicml2as1.apps.googleusercontent.com" >
                    <OAuth mode='register' />
                </GoogleOAuthProvider>


                <div className='flex gap-5 items-center justify-around opacity-50 mb-8 w-[80%]'>
                    <hr className='w-48' />
                    <span>OR</span>
                    <hr className='w-48' />
                </div>

                <div className='flex flex-col items-center lg:block'>
                    <ThemeProvider theme={Input}>
                        <Box
                            className='flex justify-center lg:block'
                            component="form"
                            sx={{ '& > :not(style)': { mb: 1, mr: 2, width: '38.5%', } }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="outlined-basic"
                                label="First name"
                                variant="outlined"
                                name="firstName"
                                value={data.firstName}
                                onChange={handleChange}
                                error={!!errors.firstName}
                                helperText={errors.firstName}
                            />

                            <TextField id="outlined-basic"
                                label="Last name"
                                variant="outlined"
                                name='lastName'
                                value={data.lastName}
                                onChange={handleChange}
                                error={!!errors.lastName}
                                helperText={errors.lastName}
                            />
                        </Box>

                        <Box
                            className='w-full flex flex-col items-center lg:block'
                            component="form"
                            sx={{ '& > :not(style)': { my: 1, width: "80%", } }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                            <PasswordField
                                label="Password"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                error={!!errors.password}
                                helperText={errors.password}
                            />
                            <PasswordField
                                label="Confirm Password"
                                name="confirmPassword"
                                value={data.confirmPassword}
                                onChange={handleChange}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword}
                            />
                        </Box>
                    </ThemeProvider>
                    <button onClick={handleSubmit} className='bg-accent w-[80%] mx-1 my-3 py-3 rounded-2xl flex justify-center items-center cursor-pointer'>Continue&nbsp;&nbsp;<span className=''><MdKeyboardArrowRight className='inline font-bold' /></span></button>
                    <div className='w-[80%] text-center mt-6'><span className='opacity-50'>Already have an account ?</span>&nbsp;<Link to="/login" className='text-accent font-bold cursor-pointer'>Sign In</Link></div>
                </div>
            </div>
            {/* right section */}
            <Banner />
        </div>
    )
}

export default Register