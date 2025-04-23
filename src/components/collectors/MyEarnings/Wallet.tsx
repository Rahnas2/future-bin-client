import { Eye, Rocket } from 'lucide-react'

type Props = {}

const Wallet = (props: Props) => {
    return (
        <div className='border border-gray-500 w-fit py-6 pl-5 pr-20 rounded-md shadow-sm '>
            <h5 className='mb-4'>Account Balance</h5>
            <div className='flex gap-3 mb-3'>
                <span>₹</span>
                <span>*****</span>
                <Eye className='w-4 h-4' />
            </div>

            <div>
                <button className='flex items-center bg-accent2 text-seconday font-medium px-8 py-1 rounded-sm'><Rocket className='w-4 h-4 mr-2' /> Withdraw</button>
            </div>
        </div>
    )
}

export default Wallet