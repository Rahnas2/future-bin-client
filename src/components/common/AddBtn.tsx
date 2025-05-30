import { wasteType } from '@/types/wasteTyp'
import React from 'react'
import { IoIosAdd } from 'react-icons/io'

type Props = {
    onOpen: () => void
    setMode: (mode: 'add' | 'edit') => void
    setSelectedData: React.Dispatch<React.SetStateAction<wasteType | undefined>>
}


const AddBtn = (props: Props) => {

    //handle modal open 
    const handleModalOpen = () => {
        props.setMode('add')
        props.setSelectedData(undefined)
        props.onOpen()
    }

    return (
        <div onClick={handleModalOpen} className='flex cursor-pointer mb-10 '>
            <div className='border opacity-50 px-8 py-1 rounded-md'>
                <span className='text-2xl'><IoIosAdd className='inline m-0' /></span>
                <span className='ml-1'>Add</span>
            </div>
        </div>
    )

}

export default AddBtn