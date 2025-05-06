import React, { useEffect, useState } from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { MdAdd, MdDeleteForever } from 'react-icons/md'
import { TiTick } from 'react-icons/ti'
import { subscriptionType } from '../../../types/SubscriptionType'
import { deleteSubscriptionApi } from '../../../api/adminServices'
import toast from 'react-hot-toast'
import { FaPlus } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { subscriptionSchema } from '../../../validations/addSubscription'
import { ValidationError } from 'yup'
import ComponentSpinner from '@/components/common/ComponentSpinner'

type Props = {
    subscriptions: subscriptionType[];
    loading: boolean;
    onDeleteSubscription: (id: string) => void;
    onOpenEdit: (updatedSubscription: subscriptionType) => void;
}

interface editStatus {
    [key: string]: boolean
}

const AdminSubCard = (props: Props) => {

    //edit subscription
    const [editStatus, setEditStatus] = useState<editStatus>({})
    const [editData, setEditData] = useState<subscriptionType>()

    //validation errors
    const [errors, setErrors] = useState<Partial<subscriptionType>>({})

    const handleDelete = async (id: string) => {
        try {
            const result = await deleteSubscriptionApi(id)
            props.onDeleteSubscription(id);
            toast.success(result.message)
        } catch (error) {
            console.log('error ', error)
            toast.error('somethig went wrong')
        }

    }

    //handle basic datas eg(name, price , description)
    const handleDataChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!editData) return

        const { name, value } = e.target

        setEditData({ ...editData, [name]: value })

        try {
            await subscriptionSchema.validateAt(name, { ...editData, [name]: value })
            setErrors({ ...errors, [name]: null })
        } catch (error) {
            if (error instanceof ValidationError) {
                setErrors({ ...errors, [name]: error.message })
            }
        }
    }

    //add features
    const addFeatures = () => {
        if (!editData) return

        setEditData({
            ...editData,
            features: [...editData.features, ""]
        })
    }

    //remove features
    const removeFeature = (index: number) => {
        if (!editData) return

        setEditData({
            ...editData,
            features: editData.features.filter((_, i) => i !== index)
        })
    }

    // handle features change
    const handleFeatureChange = (index: number, value: string) => {
        if (!editData) return
        const updatedFeature = [...editData.features]
        updatedFeature[index] = value

        setEditData({ ...editData, features: updatedFeature })
    }


    if (props.loading) {
        return <ComponentSpinner />
    }

    return (
        <div className='flex flex-wrap justify-between gap-5 px-10'>
            {props.subscriptions.map(data => {
                const isEditing = editStatus[data._id as string] || false
                const currentData: subscriptionType = isEditing ? editData as subscriptionType : data
                return (
                    <div key={data._id} className='w-xs bg-linear-to-br from-accent from-20% via-[#0D7247] via-43% to-[#06753E] to-74% rounded-3xl pb-4 flex flex-col'>

                        {/* actions */}
                        <div className='flex justify-end items-center gap-5 px-3 pt-3 text-xl'>
                            <span onClick={() => props.onOpenEdit(data)} className='text-accent3 cursor-pointer'><FaRegEdit className='inline ' /></span>
                            <span onClick={() => handleDelete(currentData._id as string)} className='text-accent3 cursor-pointer'><MdDeleteForever className='inline' /></span>
                        </div>

                        <div className='px-6 py-3 flex-grow'>
                            <input className={`outline-none font-bold text-2xl   uppercase ${errors.name && errors._id === data._id ? 'text-red-700' : 'text-primary mb-6'} `}
                                name='name'
                                value={currentData.name}
                                onChange={isEditing ? handleDataChange : undefined}
                                readOnly={!isEditing}
                            />
                            <div className={` text-sm ${errors.name && errors._id === data._id ? 'text-red-500' : 'hidden'}`}>{errors.name}</div>

                            <div className={`flex items-center text-xl ${errors.price && errors._id === data._id ? '' : 'mb-3'}`}>
                                <span className='font-bold text-2xl mr-1 shrink-0'>$ </span>
                                <input
                                    className={`outline-none w-auto inline-block whitespace-nowrap p-0 m-0 font-bold text-2xl min-w-0 flex-shrink ${errors.price && errors._id === data._id ? 'text-red-600' : ''}`}
                                    name='price'
                                    value={currentData.price}
                                    onChange={isEditing ? handleDataChange : undefined}
                                    style={{ width: `${currentData.price.toString().length + 1}ch` }}
                                    readOnly={!isEditing}
                                />
                                <span className='text-primary ml-2 shrink-0'>Only</span>
                            </div>
                            <div className={` text-sm ${errors.price && errors._id === data._id ? 'text-red-500' : 'hidden'}`}>{errors.price}</div>

                            {/* <input className={`outline-none w-full ${errors.description && errors._id === data._id ? 'text-red-600' : 'text-primary mb-6'}`}
                                name='description'
                                value={currentData.description}
                                onChange={isEditing ? handleDataChange : undefined}
                                title={currentData.description}
                                readOnly={!isEditing}
                            /> */}
                            <div className='text-primary mb-6'>{currentData.description}</div>
                            <div className={` text-sm ${errors.description && errors._id === data._id ? 'text-red-500' : 'hidden'}`}>{errors.description}</div>

                            <div className='flex justify-between items-center mb-5'><span className='uppercase font-bold '>Features</span>
                                {isEditing && <span onClick={addFeatures} className='flex items-center text-accent3 hover:bg-green-500 transition-colors rounded-full font-bold'><FaPlus className='inline m-0 p-1 w-6 h-6' /></span>}</div>
                            <div className='flex flex-col gap-3 [&>*]:flex [&>*]:gap-2'>
                                {currentData.features.map((feature, index) => (
                                    <div key={index}>
                                        <span><TiTick className='inline text-primary' /></span>
                                        <textarea className='outline-none w-full' value={feature} onChange={(e) => handleFeatureChange(index, e.target.value)}
                                            readOnly={!isEditing}
                                        />
                                        {isEditing && <span onClick={() => removeFeature(index)} className='opacity'><TiDelete className='inline' /></span>}
                                    </div>
                                ))}
                            </div>

                        </div>

                        {/* submit */}
                        {/* {isEditing && <div className='flex justify-center pt-4'>
                            <span onClick={() => handleSubmit(data._id as string)} className='bg-primary rounded-lg px-6 py-1 cursor-pointer'>Submit</span>
                        </div>} */}

                    </div>
                )
            })}
        </div>
    )


}

export default AdminSubCard