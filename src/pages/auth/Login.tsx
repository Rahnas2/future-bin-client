import Banner from "../../components/common/Banner"
import OAuth from "../../components/OAuth"
import { MdKeyboardArrowRight } from 'react-icons/md'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ThemeProvider } from '@mui/material/styles'
import Input from '../../themes/input';
import React, { useState } from "react";
import { loginSchema, loginSchemaType } from "../../validations/validation";
import { ValidationError } from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { login } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { Link } from "react-router-dom";

const Login = () => {

  const dispatch = useDispatch<AppDispatch>()

  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const [errors, setError] = useState<loginSchemaType>({})

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })

    try {
      await loginSchema.validateAt(name, { ...data, [name]: value })
      setError({ ...errors, [name]: null })
    } catch (error) {
      console.error('error ', error)
      if (error instanceof ValidationError) {
        setError({ ...errors, [name]: error.message })
      }

    }
  }

  const handleSubmit = async () => {
    try {
      //validation 
      await loginSchema.validate(data, { abortEarly: false })

      //clear previous error
      setError({})

      const res = await dispatch(login(data)).unwrap()
      console.log('res ', res)

      toast.success(res.message)


    } catch (error:any) {
      //validation error
      if (error instanceof ValidationError) {

        const ValidationErrors: { [key: string]: string } = {}

        error.inner.forEach(err => {
          if (err.path) {
            console.log('error ', err)
            ValidationErrors[err.path] = err.message
          }

        })
        console.log('validaton errors', ValidationErrors)
        setError(ValidationErrors)
      }else{
        console.error('error ', error)
        error.message && toast.error(error?.message)
      }

    }

  }

  return (
    <div className="xl:grid grid-cols-2">
      <div className="flex flex-col self-center justify-self-center">
        <h1 className='font-bold text-2xl mb-2'>Login to your account</h1>
        <p className='opacity-50 text-sm font-light'>Fill in the details to get started</p>

        {/* social authentication */}
       <GoogleOAuthProvider clientId="3144012594-6hqsjqjc8gf3880dkp3n7vqsicml2as1.apps.googleusercontent.com">
        <OAuth />
        </GoogleOAuthProvider>

        <div className='flex gap-5 items-center justify-around opacity-50 mb-8 w-[80%]'>
          <hr className='w-48' />
          <span>OR</span>
          <hr className='w-48' />
        </div>

        <ThemeProvider theme={Input} >
          <Box
            className='w-full flex flex-col items-center lg:block'
            sx={{ '& > :not(style)': { my: 1.5, width: "80%", } }}
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
            <TextField
              label="Password"
              variant="outlined"
              name="password"
              value={data.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
          </Box>
        </ ThemeProvider>

        <div className="w-[80%] text-end text-sm mt-1 mb-2 text-accent">Forgot password?</div>

        <button onClick={handleSubmit} className='bg-accent w-[80%] mx-1 my-3 py-3 rounded-2xl flex justify-center items-center cursor-pointer'>Sign In&nbsp;&nbsp;<span className=''><MdKeyboardArrowRight className='inline font-bold' /></span></button>
        <div className='w-[80%] text-center'><span className='opacity-50'>Don’t have an account?</span>&nbsp;<Link to="/register" className='text-accent'>Sign up</Link></div>

      </div>
      <Banner />
    </div>
  )
}

export default Login