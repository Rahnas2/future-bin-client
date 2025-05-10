import { useOnDemandComplete } from '@/context/OnDemandCompleteContex'
import Input from '@/themes/input'

import { ThemeProvider } from '@emotion/react'
import { Checkbox, FormControlLabel, TextField } from '@mui/material'
import React from 'react'



const ManageWasteTypes = () => {

    const { pickupRequest, setPickupRequest } = useOnDemandComplete();

    //handle remove waste types
    const handleRemveWasteType = (name: string) => {
        const prevWasteTypes = [...pickupRequest.wasteTypes]
        const updatedWasteTypes = prevWasteTypes.filter((w => w.name !== name))

        setPickupRequest(prev => ({...prev , wasteTypes: updatedWasteTypes}))
    }

    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        const updatedWasteTypes = [...pickupRequest.wasteTypes]
        updatedWasteTypes[index].weight = parseInt(e.target.value)

        setPickupRequest(prev => ({...prev , wasteTypes: updatedWasteTypes}))
    }

    return (
        <div>
            <div className='mb-5'>Manage Waste Collection</div>
            <div className='space-y-4'>
                {pickupRequest.wasteTypes.map((waste, index) => (
                    <div key={index} className='flex items-center justify-between'>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked
                                    onChange={() => handleRemveWasteType(waste.name)}
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
                                        (${waste.price}/kg)
                                    </span>
                                </div>
                            }
                        />
                        <ThemeProvider theme={Input}>
                            <TextField
                                type="number"
                                label="Weight (kg)"
                                variant="outlined"
                                size="small"
                                value={waste.weight}
                                onChange={(e) => {handleWeightChange(e, index)}}
                                inputProps={{ min: 1, step: 1 }}
                                sx={{ width: '100px' }}
                            />
                        </ThemeProvider>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ManageWasteTypes