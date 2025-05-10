import BackBtn from '@/components/common/BackBtn'
import SinglePickupRequestComp from '@/components/common/PickupRequest.ts/SinglePickupRequestComp'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'



const SinglePickupRequest = () => {

    const { id } = useParams() 
    const navigate = useNavigate()

    if(!id) {
        toast.error('id not found')
        navigate(-1)  
        return 
    }
    
    return (
        <div className="rounded-xl p-3">
            <BackBtn />
            <div className='p-5'>
            <SinglePickupRequestComp requestId={ id }/>
            </div>
        </div>
    )
}

export default SinglePickupRequest