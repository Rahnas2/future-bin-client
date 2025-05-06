import { useOnDemandComplete } from '@/context/OnDemandCompleteContex'
import useFetchWasteTypes from '@/hooks/useFetchWasteTypes'
import Input from '@/themes/input'
import { onDemandWasteType } from '@/types/onDemandWasteType'
import { wasteType } from '@/types/wasteTyp'
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, ThemeProvider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { IoMdClose } from 'react-icons/io'

type Props = {
    onClose: () => void
}

const AddWasteTypeModal = (props: Props) => {
    const { pickupRequest, setPickupRequest } = useOnDemandComplete();

    const [wasteTypes, setWasteTypes] = useState<wasteType[]>([])
    const [selectedWasteType, setSelectedWasteType] = useState({
        name: "",
        weight: 0,
    })

    const [addedWasteTypes, setAddedWasteTypes] = useState<onDemandWasteType[]>([])

    const [loading, setLoading] = useState(true);
    const fetchedWasteTypes = useFetchWasteTypes()

    console.log('fetched wate types ', fetchedWasteTypes)

    useEffect(() => {
        console.log('hello...... fetching....')
        const updateWasteTypes = async () => {
            setLoading(true);
            try {
                setWasteTypes(fetchedWasteTypes || []);
                setLoading(false)
            } catch (error) {
                console.error('error fetching waste types ', error);
                setLoading(false)
            }
        };
        updateWasteTypes();
    }, [fetchedWasteTypes]);

    const weights = Array.from({ length: 50 }, (_, i) => i + 1);
    console.log('weights ', weights)

    const handleDataChange = (e: SelectChangeEvent) => {
        const { name, value } = e.target
        setSelectedWasteType(prev => ({
            ...prev,
            [name]: value
        }))
    }

    //handle add new waste types
    const handleAddWaste = () => {

        if (selectedWasteType.name === '' || selectedWasteType.weight === 0) {
            return toast.error('name and weight are required');
        }

        if (pickupRequest.wasteTypes.some(w => w.name === selectedWasteType.name)) {
            return toast.error(`${selectedWasteType.name} already added`)
        }

        const selectedWasteObj = wasteTypes.find(w => w.name === selectedWasteType.name);

        if (!selectedWasteObj) {
            return toast.error('Invalid waste type selected');
        }

        setAddedWasteTypes(prev => ([
            ...prev,
            { ...selectedWasteType, price: selectedWasteObj.price }
        ]));
    }

    const handleSubmit = () => {
        const prevWasteTypes = [...pickupRequest.wasteTypes];
        const updatedWasteTypes = [...prevWasteTypes, ...addedWasteTypes];
        setPickupRequest(prev => ({
            ...prev,
            wasteTypes: updatedWasteTypes
        }));
        props.onClose()
    }


    if (loading) return <div>Loading...</div>;

    return (
        <div className='fixed inset-0 flex justify-center items-center  backdrop-blur-xs z-10'>
            <div className='border border-gray-600 px-4 py-4 rounded-lg'>
                <div onClick={props.onClose} className="font-bold text-end text-accent2 cursor-pointer"><IoMdClose className="inline" /></div>
                <div className='flex gap-4 md:gap-8 px-2 md:px-4 py-2 md:py-4'>
                    <ThemeProvider theme={Input}>
                        <FormControl className='w-40 md:w-3xs  m-0 border-blue-500'>
                            <InputLabel id="name">Select Waste Type</InputLabel>
                            <Select
                                labelId="name"
                                name='name'
                                label="select waste type"
                                onChange={handleDataChange}
                                value={selectedWasteType.name}
                            >
                                <MenuItem value="" disabled>
                                    Select a waste type
                                </MenuItem>
                                {wasteTypes.length && wasteTypes.map((waste) => (
                                    <MenuItem key={waste._id} value={waste.name}>{waste.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl className='w-35 md:w-2xs m-0 border-blue-500'>
                            <InputLabel id="weight">select weight</InputLabel>
                            <Select
                                labelId="weight"
                                name='weight'
                                label="select weight"
                                onChange={handleDataChange}
                                // value={selectedWasteType.weight.toString()}
                                defaultValue=''
                            >
                                <MenuItem value="" disabled>
                                    Select a weight
                                </MenuItem>
                                {weights.length && weights.map((weight, index) => (
                                    <MenuItem key={index} value={weight}>{weight}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Button variant="text"
                            className="text-accent2! min-h-full!"
                            onClick={handleAddWaste}
                        >
                            Add
                        </Button>
                    </ ThemeProvider>
                </div>

                <div>
                    <h1 className='mb-5'>Added Wastes</h1>
                    {addedWasteTypes.map((waste, index) => (
                        <div key={index} className='flex gap-5 bg-seconday border-1 border-gray-700 rounded-md p-3 m-2'>
                            <span>{waste.name}</span>
                            <span>$ {waste.price}</span>
                            <span>{waste.weight} (Kg)</span>
                        </div>
                    ))}
                </div>

                <div className='flex justify-center'>
                    <button onClick={handleSubmit} className='px-5 py-1 bg-accent rounded-md'>Done</button>
                </div>
            </div>
        </div>
    )
}

export default AddWasteTypeModal