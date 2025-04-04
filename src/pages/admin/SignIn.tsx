import Banner from "../../components/common/Banner"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ThemeProvider } from '@mui/material/styles'
import Input from '../../themes/input';

import { MdKeyboardArrowRight } from 'react-icons/md'
import { useState } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../redux/store";
import { adminLogin } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { adminLoginSchema, adminLoginSchemaType } from "../../validations/validation";
import { ValidationError } from "yup";
import toast from "react-hot-toast";
import PasswordField from "../../components/common/PasswordField";

function SignIn() {

  const dispatch = useDispatch<AppDispatch>()

  const navigate = useNavigate()

  const [data, setData] = useState({
    email: '',
    password: '',
    secret: ''
  })

  const [errors, setError] = useState<adminLoginSchemaType>({})

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })

    try {
          await adminLoginSchema.validateAt(name, { ...data, [name]: value })
          setError({ ...errors, [name]: null })
        } catch (error) {
          if (error instanceof ValidationError) {
            setError({ ...errors, [name]: error.message })
          }
        }
  }

  const handleSubmit = async () => {
    try {

      //validation
      await adminLoginSchema.validate(data, {abortEarly: false})

      setError({})

      const result = await dispatch(adminLogin(data)).unwrap()
      console.log('reuslt ', result)
      toast.success('success')

      navigate('/admin/dashboard', {replace: true})
    } catch (error: any) {
      if (error instanceof ValidationError) {

        const ValidationErrors: { [key: string]: string } = {}

        error.inner.forEach(err => {
          if (err.path) {
            ValidationErrors[err.path] = err.message
          }
        })
        setError(ValidationErrors)
      }else{
        console.error('error admin login ', error)
        error.message && toast.error(error?.message)
      }
    }
    
  }
  return (
    <div className="xl:grid grid-cols-2">
      <div className="flex flex-col self-center justify-self-center ">
        <h1 className='font-bold text-2xl mb-2'>Login to your account</h1>
        <p className='opacity-50 text-sm font-light mb-8'>Fill in the details to get started</p>

        <ThemeProvider theme={Input} >
          <Box
            className='w-sm flex flex-col items-center lg:block'
            sx={{ '& > :not(style)': { my: 1, width: "80%", } }}
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

            <TextField
              label="secret"
              variant="outlined"
              name="secret"
              value={data.secret}
            onChange={handleChange}
            error={!!errors.secret}
            helperText={errors.secret}
            />

          </Box>
        </ ThemeProvider>

        <button onClick={handleSubmit} className='bg-accent w-[80%] text-center mx-1 my-3 py-3 rounded-2xl flex justify-center items-center cursor-pointer'>Sign In&nbsp;&nbsp;<span className=''><MdKeyboardArrowRight className='inline font-bold' /></span></button>
      </div>
      <Banner />
    </div>
  )
}

export default SignIn