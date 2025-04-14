

import { onDemandWasteType } from '@/types/onDemandWasteType'
import ManageWasteTypes from '@/components/common/ManageWasteTypes'
import { FaEdit } from 'react-icons/fa'
import { useState } from 'react'
import AddWasteTypeModal from '@/components/common/AddWasteTypeModal'
import { useOnDemandComplete } from '@/context/OnDemandCompleteContex'
import { updatePickupRequestApi } from '@/api/userService'
import { OnDemandPickupRequestType } from '@/types/PickupRequest'

type Props = {
}

const ReqActionManageWasteTypes = (props: Props) => {

    const { pickupRequest, setPickupRequest } = useOnDemandComplete()

    const [openAdd, setOpenAdd] = useState(false)    

    const handleAddOpen = () => {
        setOpenAdd(true)
    }

    const handleAddClose = () => {
        setOpenAdd(false)
    }

    const handleUpdate = async() => {
        try {
            const wasteTypes = pickupRequest.wasteTypes

            const updatedData: Partial<OnDemandPickupRequestType> = {
                wasteTypes
            }

            let totalAmount = 0
            let totalWeight = 0
            wasteTypes.forEach(w => {
                totalAmount += w.weight * w.price;
                totalWeight += w.weight;
            });
            
            if (totalAmount !== pickupRequest.totalAmount) {
                updatedData.totalAmount = totalAmount;
            }

            if(totalWeight !== pickupRequest.totalWeight){
                updatedData.totalWeight = totalWeight;
            }

            const response = await updatePickupRequestApi(pickupRequest._id as string, updatedData)
            setPickupRequest(response.request)
        } catch (error) {
            console.error('error updating reuqest ', error)
        }
    }
    return (
        <div>
            <div>
                <button className='cursor-pointer'><FaEdit className=" inline text-lg" /></button>
            </div>
            <ManageWasteTypes />

            <div className='flex justify-evenly mt-8'>
                <button onClick={handleAddOpen} className='bg-accent px-3 py-1 rounded-sm'>Add</button>
                <button onClick={handleUpdate} className='bg-accent px-3 py-1 rounded-sm' >Update</button>
            </div>

            {openAdd && <AddWasteTypeModal onClose={handleAddClose}/>}
        </div>
    )
}

export default ReqActionManageWasteTypes