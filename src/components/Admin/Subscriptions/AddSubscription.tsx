
import { IoIosAdd } from 'react-icons/io'

type Props = {
    onOpen: () => void
}

const AddSubscription = (props: Props) => {
    return (
        <div onClick={props.onOpen} className='flex justify-center mt-6 mb-15 cursor-pointer'>
            <div className=' border opacity-50 w-fit px-6 py-2 rounded-2xl'>
                <span className='text-2xl'><IoIosAdd className='inline  ' /></span>
                <span className='ml-2'>Add Subscription</span>
            </div>
        </div>
    )
}

export default AddSubscription