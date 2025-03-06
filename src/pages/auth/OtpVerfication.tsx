import React, { useRef, useState, KeyboardEvent, useEffect } from 'react'
import { useDispatch } from 'react-redux';

import { useLocation, useNavigate } from 'react-router-dom'
import { AppDispatch } from '../../redux/store';
import { sendOtp, verifyOtp } from '../../redux/slices/authSlice';
import toast from 'react-hot-toast';




const OtpVerfication = () => {

    const location = useLocation()

    const navigate = useNavigate()

    const { email } = location.state

    const [otp, setOtp] = useState(Array(6).fill(""))

    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    const dispatch = useDispatch<AppDispatch>()

    const [isResent, setIsResent] = useState(false)
    const [timer, setTimer] = useState(20);

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
        try {
            await dispatch(sendOtp(email)).unwrap()
            toast.success('new otp sended')
            setIsResent(false);
            setTimer(20);
        } catch (error) {
            console.error('error resending otp ', error)
        }

    }

    //verify otp 
    const handleVerfiy = async () => {
        try {
            await dispatch(verifyOtp({ email: email, otp: otp.join('') })).unwrap()
            navigate('/select-role', { state: { email: email } })
        } catch (error: any) {
            error.message && toast.error(error.message)
            console.log('error ', error)
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
                    <button onClick={handleVerfiy} className='bg-accent py-2 px-8 rounded-lg cursor-pointer'>Verify</button>
                </div>
            </div>
            <div className='lg:w-1/2 xl:w-3/5 text-center'>
                <span className='opacity-50'>Didn't receive the OTP?</span>&nbsp;
                <span aria-disabled={!isResent} onClick={isResent ? handleResentOtp : undefined} className={`${isResent ? "opacity-100 cursor-pointer" : "text-accent2"}`}>{isResent ? "  Resend OTP" : `  ${timer}`}</span>
                
            </div>
        </>
    )
}

export default OtpVerfication