import { useRef, useState, KeyboardEvent, useEffect } from 'react'
import { useDispatch } from 'react-redux';

import { useLocation, useNavigate } from 'react-router-dom'
import { AppDispatch } from '../../redux/store';
import { sendOtp, verifyOtp } from '../../redux/slices/authSlice';
import toast from 'react-hot-toast';
import ButtonSpinner from '@/components/common/ButtonSpinner';
import { scheduledPickupCompletedApi } from '@/api/scheduledPickups';




const OtpVerfication = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const { email, mode, id } = location.state

    const [otp, setOtp] = useState(Array(6).fill(""))

    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    const dispatch = useDispatch<AppDispatch>()

    const [isResent, setIsResent] = useState(false)
    const [timer, setTimer] = useState(20);

    //to show loader and disable button after submit verify
    const [isLoading, setIsLoading] = useState(false)

    // Add loading state for resend button
    const [isResendingOtp, setIsResendingOtp] = useState(false)

    useEffect(() => {
        let interval: any;
        if (!isResent) {
            interval = setInterval(() => {
                setTimer(prev => {
                    if (prev === 1) {
                        clearInterval(interval);
                        setIsResent(true);
                        return 20
                    }
                    return prev - 1
                });
            }, 1000);
        }
        return () => clearInterval(interval)
    }, [isResent]);


    //for handle input change
    const handleChange = (index: number, value: string) => {
        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        //move to next input if value is entered 
        if (value && index < 5 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }
    }

    //for handle key down
    const handleKeyDown = (index: number, e: KeyboardEvent) => {
        if (e.key === 'Backspace') {
            if (!otp[index] && index > 0) {
                const newOtp = [...otp]
                otp[index - 1] = ''
                setOtp(newOtp)
                inputRefs.current[index - 1]?.focus()
            } else {
                const newOtp = [...otp]
                newOtp[index] = ''
                setOtp(newOtp)
            }
        }
    }


    //resent otp 
    const handleResentOtp = async () => {
        if (isResendingOtp) return; 
        try {
            setIsResendingOtp(true);
            await dispatch(sendOtp(email)).unwrap()
            toast.success('New OTP sent')
            setIsResent(false);
            setTimer(20);
        } catch (error) {
            console.error('error resending otp ', error)
            toast.error('Failed to resend OTP')
        } finally {
            setIsResendingOtp(false);
        }

    }

    //verify otp 
    const handleVerfiy = async () => {
        try {
            setIsLoading(true)

            await dispatch(verifyOtp({ email: email, otp: otp.join('') })).unwrap()

            if (mode === 'forgot-password') {
                navigate('/reset-password', { state: { email: email } })
                return
            }

            if (mode === 'registeration') {
                navigate('/select-role', { state: { email: email } })
                return
            }

            if (mode === 'completed-request') {
                navigate('/collector/dashboard')
                return
            }

            if(mode === 'on-demand-completed') {
                navigate('/collector/request/on-demand/complete', { state: { requestId: id }, replace: true} )
                return 
            }

            if(mode === 'scheduled-pickup-completed'){
                await scheduledPickupCompletedApi(id)
                navigate(-1)
                toast.success('success')
                return 
            }


        } catch (error: any) {
            error.message && toast.error(error.message)
            console.log('error otp verification ', error)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <>
            <div className='flex flex-col items-center mt-32 mb-8 '>
                <div className='font-bold text-2xl mb-12'>OTP VERIFICATION</div>
                <div className='mb-8 text-sm  text-center'>{`A One-Time Password (OTP) has been sent to your registered email ${email} . Please enter the 6-digit code below to proceed.`}</div>
                <div className='flex gap-4 mb-8'>
                    {otp.map((value, index) => (
                        <input
                            key={index}
                            ref={(element) => {
                                inputRefs.current[index] = element
                            }}
                            type="text"
                            value={value}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className='outline-0 border-b w-10 border-accent2 text-center font-bold'
                            maxLength={1}
                        />
                    ))}
                </div>
                <div>
                    <button onClick={handleVerfiy} className='bg-accent py-2 px-8 rounded-lg cursor-pointer'>
                        {isLoading ? <ButtonSpinner /> :
                            <div>Verify</div>
                        }
                    </button>
                </div>
            </div>
            <div className='lg:w-1/2 xl:w-3/5 flex justify-center items-center'>
                <span className='opacity-50'>Didn't receive the OTP?</span>&nbsp;
                <button 
                    disabled={!isResent || isResendingOtp} 
                    onClick={isResent && !isResendingOtp ? handleResentOtp : undefined} 
                    className={`${isResent && !isResendingOtp ? "opacity-100 cursor-pointer" : "text-accent2 cursor-not-allowed"}`}
                >
                    {isResendingOtp ? <ButtonSpinner /> : isResent ? "  Resend OTP" : `  ${timer}`}
                </button>
            </div>
        </>
    )
}

export default OtpVerfication