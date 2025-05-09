import { Checkbox, FormControlLabel, FormGroup, TextField, ThemeProvider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { IoMdClose, IoMdAdd } from 'react-icons/io'
import Input from '../../themes/input'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../redux/slices'
import { pickupRequestApi } from '../../api/userService'
import { BasePickupRequestType, OnDemandPickupRequestType, pickupRequestType } from '../../types/PickupRequest'
// import { wasteTypes } from '../../utils/availableWasteTypes'
import toast from 'react-hot-toast'
import { AppDispatch } from '@/redux/store'
import { fetchWasteTypes } from '@/redux/slices/wasteTypesSlice'
import { onDemandWasteType } from '@/types/onDemandWasteType'
import ComponentSpinner from '../common/ComponentSpinner'
import ChangeAddressModal from '../common/PickupRequest.ts/ChangeAddressModal'
import ButtonSpinner from '../common/ButtonSpinner'

type Props = {
    onClose: () => void
}

const OnDemandRequestModal = (props: Props) => {
    const { user } = useSelector((state: IRootState) => state.user)

    const { wasteTypes, initialized } = useSelector((state: IRootState) => state.wasteTypes)
    const dispatch = useDispatch<AppDispatch>()

    const [fetchingWasteTypes, setFetchingWasteTypes] = useState(false)
    const [isRequestingPickup, setIsRequestingPickup] = useState(false)


    //For Change Address Modal
    const [changeAddress, setChangeAddress] = useState(false)

    //fetch waste types
    useEffect(() => {
        const findWasteTypes = async () => {
            try {
                setFetchingWasteTypes(true)
                const result = await dispatch(fetchWasteTypes({ page: 1, limit: 10, search: '' })).unwrap()
            } catch (error) {
                console.log('erro fetching waste types..', error)
            } finally {
                setFetchingWasteTypes(false)
            }
        }
        findWasteTypes()
    }, [dispatch])


    const [checkedState, setCheckedState] = useState(
        new Array(wasteTypes?.length || 0).fill(false)
    );

    const [selectedWasteTypes, setSelectedWasteTypes] = useState<onDemandWasteType[]>([]);

    const [data, setData] = useState<OnDemandPickupRequestType>({
        name: "",
        mobile: "",
        email: "",
        type: "on-demand",
        totalAmount: 0,
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
        },
        wasteTypes: [],
        totalWeight: 0
    })

    const handleOpen = () => {
        setChangeAddress(true)
    }

    const handleClose = () => {
        setChangeAddress(false)
    }

    const handleChangeAddress = (updatedData: Pick<BasePickupRequestType, 'name' | 'mobile' | 'address'>) => {
        setData(prev => ({ ...prev, ...updatedData }))
    }

    //fetch user address
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

    useEffect(() => {
        if (wasteTypes && wasteTypes.length > 0) {
            setCheckedState(new Array(wasteTypes.length).fill(false));
        }
    }, [wasteTypes]);



    const handleCheckBoxChange = (position: number) => {
        if (!wasteTypes) return

        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        )
        setCheckedState(updatedCheckedState)

        const waste = wasteTypes[position];

        if (updatedCheckedState[position]) {
            // Add waste type
            setSelectedWasteTypes(prev => [...prev, {
                name: waste.name,
                price: waste.price,
                weight: 1
            }])

            setData(prev => ({ ...prev, totalWeight: prev.totalWeight + 1, totalAmount: prev.totalAmount + waste.price }))
        } else {
            // Remove waste type
            setSelectedWasteTypes(prev =>
                prev.filter((item) => item.name !== waste.name)
            )

            setData(prev => ({ ...prev, totalWeight: prev.totalWeight - 1, totalAmount: prev.totalAmount - waste.price }))

        }
    }

    const handleWeightChange = (wasteName: string, newWeight: number) => {
        setSelectedWasteTypes(prev =>
            prev.map(waste =>
                waste.name === wasteName
                    ? { ...waste, weight: newWeight }
                    : waste
            )
        );

        // Update total weight
        const updatedWasteTypes = selectedWasteTypes.map(waste =>
            waste.name === wasteName
                ? { ...waste, weight: newWeight }
                : waste
        );

        const totalWeight = updatedWasteTypes.reduce((sum, waste) =>
            sum + (waste.weight || 0)
            , 0);

        const totalPrice = updatedWasteTypes.reduce((sum, waste) =>
            sum + (waste.weight * waste.price)
            , 0);


        setData(prev => ({ ...prev, totalWeight: totalWeight, totalAmount: totalPrice }));
    }

    //Handle Submit
    const handleSubmit = async () => {
        try {

            if (!selectedWasteTypes.length) return toast.error('please select atleast one type')


            const invalidWeights = selectedWasteTypes.some(waste =>
                !waste.weight || waste.weight <= 0
            );

            if (invalidWeights) {
                return toast.error('Please enter valid weights for selected waste types');
            }

            setIsRequestingPickup(true)

            const submissionData = {
                ...data,
                wasteTypes: selectedWasteTypes
            };

            console.log('submission data ', submissionData)
            const reutlt = await pickupRequestApi(submissionData)
            props.onClose()
            toast.success(reutlt.message)
        } catch (error: any) {
            console.error('error request on-demnand pickup ', error)
            toast.error(error.response.data.message || 'something went wrong')
        } finally {
            setIsRequestingPickup(false);
        }
    }

    return (
        <div className='fixed inset-0 bg-opacity-50 flex justify-center items-center z-50'>
            <div className="bg-primary border border-gray-500 px-8 py-6 rounded-xl w-[900px] max-w-[100%] max-h-[98vh] flex flex-col">
                {!initialized ? <ComponentSpinner /> :
                    <>
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-xl font-semibold">On-Demand Pickup Request</h2>
                            <div
                                onClick={props.onClose}
                                className="text-accent2 cursor-pointer"
                            >
                                <IoMdClose className="text-2xl" />
                            </div>
                        </div>

                        <div className='grid md:grid-cols-2 gap-6 flex--1 overflow-y-auto'>
                            {/* Address Section */}
                            <div className='mb-5'>
                                <div className='font-medium mb-5'>Address</div>
                                <div className='w-xs border border-gray-500 rounded-lg px-4 py-2 shadow-2xl'>
                                    <div className='font-bold mb-3 capitalize opacity-50'>{data.name}</div>
                                    <div className='mb-3'>{data.address.houseNo + ', ' + data.address.street + ', ' + data.address.district + ', ' + data.address.city + ', ' + data.address.pincode}</div>
                                    <div className=''>{data.mobile}</div>
                                </div>

                                <button onClick={handleOpen} className='flex items-center text-accent2 font-bold mt-4 cursor-pointer'>
                                    <IoMdAdd className='inline' />&nbsp;
                                    <span>Change Address</span>
                                </button>
                            </div>

                            {/* Waste Types Section */}
                            <div>
                                <div className='font-medium mb-4'>Select Waste Types</div>
                                <div className='space-y-4'>
                                    {wasteTypes?.map((waste, index) => (
                                        <div key={index} className='flex items-center justify-between'>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={checkedState[index]}
                                                        onChange={() => handleCheckBoxChange(index)}
                                                        sx={{
                                                            color: "hsl(0, 0%, 50%)",
                                                            "&.Mui-checked": { color: "#009E4F" },
                                                        }}
                                                    />
                                                }
                                                label={
                                                    <div className='flex items-center'>
                                                        <span>{waste.name}</span>
                                                        <span className='text-gray-500 ml-2 text-sm'>
                                                            (₹{waste.price}/kg)
                                                        </span>
                                                    </div>
                                                }
                                            />
                                            {checkedState[index] && (
                                                <ThemeProvider theme={Input}>
                                                    <TextField
                                                        type="number"
                                                        label="Weight (kg)"
                                                        variant="outlined"
                                                        size="small"
                                                        value={selectedWasteTypes.find(w => w.name === waste.name)?.weight || ''}
                                                        onChange={(e) => {
                                                            const newWeight = Number(e.target.value);
                                                            handleWeightChange(waste.name, newWeight);
                                                        }}
                                                        inputProps={{ min: 1, step: 1 }}
                                                        sx={{ width: '100px' }}
                                                    />
                                                </ThemeProvider>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Total Pricing Section */}
                        {selectedWasteTypes.length > 0 && (
                            <div className='mt-6 p-4 rounded-lg'>
                                <h3 className='font-medium mb-3 '>Pricing Breakdown</h3>
                                {selectedWasteTypes.map((waste, index) => (
                                    <div key={index} className='flex justify-between mb-2'>
                                        <span>{waste.name}</span>
                                        <span className='opacity-50'>
                                            {waste.weight} kg &nbsp; x &nbsp; ₹ {waste.price}/kg &nbsp; = &nbsp;
                                            ₹ {(waste.weight * waste.price).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                                <div className='border-t border-t-gray-500 mt-4 mb-3 pt-2 flex justify-between '>
                                    <span>Total Weight</span>
                                    <span className=''>{data.totalWeight} kg</span>
                                </div>
                                <div className='flex justify-between  text-lg'>
                                    <span>Total Price</span>
                                    <span className=''>
                                    ₹ {data.totalAmount}
                                    </span>
                                </div>
                            </div>
                        )}

                        <div className='flex justify-end mt-6'>
                            <button
                                disabled={isRequestingPickup}
                                onClick={handleSubmit}
                                className='bg-accent px-6 py-2 flex justify-center rounded-lg text-white hover:bg-opacity-90 transition-colors cursor-pointer  w-40'
                            >
                                {isRequestingPickup ? <ButtonSpinner />: 'Request Pickup'}
                                
                            </button>
                        </div>
                    </>
                }
            </div>

            {changeAddress && <ChangeAddressModal onClose={handleClose} onChangeAddress={handleChangeAddress} />}
        </div>
    )
}

export default OnDemandRequestModal
