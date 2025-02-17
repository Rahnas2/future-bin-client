import authBanner from '../../assets/auth-img-1.jpg'

import { MdKeyboardArrowRight } from 'react-icons/md'
import { FaGoogle, FaFacebook } from 'react-icons/fa'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ThemeProvider } from '@mui/material/styles'
import Input from '../../themes/input';
import { Link } from 'react-router-dom';


const Register = () => {
    return (
        <div className="xl:grid grid-cols-2">
            {/* left section */}
            <div className="py-9 flex flex-col items-center xl:block xl:px-20 ">
                <h1 className='font-bold text-2xl mb-2'>Create a new account</h1>
                <p className='opacity-50 text-sm font-light'>Fill in the details to get started</p>

                {/* google authentication */}
                <div className='border rounded-2xl border-gray-600 bg-[hsl(182,56%,11%)] mt-4 mb-8 w-[80%]'>
                    <div className='flex px-4 py-4 border-b border-gray-600 justify-between items-center'>
                        <div className='flex gap-5 items-center'>
                            <span className='text-xl'><FaGoogle className='inline' /></span>
                            <span className='text-lg'>Google</span>
                        </div>

                        <span className='text-xl'><MdKeyboardArrowRight className='inline' /></span>
                    </div>
                    <div className='flex px-4 py-4  justify-between items-center'>
                        <div className='flex gap-5 items-center'>
                            <span className='text-xl'><FaFacebook className='inline' /></span>
                            <span className='text-lg'>Facebook</span>
                        </div>

                        <span className='text-xl'><MdKeyboardArrowRight className='inline' /></span>
                    </div>
                </div>

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
                            sx={{ '& > :not(style)': { mb: 1, mr:2, width: '38.5%',  } }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="outlined-basic" label="First name" variant="outlined"  />
                            <TextField id="outlined-basic" label="Last name" variant="outlined"  />
                        </Box>

                        <Box
                        className='w-full flex flex-col items-center lg:block' 
                        component="form"
                        sx={{ '& > :not(style)': { my: 1, width: "80%",  } }}
                        noValidate
                        autoComplete="off"
                        >
                            <TextField id="outlined-basic" label="Email" variant="outlined"  />
                            <TextField label="Password" variant="outlined" />
                            <TextField label="Confirm Password" variant="outlined" />
                        </Box>
                    </ThemeProvider>
                    <Link to="/otp-verification" className='bg-accent w-[80%] mx-1 my-3 py-3 rounded-2xl flex justify-center items-center'>Continue&nbsp;&nbsp;<span className=''><MdKeyboardArrowRight className='inline font-bold'/></span></Link>
                    <div className='w-[80%] text-center mt-6'><span className='opacity-50'>Already have an account ?</span>&nbsp;<Link to="/select-role" className='text-accent font-bold'>Sign In</Link></div>
                </div>
            </div>
            {/* right section */}
            <div className='hidden xl:block'>
                <img className='h-full' src={authBanner} alt="" />
            </div>
        </div>
    )
}

export default Register