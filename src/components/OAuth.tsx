import { FaGoogle, FaFacebook } from 'react-icons/fa'
import { MdKeyboardArrowRight } from 'react-icons/md'

import { useGoogleLogin } from '@react-oauth/google'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store'
import { googleLogin } from '../redux/slices/authSlice'

const OAuth = () => {

    const dispatch = useDispatch<AppDispatch>()

    const responseGoogle = async (authResult: any) => {
        try {
            if(authResult["code"]) {
                const result = await dispatch(googleLogin(authResult.code)).unwrap()
            }else{
                console.log('response result ', authResult)
                throw new Error(authResult)
            }
        } catch (error) {
            console.log('response google error ', error)
        }
    }

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: "auth-code",
    })

    return (
        <div className='border rounded-2xl border-gray-600 bg-[hsl(182,56%,11%)] mt-4 mb-8 w-[80%]'>
            
            <div onClick={handleGoogleLogin} className='flex px-4 py-4 border-b border-gray-600 justify-between items-center cursor-pointer'>
                <div  className='flex gap-5 items-center'>
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
    )
}

export default OAuth