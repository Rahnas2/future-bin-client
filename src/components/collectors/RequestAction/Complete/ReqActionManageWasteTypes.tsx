

import { onDemandWasteType } from '@/types/onDemandWasteType'
import ManageWasteTypes from '@/components/common/ManageWasteTypes'
import { useState } from 'react'
import AddWasteTypeModal from '@/components/common/AddWasteTypeModal'
import { useOnDemandComplete } from '@/context/OnDemandCompleteContex'
import { updatePickupRequestApi } from '@/api/userService'
import { OnDemandPickupRequestType } from '@/types/PickupRequest'
import ButtonSpinner from '@/components/common/ButtonSpinner'
import { Plus, SaveIcon, Scale } from 'lucide-react'
import { Save } from 'react-facebook'

type Props = {
}

const ReqActionManageWasteTypes = (props: Props) => {

    const { pickupRequest, setPickupRequest } = useOnDemandComplete()

    const [openAdd, setOpenAdd] = useState(false)

    const [isUpdating, setIsUpdating] = useState(false)

    const handleAddOpen = () => {
        setOpenAdd(true)
    }

    const handleAddClose = () => {
        setOpenAdd(false)
    }

    const handleUpdate = async () => {
        try {
            setIsUpdating(true)

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

            if (totalWeight !== pickupRequest.totalWeight) {
                updatedData.totalWeight = totalWeight;
            }

            const response = await updatePickupRequestApi(pickupRequest._id as string, updatedData)
            setPickupRequest(response.request)
        } catch (error) {
            console.error('error updating reuqest ', error)
        } finally {
            setIsUpdating(false)
        }
    }
    return (
        <div>
            <ManageWasteTypes />

            <div className='flex justify-between mt-8 text-sm'>
                <button onClick={handleAddOpen} className='px-8 py-2 rounded-md text-sm font-medium  focus:outline-none transition text-accent2 hover:text-green-800 hover:bg-gray-200 '><Plus className='inline mr-2 w-4 h-4'/>Add</button>
                <button disabled={isUpdating} onClick={handleUpdate} className='bg-accent px-3 py-2 rounded-sm w-50' >
                    {isUpdating ? <div className='flex justify-center'><ButtonSpinner /></div> : <><SaveIcon className="w-4 h-4 mr-2 inline"/>Update Collection</>}
                </button>
            </div>

            {openAdd && <AddWasteTypeModal onClose={handleAddClose} />}
        </div>
    )
}

export default ReqActionManageWasteTypes