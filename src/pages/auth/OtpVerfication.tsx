import React, { useState } from 'react'

import { Link } from 'react-router-dom'



const OtpVerfication = () => {
    const [otp, setOtp] = useState(Array(6).fill(""))
  return (
    <>
    <div className='flex flex-col items-center mt-32 mb-8'>
        <div className='font-bold text-2xl mb-12'>OTP VERIFICATION</div>
        <div className='mb-8 text-sm  text-center'>A One-Time Password (OTP) has been sent to your registered email rahnas@gmail.com . Please enter the 6-digit code below to proceed.</div>
        <div className='flex gap-4 mb-8'>
            {otp.map((_,index) =>(
                <input 
                key={index}
                type="text"
                className='border-b w-10 border-accent2'
                 />
            ))}
        </div>
        <div>
            <Link to="/select-role" className='bg-accent py-2 px-8 rounded-lg'>Verify</Link>
        </div>
    </div>
    <div className='lg:w-1/2 xl:w-3/5 text-center'>
        <span className='opacity-50'>Didn't receive the OTP?</span>&nbsp;
        <span>Resent OTP</span>
    </div>
    </>
  )
}

export default OtpVerfication