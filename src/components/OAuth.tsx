import { FaGoogle, FaFacebook } from 'react-icons/fa'
import { MdKeyboardArrowRight } from 'react-icons/md'

import { useGoogleLogin } from '@react-oauth/google'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store'
import { facebookLogin, fbRegister, googleLogin, googleRegister } from '../redux/slices/authSlice'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { LoginButton } from 'react-facebook'
import { initiateSocket } from '@/services/socket'
import { fetchUserProfile } from '@/redux/slices/userSlice'
import { fetchCollectorProfile } from '@/redux/slices/collectorSlice'

type props = {
    mode: 'login' | 'register'
}

const OAuth = (props: props) => {

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()


    //handle google response
    const responseGoogle = async (authResult: any) => {
        try {
            if (authResult["code"]) {

                //login
                if (props.mode === 'login') {
                    const result = await dispatch(googleLogin(authResult.code)).unwrap()

                    //Initialize Socket 
                    initiateSocket()

                    //Fetch User Or Collector Date  
                    if (result.role === 'resident') {
                        await dispatch(fetchUserProfile())
                    } else if (result.role === 'collector') {
                        await dispatch(fetchCollectorProfile())
                        toast.success(result.message)
                        return
                    }
                    toast.success(result.message)
                    return
                }

                //register
                const result = await dispatch(googleRegister(authResult.code)).unwrap()
                toast.success(result.message)
                navigate('/otp-verification', { state: { email: result.email, mode: 'registeration' } })

            } else {
                console.log('response result ', authResult)
                throw new Error(authResult)
            }
        } catch (error: any) {
            console.log('response google error ', error)
            toast.error(error.message)
        }
    }
    const handleGoogleAuth = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: "auth-code"
    })


    //handle facebook response
    const handleSuccessFacebook = async (response: any) => {
        try {
            const userId = response.authResponse.userID
            const accessToken = response.authResponse.accessToken

            //login 
            if (props.mode === 'login') {
                const result = await dispatch(facebookLogin({ userId, accessToken })).unwrap()
                initiateSocket()
                if (result.role === 'resident') {
                    await dispatch(fetchUserProfile())
                } else if (result.role === 'collector') {
                    await dispatch(fetchCollectorProfile())   
                }
                toast.success(result.message)
                return
            }

            //register
            const result = await dispatch(fbRegister({ userId, accessToken })).unwrap()
            navigate('/otp-verification', { state: { email: result.email, mode: 'registeration' } })
            toast.success(result.message)
        } catch (error: any) {
            console.log('error in facebook authentication', error)
            toast.error(error.message)
        }
        console.log('success response', response)
    }
    const handleErrorFacebook = (response: any) => {
        console.error('error response for facebook authenticaion', response)
    }


    return (
        <div className='border rounded-2xl border-gray-600 bg-[hsl(182,56%,11%)] mt-4 mb-8 w-[80%] *:w-full'>

            <div onClick={handleGoogleAuth} className='flex px-4 py-4 border-b border-gray-600 justify-between items-center cursor-pointer'>
                <div className='flex gap-5 items-center'>
                    <span className='text-xl'><FaGoogle className='inline' /></span>
                    <span className='text-lg'>Google</span>
                </div>
                <span className='text-xl'><MdKeyboardArrowRight className='inline' /></span>
            </div>

           
                <LoginButton scope="email" onSuccess={handleSuccessFacebook} onError={handleErrorFacebook} >
                    <div className='flex px-4 py-4  justify-between items-center'>
                        <div className='flex gap-5 items-center'>
                            <span className='text-xl'><FaFacebook className='inline' /></span>
                            <span className='text-lg'>Facebook</span>
                        </div>

                        <span className='text-xl'><MdKeyboardArrowRight className='inline' /></span>
                    </div>
                </LoginButton>
        </div>
    )
}

export default OAuth