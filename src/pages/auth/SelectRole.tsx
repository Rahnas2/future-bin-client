
import { MdKeyboardArrowLeft } from 'react-icons/md'

import Logo from '../../assets/logo (1).png'
import Resident from '../../assets/role-resident.png'
import Collector from '../../assets/role-collector-main.png'
import { Link } from 'react-router-dom'

const SelectRole = () => {
    return (
        <>
            <div className='mt-6 ml-6'><MdKeyboardArrowLeft className='inline text-4xl text-accent' />&nbsp;&nbsp;Back</div>
            <div className='flex justify-center items-center '><img src={Logo} className='w-36' alt="" /></div>
            <div className='flex w-[80%] lg:w-[70%] justify-self-center flex-col'>
                <h1 className='opacity-50 font-bold text-xl lg:text-2xl'>Explore As</h1>
                <div  className="flex w-full justify-between flex-col lg:flex-row mt-5">
                    <Link to="/complete-profile" className="w-sm relative mb-8">
                        <img src={Resident} alt="Resident" className="rounded-xl" />
                        <div className="absolute inset-0 flex top-10 justify-center">
                            <span className="font-passero text-primary text-2xl font-bold">
                                Resident
                            </span>
                        </div>
                    </Link>

                    <Link to="/complete-profile" className="w-sm relative mb-8">
                        <img src={Collector} alt="Collector" className="rounded-xl" />
                        <div className="absolute inset-0 flex top-10 justify-center">
                            <span className="font-passero text-primary text-2xl font-bold">
                                Waste Collector
                            </span>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default SelectRole