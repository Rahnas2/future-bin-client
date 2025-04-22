import { deleteWasteTypeApi, fetchAllWasteTypesApi } from '@/api/adminServices'
import { wasteType } from '@/types/wasteTyp'
import React, { useEffect, useState } from 'react'

import { PiPencilBold } from "react-icons/pi";
import { FaTrashCan } from "react-icons/fa6";
import toast from 'react-hot-toast';

type Props = {
    wasteTypes: wasteType []
    onOpen: () => void,
    setMode: (mode: 'add' | 'edit') => void
    setSelectedData: React.Dispatch<React.SetStateAction<wasteType | undefined>>
    handleDeleteWasteType: (id: string) => void
}

const WasteTypesTable = (props: Props) => {


    //handle edit waste type
    const handleEdit = (data: wasteType) => {
        props.setSelectedData(data)
        props.setMode('edit')
        props.onOpen()
    }

    //handle delete 
    const handleDelete = async(id: string) => {
        try {
            await deleteWasteTypeApi(id)
            props.handleDeleteWasteType(id)
            toast.success('deleted')
        } catch (error) {
            console.error('error delete subscription')
        }
    }
    return (
        <table className="w-full ">
            <thead>
                <tr className="">
                    <th className="p-2 border-b  text-left">ID</th>
                    <th className="p-2 border-b text-left">Name</th>
                    <th className="p-2 border-b text-left">Price</th>
                    <th className="p-2 border-b text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.wasteTypes.map((wasteType) => (
                    <tr key={wasteType._id} className="">
                        <td className="p-2 border-b">{wasteType._id}</td>
                        <td className="p-2 border-b">{wasteType.name}</td>
                        <td className="p-2 border-b">₹ {wasteType.price}</td>
                        <td className="p-2 border-b text-center">
                            <div className="flex justify-center items-center m-1 gap-5 space-x-2">
                                <button onClick={() => handleEdit(wasteType) } className='bg-blue-500 rounded-sm py-2 px-3 shadow-2xl cursor-pointer'><PiPencilBold className='inline'/></button>
                                <button onClick={() => handleDelete(wasteType._id)} className='bg-red-500 rounded-sm py-2 px-3 shadow-2xl cursor-pointer'><FaTrashCan className='inline'/></button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default WasteTypesTable