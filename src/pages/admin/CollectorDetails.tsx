import React, { useEffect, useState } from 'react'
import BackBtn from '../../components/common/BackBtn'

import Address from '../../components/Address'

import { useLocation, useNavigate } from 'react-router-dom'
import axiosInstance from '../../api/axiosInstance'
import { TextField } from '@mui/material'
import { Box, ThemeProvider } from '@mui/system'
import Input from '../../themes/input'
import toast from 'react-hot-toast'

import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import { FaUserCircle } from 'react-icons/fa'

type Props = {}

function CollectorDetails({ }: Props) {

    const location = useLocation()
    const navigate = useNavigate()

    const { userId, type } = location.state


    const [data, setData] = useState({
        _id: '',
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        image: '',
        isBlock: false,
        address: {
            street: '',
            houseNo: '',
            district: '',
            city: '',
            pincode: 0
        },
        details: {
            _id: '',
            idCard: {
                front: '',
                back: ''
            },
            vehicleDetails: {
                model: '',
                licensePlate: '',
                image: ''
            }
        },

    })

    useEffect(() => {
        const fetchCollectorDetails = async () => {
            try {
                const response = await axiosInstance.get(`/admin/collector/view-detail?userId=${userId}`)
                const collector = response.data.collector
                console.log('collector ', collector)
                setData(collector)
            } catch (error) {
                console.log('error fetch collector ', error)
            }
        }
        fetchCollectorDetails()
        return () => {
            console.log(data)
        }
    }, [])


    const toggleCollectorStatus = async () => {
        try {
            await axiosInstance.patch('/admin/user/status', { userId: data._id })
            const message = data.isBlock ? 'ublocked' : 'blocked'
            setData({ ...data, isBlock: !data.isBlock })
            toast.success('collector ' + message + ' successfully')
        } catch (error) {
            console.log('toggle status error ', error)
        }
    }

    const collectorId = data.details._id
    const handleAccept = async() => {
        try {
            const response = await axiosInstance.patch('/admin/collector/request/approve', {collectorId, name: data.firstName + ' ' + data.lastName, email: data.email})
            toast.success(response.data.message)
            navigate(-1)
        } catch (error) {
            console.log('error ', error)
            toast.error('something went wrong please try again')
        }
    }

    const handleReject = async() => {
        try {
            const response = await axiosInstance.patch('/admin/collector/request/reject', {collectorId, name: data.firstName + ' ' + data.lastName, email: data.email})
            toast.success(response.data.message)
            navigate(-1)
        } catch (error) {
            console.log('error ', error)
            toast.error('someting went wrong please try again')
        }
    }



    return (
        <div className='p-6'>
            <BackBtn />

            <div className='m-15 p-8 bg-primary flex flex-col gap-5 rounded-xl'>

                {/* top */}
                <div className="flex gap-12 items-center justify-center mt-10 mb-10">
                    <div className="">
                    {!data.image ? <FaUserCircle className='w-42 h-42' />: <img className='w-42 h-42 rounded-full' src={data.image} alt="" />}
                    </div>

                    <div>
                        <div className="font-bold text-2xl mb-2">{data.firstName + '    ' + data.lastName}</div>
                        <div className="mb-1 opacity-50">{data.email}</div>
                        <div className="opacity-50">{data.mobile}</div>
                    </div>

                </div>

                <div className='flex gap-20'>
                    <div>
                        <div className='mb-8'>
                            <div className='font-bold mb-5'>ID CARD</div>
                            <div className='flex flex-col lg:flex-row gap-4'>
                                <div className='flex flex-col gap-2'>
                                    <div className='border border-dashed rounded-xl w-xs h-48 flex items-center justify-center'>
                                        <img className='p-1 h-48 w-xs rounded-xl' src={data.details.idCard.front} alt="" />
                                    </div>
                                    <span className='text-center opacity-50'>Front Side</span>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <div className='border border-dashed rounded-xl w-xs h-48 flex items-center justify-center '>
                                        <img className='p-1 h-48 w-xs rounded-xl' src={data.details.idCard.back} alt="" />
                                    </div>
                                    <span className='text-center opacity-50'>Back Side</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <Address address={data.address} />
                        </div>
                    </div>

                    <div>
                        <div>Vehicle details</div>
                        <ThemeProvider theme={Input}>
                            <Box
                                className='flex flex-col'
                                sx={{ '& > :not(style)': { my: 1 } }}
                            >
                                <TextField label="Vehicle Model"
                                    name='vehicle-model'
                                    value={data.details.vehicleDetails.model}
                                    slotProps={{
                                        input: {
                                            readOnly: true,
                                        },
                                    }}
                                />
                                <TextField label="License Plate"
                                    name='license-plate'
                                    value={data.details.vehicleDetails.licensePlate}
                                    slotProps={{
                                        input: {
                                            readOnly: true,
                                        },
                                    }}
                                />
                            </Box>
                        </ThemeProvider>

                        <div className='border border-dashed rounded-xl w-xs h-48 flex items-center justify-center'>
                            <img className='p-1 w-xs h-48 rounded-xl' src={data.details.vehicleDetails.image} alt="" />
                        </div>
                    </div>

                </div>
                <div className='flex justify-end gap-15 [&>*]:cursor-pointer font-bold'>
                    {type === 'request' ?
                        <>
                            <div onClick={handleAccept} className='flex items-center gap-3 bg-accent px-8 py-2 rounded-xl'>
                                <span><IoMdCheckmarkCircleOutline className='inline text-2xl' /></span>
                                <span>Accept</span>
                            </div>
                            <div onClick={handleReject} className='flex items-center gap-3 bg-red-700 px-8 py-2 rounded-xl'>
                                <span><IoMdCloseCircleOutline className='inline text-2xl' /></span>
                                <span>Reject</span>
                            </div>
                        </>
                        :
                        <button onClick={toggleCollectorStatus} className={` px-8 py-2 rounded-xl ${data.isBlock ? 'bg-yellow-300 text-primary' : 'bg-red-700'}`}>{data.isBlock ? 'Unblock' : 'Block'}</button>
                    }
                </div>

            </div>
        </div>
    )
}

export default CollectorDetails