import { useEffect, useState } from 'react'
import BackBtn from '../../components/common/BackBtn'

import Address from '../../components/Address'

import { useLocation, useNavigate } from 'react-router-dom'
import { TextField } from '@mui/material'
import { Box, ThemeProvider } from '@mui/system'
import Input from '../../themes/input'
import toast from 'react-hot-toast'

import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import { FaUserCircle } from 'react-icons/fa'
import { acceptRegisterationReqeustApi, blockUserApi, fetchSingleCollectorApi, rejectRegisterationRequestApi } from '@/api/adminServices'
import ButtonSpinner from '@/components/common/ButtonSpinner'


type Props = {}

function CollectorDetails({ }: Props) {

    const location = useLocation()
    const navigate = useNavigate()

    const [action, setAction] = useState<'accepting' | 'rejecting' | null>(null)

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
                const response = await fetchSingleCollectorApi(userId)
                const collector = response.collector
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
            await blockUserApi(data._id)
            const message = data.isBlock ? 'ublocked' : 'blocked'
            setData({ ...data, isBlock: !data.isBlock })
            toast.success('collector ' + message + ' successfully')
        } catch (error) {
            console.log('toggle status error ', error)
        } finally {

        }
    }

    const collectorId = data.details._id
    const handleAccept = async () => {
        try {
            setAction('accepting')
            const response = await acceptRegisterationReqeustApi(collectorId, data.firstName + ' ' + data.lastName, data.email)
            toast.success(response.message)
            navigate(-1)
        } catch (error) {
            console.log('error ', error)
            toast.error('something went wrong please try again')
        } finally {
            setAction(null)
        }
    }

    const handleReject = async () => {
        try {
            setAction('rejecting')
            const response = await rejectRegisterationRequestApi(collectorId, data.firstName + ' ' + data.lastName, data.email)
            toast.success(response.message)
            navigate(-1)
        } catch (error) {
            console.log('error ', error)
            toast.error('someting went wrong please try again')
        } finally {
            setAction(null)
        }
    }



    return (
        <div className='p-6'>
            <BackBtn />

            <div className='m-15 p-8 bg-primary flex flex-col gap-5 rounded-xl'>

                {/* top */}
                <div className="flex gap-12 items-center justify-center mt-10 mb-10">
                    <div className="">
                        {!data.image ? <FaUserCircle className='w-42 h-42' /> : <img className='w-42 h-42 rounded-full' src={data.image} alt="" />}
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
                            <button disabled={action === 'accepting'} onClick={handleAccept} className='flex w-40 items-center justify-center gap-3 bg-accent py-2 rounded-xl'>
                                {action === 'accepting' ? <ButtonSpinner /> :
                                    <>
                                        <span><IoMdCheckmarkCircleOutline className='inline text-2xl' /></span>
                                        <span>Accept</span>
                                    </>}
                            </button>
                            <button disabled={action === 'rejecting'} onClick={handleReject} className='flex w-40 items-center justify-center gap-3 bg-red-700 py-2 rounded-xl'>
                                {action === 'rejecting' ? <ButtonSpinner /> :
                                    <>
                                        <span><IoMdCloseCircleOutline className='inline text-2xl' /></span>
                                        <span>Reject</span>
                                    </>}
                            </button>
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