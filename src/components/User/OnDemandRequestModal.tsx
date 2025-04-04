import { Checkbox, FormControlLabel, FormGroup, TextField, ThemeProvider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { IoMdClose, IoMdAdd } from 'react-icons/io'
import Input from '../../themes/input'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../redux/slices'
import { pickupRequestApi } from '../../api/userService'
import { OnDemandPickupRequestType } from '../../types/PickupRequest'
// import { wasteTypes } from '../../utils/availableWasteTypes'
import toast from 'react-hot-toast'
import { AppDispatch } from '@/redux/store'
import { fetchWasteTypes } from '@/redux/slices/wasteTypesSlice'
import { onDemandWasteType } from '@/types/onDemandWasteType'

type Props = {
    onClose: () => void
}

const OnDemandRequestModal = (props: Props) => {
    const { user } = useSelector((state: IRootState) => state.user)

    const { wasteTypes, initialized } = useSelector((state: IRootState) => state.wasteTypes)
    const dispatch = useDispatch<AppDispatch>()

    //fetch waste types
    useEffect(() => {
        const findWasteTypes = async () => {
            try {
                const result = await dispatch(fetchWasteTypes())
            } catch (error) {
                console.log('erro fetching waste types..', error)
            }
        }
        findWasteTypes()
    }, [dispatch])


    //fetch user address
    useEffect(() => {
        if (user && user.address) {
            setData(prevData => ({
                ...prevData,
                name: user.firstName + ', ' + user.lastName,
                mobile: user.mobile,
                address: user.address,
            }));
        }

    }, [])

    const [checkedState, setCheckedState] = useState(
        new Array(wasteTypes?.length || 0).fill(false)
    );

    const [selectedWasteTypes, setSelectedWasteTypes] = useState<onDemandWasteType[]>([]);

    const [data, setData] = useState<OnDemandPickupRequestType>({
        name: "",
        mobile: "",
        type: "on-demand",
        price: 0,
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
        weight: 0
    })

    const [error, setError] = useState<string | null>(null)



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

            setData(prev => ({ ...prev, weight: prev.weight + 1, price: prev.price + waste.price }))
        } else {
            // Remove waste type
            setSelectedWasteTypes(prev =>
                prev.filter((item) => item.name !== waste.name)
            )

            setData(prev => ({ ...prev, weight: prev.weight - 1, price: prev.price - waste.price }))

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
    

        setData(prev => ({ ...prev, weight: totalWeight, price: totalPrice }));
    }

    const handleSubmit = async () => {
        try {

            if (!selectedWasteTypes.length) return toast.error('please select atleast one type')


            const invalidWeights = selectedWasteTypes.some(waste =>
                !waste.weight || waste.weight <= 0
            );

            if (invalidWeights) {
                return toast.error('Please enter valid weights for selected waste types');
            }

            const submissionData = {
                ...data,
                wasteTypes: selectedWasteTypes
            };

            const reutlt = await pickupRequestApi(submissionData)
            props.onClose()
            toast.success(reutlt.message)
        } catch (error) {
            console.log('error ', error)
        }
    }

    if (!initialized) return <div>loading...</div>

    return (
        <div className='fixed inset-0 bg-opacity-50 flex justify-center items-center'>
            <div className="bg-primary border border-gray-500 px-8 py-6 rounded-xl w-[900px] max-w-[100%]">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-xl font-semibold">On-Demand Pickup Request</h2>
                    <div
                        onClick={props.onClose}
                        className="text-accent2 cursor-pointer"
                    >
                        <IoMdClose className="text-2xl" />
                    </div>
                </div>

                <div className='grid md:grid-cols-2 gap-6'>
                    {/* Address Section */}
                    <div className='mb-5'>
                        <div className='font-medium mb-5'>Address</div>
                        <div className='w-xs border border-gray-500 rounded-lg px-4 py-2 shadow-2xl'>
                            <div className='font-bold mb-3 capitalize opacity-50'>{user?.firstName + ' ' + user?.lastName}</div>
                            <div className='mb-3'>{user?.address.houseNo + ', ' + user?.address.street + ', ' + user?.address.district + ', ' + user?.address.city + ', ' + user?.address.pincode}</div>
                            <div className=''>{user?.mobile}</div>
                        </div>

                        <div className='flex items-center text-accent2 font-bold mt-4 '>
                            <IoMdAdd className='inline' />&nbsp;
                            <span>Add new Address</span>
                        </div>
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
                            <span className=''>{data.weight} kg</span>
                        </div>
                        <div className='flex justify-between  text-lg'>
                            <span>Total Price</span>
                            <span className=''>
                                ₹ {data.price}
                            </span>
                        </div>
                    </div>
                )}

                <div className='flex justify-end mt-6'>
                    <button
                        onClick={handleSubmit}
                        className='bg-accent px-6 py-2 rounded-lg text-white hover:bg-opacity-90 transition-colors'
                    >
                        Request Pickup
                    </button>
                </div>
            </div>
        </div>
    )
}

export default OnDemandRequestModal


// < div className = 'fixed inset-0 bg-opacity-50 flex justify-center items-center' >
//     <div className="bg-primary border border-gray-500 px-3 py-3 rounded-xl">
//         <div onClick={props.onClose} className="font-bold text-end text-accent2 cursor-pointer"><IoMdClose className="inline" /></div>
//         <div className='px-6 py-4 w-4xl'>

//             <div className='flex gap-20'>
//                 <div className='mb-5'>
//                     <div className='font-bold mb-5'>Address</div>
//                     <div className='w-xs border border-gray-500 rounded-lg px-4 py-2 shadow-2xl'>
//                         <div className='font-bold mb-3 capitalize opacity-50'>{user?.firstName + ' ' + user?.lastName}</div>
//                         <div className='mb-3'>{user?.address.houseNo + ', ' + user?.address.street + ', ' + user?.address.district + ', ' + user?.address.city + ', ' + user?.address.pincode}</div>
//                         <div className=''>{user?.mobile}</div>
//                     </div>

//                     <div className='flex items-center text-accent2 font-bold mt-4 '>
//                         <IoMdAdd className='inline' />&nbsp;
//                         <span>Add new Address</span>
//                     </div>
//                 </div>

//                 <div>
//                     <div className='font-bold mb-5'>Waste Types</div>
//                     <FormGroup sx={{
//                         display: 'flex', flexDirection: 'row', gap: 2,
//                     }}>
//                         {wasteTypes?.map((waste, index) => (
//                             <FormControlLabel key={index} control={<Checkbox sx={{
//                                 color: "hsl(0, 0%, 50%)",
//                                 "&.Mui-checked": { color: "#009E4F" },
//                             }} />}
//                                 label={waste.name}
//                                 checked={checkedState[index]}
//                                 onChange={() => handleCheckBoxChange(index)}
//                             />
//                         ))}
//                     </FormGroup>
//                 </div>
//             </div>

//             <div className='mt-5'>

//                 <ThemeProvider theme={Input}>
//                     <TextField
//                         // sx={{borderColor: 'blue !important' }}
//                         InputProps={{
//                             sx: { borderRadius: 1 },
//                         }}
//                         label="Approximate Weight (kg)"
//                         value={data.weight}
//                         onChange={handleWeightChange}
//                         error={!!error}
//                         helperText={error}
//                     />
//                 </ThemeProvider>
//             </div>

//             <div className='flex justify-end'>
//                 <span onClick={handleSubmit} className='bg-accent px-6 py-2 rounded-lg cursor-pointer'>Request</span>
//             </div>
//         </div>
//     </div>
//     </div >