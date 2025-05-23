import { useState } from 'react'
import img1 from '../../assets/hero-img-1.jpg'
import img2 from '../../assets/hero-img-2.jpg'
import OnDemandRequestModal from '../User/OnDemandRequestModal'
import { useSelector } from 'react-redux'
import { IRootState } from '@/redux/slices'
import toast from 'react-hot-toast'

const Hero = () => {

    const {accessToken} = useSelector((state: IRootState) => state.auth)
    // handle on-demand request modal 
    const [isOpen, setIsOpen] = useState(false)


    const handleOpen = () => {
        if(!accessToken) return toast.error('please login to access service')
        setIsOpen(true)
    }

    const handleClose = () => {
        setIsOpen(false)
    }
    
    return (
        <div className='flex md:gap-10 justify-center h-120 md:h-150'>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='text-3xl md:text-4xl font-bold text-center w-full md:w-md md:px-10 mb-3 leading-normal'>Waste is only Waste if we waste it</h1>
                <p className='opacity-50 mb-8'>Be part of the solution not pollution</p>
                <div className=''>
                    <button onClick={handleOpen} className='bg-accent2 text-primary font-bold px-10 py-2 rounded-sm cursor-pointer transform duration-300 ease-in-out hover:scale-105'>Request pickup</button>
                </div>
            </div>
            <div>
                <img className='hidden lg:block h-150' src={img1} alt="" />
            </div>
            <div>
                <img className='hidden xl:block h-150' src={img2} alt="" />
            </div>

            {/* on-demand request modal  */}
            {isOpen && <OnDemandRequestModal onClose={handleClose}/>}
        </div>
    )
}

export default Hero