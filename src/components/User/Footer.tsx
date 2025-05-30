import {  Mail, Phone } from 'lucide-react'
import brand from '../../assets/logo (1).png'
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className="bg-seconday  flex flex-col -mx-8">
        <div className='flex justify-center'>
            <img className='w-35' src={brand} alt="brand icon" />
        </div>

        <p className='opacity-50 text-center text-sm -mt-8 px-8'>Comprehensive waste management solutions for residential, commercial, and industrial needs</p>

        <div className='flex md:gap-80 justify-around  md:justify-normal mt-15 text-sm  md:px-50 '>
                <div className='flex flex-col gap-5'>
                    <h3 className='text-accent font-bold md:text-lg'>Quick Links</h3>
                    <span className='cursor-pointer transform duration-300 hover:text-accent3'>Home</span>
                    <span className='cursor-pointer transform duration-300 hover:text-accent3'>About Us</span>
                    <span className='cursor-pointer transform duration-300 hover:text-accent3'>Subscrption Plans</span>
                </div>
            <div className='flex flex-col gap-5'>
                <div className='flex flex-col gap-5'>
                    <h3 className='text-accent font-bold md:text-lg'>Connect with  Us</h3>
                    <div className='flex gap-5'>
                    <FaInstagram className='w-4 h-4 cursor-pointer transform duration-300 hover:scale-120'/>
                    <FaFacebook className='w-4 h-4 cursor-pointer transform duration-300 hover:scale-120'/>
                    <FaYoutube className='w-4 h-4 cursor-pointer transform duration-300 hover:scale-120'/>
                    </div>
                </div>
                <div className='flex flex-col gap-5'>
                    <h3 className='text-accent font-bold md:text-lg'>Contact Us</h3>
                    <a href='#' className='transform duration-300 hover:text-accent3'><Mail className='inline w-4 h-4 mr-2' /><span className='opacity-50'>futurebin@gmail.com</span></a>
                    <a href="#" className='transform duration-300 hover:text-accent3'><Phone className='inline w-4 h-4 mr-2'/><span className='opacity-50'>+91 8989898989</span></a>
                </div>
            </div>
        </div>

        <div className='text-center opacity-50 text-sm mt-10 mb-6'>© Brand Name. All right reserved</div>
    </div>
  )
}

export default Footer