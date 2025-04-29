import React from 'react'
import { MdLoop } from 'react-icons/md'
import { TiTick } from 'react-icons/ti'
import img from '../../assets/brand-img-.jpeg'

type Props = {}

const AboutUs = (props: Props) => {
    return (
        <div className='px-5'>
            <div className='uppercase text-center text-xl font-bold mb-5 lg-mb-0'>About future bin</div>

            <div className='flex flex-col lg:flex-row gap-10 items-center mb-20'>
                <img className='w-3xs' src={img} alt="" />
                <div className='[&>*]:mb-3'>
                    <div className='font-bold'>Who we are ?</div>
                    <p className='opacity-50  !mb-5'>FutureBin is a technology-driven waste management company that goes beyond just collection. We transform waste into valuable, sustainable products—helping both the environment and the economy.</p>

                    <div className='font-bold'>Our goal ?</div>
                    <p className='opacity-50'>To create a cleaner world by ensuring zero waste goes to landfills and instead is repurposed into eco-friendly products.</p>
                </div>
            </div>

            {/* what we do */}
            <div className='text-center text-lg font-medium mb-15'>♻️ What We Do? (Our Process)</div>

            <div className='flex flex-col lg:flex-row items-center gap-10 justify-evenly'>

                {/* left */}
                <div className='flex flex-col gap-10 [&>*]:lg- [&>*]:w-fit [&>*]:lg:w-md [&>*]:px-8 [&>*]:py-6 [&>*]:bg-accent [&>*]:rounded-md'>

                    <div>
                        <div className='text-2xl font-bold mb-6'>Smart Waste Collection</div>

                        <div className='mb-5'>Users can subscribe for regular waste collection or schedule on-demand pickups.</div>
                        <div>Waste collectors are assigned automatically based on location.</div>

                    </div>

                    <div>
                        <div className='text-2xl font-bold mb-6'>Waste to Product Innovation</div>
                        <div>
                            <div className='mb-3'>We use advanced recycling techniques to create:</div>
                            <ul className='[&>*]:mb-2'>
                                <li><TiTick className='inline text-primary' />&nbsp;&nbsp;Eco-friendly Packaging Materials</li>
                                <li><TiTick className='inline text-primary' />&nbsp;&nbsp;Recycled Plastic & Paper Products</li>
                                <li><TiTick className='inline text-primary' />&nbsp;&nbsp;Organic Compost & Fertilizers</li>
                                <li><TiTick className='inline text-primary' />&nbsp;&nbsp;Upcycled Home & Office Goods</li>
                            </ul>
                        </div>
                    </div>

                </div>

                {/* middle */}
                <div className='text-accent2 text-8xl  '><MdLoop className='inline' /></div>

                {/* right */}
                <div className='flex flex-col gap-10 [&>*]:lg:h-60 [&>*]:w-fit [&>*]:lg:w-md  [&>*]:flex [&>*]:flex-col [&>*]:justify-items-center [&>*]:px-8 [&>*]:py-6 [&>*]:bg-accent [&>*]:rounded-md'>

                    <div>
                        <div className='text-2xl font-bold mb-6'>Eco-Friendly Processing</div>
                        <div>The collected waste is sent to recycling centers where it is carefully sorted, cleaned, and processed.</div>
                    </div>

                    <div>
                        <div className='text-2xl font-bold mb-6'>Delivering a Sustainable Future</div>
                        <div>Our sustainable products are then made available for reuse, sale, or donation—completing the cycle of waste transformation.</div>
                    </div>

                </div>
            </div>

            {/* wy choose us */}
            <div className='mt-20'>
                <div className='text-lg font-bold mb-6'>Why Choose FutureBin? (Our Impact)</div>

                <div className='flex flex-col gap-5'>
                    <div>
                        <span><TiTick className='inline text-accent2' /></span>&nbsp;&nbsp;
                        <span className='font-bold'>Reduce Landfill Waste - </span>
                        <span className='opacity-50'>We give waste a second life instead of dumping it.</span>
                    </div>
                    <div>
                        <span><TiTick className='inline text-accent2' /></span>&nbsp;&nbsp;
                        <span className='font-bold'>Support Circular Economy  - </span>
                        <span className='opacity-50'>Turning trash into valuable goods benefits communities & businesses</span>
                    </div>
                    <div>
                        <span><TiTick className='inline text-accent2' /></span>&nbsp;&nbsp;
                        <span className='font-bold'>Eco-Friendly Products - </span>
                        <span className='opacity-50'>Buy or use sustainable products made from recycled waste</span>
                    </div>
                    <div>
                        <span><TiTick className='inline text-accent2' /></span>&nbsp;&nbsp;
                        <span className='font-bold'>Earn Rewards - </span>
                        <span className='opacity-50'>Users who recycle consistently can get discounts or credits on FutureBin products</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs