import React from 'react'
import { TiTick } from 'react-icons/ti'

type Props = {}

const SubCard = (props: Props) => {
    return (
        <div className='px-6 py-8 w-sm bg-linear-to-br from-accent from-20% via-[#0D7247] via-43% to-[#06753E] to-74% rounded-3xl'>
            <div className='font-bold text-2xl mb-10 uppercase'>Monthly Plan</div>
            <div className='text-xl'>
                <span className='font-bold mr-3'>₹ 50</span>
                <span className='text-primary'>Per Month</span>
            </div>
            <div className='text-primary text-sm mb-8'>We collect your waste every month on your preferred day</div>

            <div className='text-center mb-12'>
                <span className='px-10 py-2 bg-primary rounded-3xl'>Get Subsciption</span>
            </div>

            <div className='uppercase font-bold mb-5'>Features</div>
            <div className='flex flex-col gap-3 [&>*]:flex [&>*]:gap-2'>
                <div>
                    <span><TiTick className='inline text-primary' /></span>
                    <span>Solid Waste</span>
                </div>
                <div>
                    <span><TiTick className='inline text-primary' /></span>
                    <span>Hazardous Waste</span>
                </div>
                <div>
                    <span><TiTick className='inline text-primary' /></span>
                    <span>E-Waste</span>
                </div>
                <div>
                    <span><TiTick className='inline text-primary' /></span>
                    <span>Biomedical Waste</span>
                </div>
                <div>
                    <span><TiTick className='inline text-primary' /></span>
                    <span>Free up to 50 kg of additional waste per month</span>
                </div>

            </div>
        </div>
    )
}

export default SubCard