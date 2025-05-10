import { useEffect, useState } from 'react'
import { subscriptionType } from '../../types/SubscriptionType'
import { BasePickupRequestType, SubscriptionPickupRequestType } from '../../types/PickupRequest'
import { IRootState } from '../../redux/slices'
import { useSelector } from 'react-redux'
import { IoMdAdd, IoMdClose } from 'react-icons/io'
import { pickupRequestApi } from '../../api/userService'
import toast from 'react-hot-toast'
import ChangeAddressModal from '../common/PickupRequest.ts/ChangeAddressModal'

type Props = {
    onClose: () => void,
    subscription: subscriptionType
}


const SubscriptionRequestModal = (props: Props) => {

    const { user } = useSelector((state: IRootState) => state.user)
    console.log('user ', user)

    const [data, setData] = useState<SubscriptionPickupRequestType>({
        subscription: {
            planId: props.subscription._id as string,
            name: props.subscription.name,
            frequency: props.subscription.frequency,
            features: props.subscription.features,
            totalPickups: props.subscription.totalPickups,
            completedPickups: 0
        },
        totalAmount: parseInt(props.subscription.price),
        name: "",
        mobile: "",
        email: "",
        type: "subscription",
        address: {
            street: "",
            houseNo: "",
            district: "",
            city: "",
            pincode: 0,
            location: {
                type: "Point",
                coordinates: [0, 0]
            }
        }
    })

    const [changeAddress, setChangeAddress] = useState(false)

    const handleOpen = () => {
        setChangeAddress(true)
    }

    const handleClose = () => {
        setChangeAddress(false)
    }

    const handleChangeAddress = (updatedData: Pick<BasePickupRequestType, 'name' | 'mobile' | 'address'>) => {
        setData(prev => ({ ...prev, ...updatedData }))
    }


    useEffect(() => {
        if (user && user.address) {
            setData(prevData => ({
                ...prevData,
                name: user.firstName + ' ' + user.lastName,
                mobile: user.mobile,
                email: user.email,
                address: user.address,
            }));
        }

    }, [])

    const handleReqeust = async () => {
        try {
            console.log('data here ', data)
            const reutlt = await pickupRequestApi(data)
            props.onClose()
            toast.success(reutlt.message)
        } catch (error: any) {
            console.log('error request subscritption request ', error)
            error.response.data.message ? toast.error(error.response.data.message) : toast.error('something went wrong ')
        }

    }

    return (
        <div className='fixed inset-0  bg-opacity-50 backdrop-blur-xs flex justify-center items-center z-10'>
            <div className="bg-primary border border-gray-500 px-3 py-2 rounded-xl ">

                <div onClick={props.onClose} className="font-bold text-end text-accent2 cursor-pointer"><IoMdClose className="inline" /></div>
                <div className='px-6 py-4 '>
                    <div className='mb-4'>
                        <div className='font-bold mb-5'>Confirm Address</div>
                        <div className='w-xs border border-gray-500 rounded-lg px-4 py-2 shadow-2xl'>
                            <div className='font-bold mb-3 capitalize opacity-50'>{data.name}</div>
                            <div className='mb-3'>{data.address.houseNo + ', ' + data.address.street + ', ' + data.address.district + ', ' + data.address.city + ', ' + data.address.pincode}</div>
                            <div className=''>{data.mobile}</div>
                        </div>

                        <button onClick={handleOpen} className='flex items-center text-accent2 font-bold mt-4 cursor-pointer'>
                            <IoMdAdd className='inline' />&nbsp;
                            <span>Change Address</span>
                        </button>

                        <div className='mt-8 text-end'>
                            <span onClick={handleReqeust} className='bg-accent px-5 py-2 rounded-lg cursor-pointer'>Request</span>
                        </div>
                    </div>
                </div>

            </div>

            {changeAddress && <ChangeAddressModal onClose={handleClose} onChangeAddress={handleChangeAddress} />}
        </div>
    )
}

export default SubscriptionRequestModal