

import { useLottie } from "lottie-react";
import SuccessAnimation from '../../../animations/payment-success-animation.json'
import FaildAnimation from '../../../animations/payment-faild-animation.json'
import { useLocation, useNavigate } from 'react-router-dom';


type Props = {}

const PaymentStatus = (props: Props) => {

    const navigate = useNavigate()

    const successOption = {
        animationData: SuccessAnimation,
        loop: false,
        height: 50,
        width: 50
    }
    const failedOption = {
        animationData: FaildAnimation,
        loop: true
    }
    const successAnimation = useLottie(successOption);
    const failedAnimation = useLottie(failedOption);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const redirectStatus = queryParams.get('success');


  return (
    <div className='flex flex-col items-center justify-center h-screen overflow-hidden'>
        {
            redirectStatus === 'true' ? 
            <div className='w-md '>{successAnimation.View}</div> :
            <div className='w-md'>{failedAnimation.View}</div>
        }
        <button onClick={() => navigate('/', {replace: true})} className='bg-accent shadow-2xl px-4 py-1 rounded-sm cursor-pointer'>continue</button>  
    </div>
  )
}

export default PaymentStatus