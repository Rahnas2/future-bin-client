import { getAddressFromCoordinates, getAddressSuggestions, getCoordinatesFromSuggestion } from '@/api/geocoding'
import Input from '@/themes/input'
import { AddressType } from '@/types/Address'
import { BasePickupRequestType, pickupRequestType } from '@/types/PickupRequest'
import { getPosition } from '@/utils/getCurrentPosition'
import { changeAddressSchema } from '@/validations/changeAddress'

import { Box, Button, TextField, ThemeProvider } from '@mui/material'
import { LocateFixed } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { ValidationError } from 'yup'

type Props = {
    onClose: () => void
    onChangeAddress: (updatedData: Pick<BasePickupRequestType, 'name' | 'mobile' | 'address'>) => void
}

const ChangeAddressModal: React.FC<Props> = ({ onClose, onChangeAddress }) => {

    const [data, setData] = useState<Pick<BasePickupRequestType, 'name' | 'mobile' | 'address'>>({
        name: "",
        mobile: "",
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
    })

    const [geocodeTimer, setGeocodeTimer] = useState<ReturnType<typeof setTimeout> | null>(null)
    const [suggestions, setSuggestions] = useState<any[]>([])

    type ErrorStateType = Partial<{
        name: string;
        mobile: string;
        address: Partial<AddressType>;
    }>;
    const [error, setError] = useState<ErrorStateType>({});

    const handleDataChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        let updatedData: any
        if (name === 'name' || name === 'mobile') {
            updatedData = { ...data, [name]: value }
            setData(updatedData)
        } else {
            updatedData = { ...data, address: { ...data.address, [name]: value } }
            setData(updatedData)

            // Get Suggestions
            if (name !== 'houseNo') {
                console.log('address suggstions')
                if (geocodeTimer) clearTimeout(geocodeTimer);

                // Set a new timer to prevent excessive API calls
                const timer = setTimeout(async () => {
                    const query = [updatedData.address.street, updatedData.address.district, updatedData.address.city, updatedData.address.pincode].filter(Boolean).join(", ");
                    const fetchedSuggestions = await getAddressSuggestions(query);
                    setSuggestions(fetchedSuggestions);
                }, 2000);
                setGeocodeTimer(timer);
            }
        }

        try {
            await changeAddressSchema.validateAt(name === 'name' || name === 'mobile' ? name : `address.${name}`, updatedData)
            if (name === 'name' || name === 'mobile') {
                setError((prevError) => ({
                    ...prevError,
                    [name]: undefined
                }))
            } else {
                setError((prevErrors) => ({
                    ...prevErrors,
                    address: {
                        ...prevErrors.address,
                        [name]: undefined
                    }
                }));
            }

        } catch (validationError: any) {
            setError((prev) => ({ ...prev, [name]: validationError.message }))
        }
    }

    const handleSubmit = async () => {
        try {

            //validation 
            await changeAddressSchema.validate(data, { abortEarly: false })
            setError({})

            onChangeAddress(data)
            onClose()

        } catch (error) {
            //validation error
            if (error instanceof ValidationError) {
                const ValidationErrors: Record<string, any> = {};

                error.inner.forEach((err) => {
                    console.log('error ', error)
                    if (err.path) {
                        const pathParts = err.path.split(".");
                        let current = ValidationErrors;

                        for (let i = 0; i < pathParts.length - 1; i++) {
                            const part = pathParts[i];
                            if (!current[part]) current[part] = {}
                            current = current[part]
                        }

                        current[pathParts[pathParts.length - 1]] = err.message
                    }
                })
                console.log('validaton errors', ValidationErrors)
                setError(ValidationErrors)
            }
        }
    }

    //when User Select From Suggestion 
    const handleSuggestionClick = (place: any) => {
        const { address: suggestedAddress } = place;
        const selectedAddress = {
            street: suggestedAddress.road || suggestedAddress.neighbourhood || '',
            houseNo: '',
            district: suggestedAddress.state_district || '',
            city: suggestedAddress.village || suggestedAddress.town || suggestedAddress.city || '',
            pincode: suggestedAddress.postcode || 0,
            location: getCoordinatesFromSuggestion(place) as { type: "Point"; coordinates: [number, number] }
        }
        setData(prev => ({
            ...prev,
            address: selectedAddress
        }))

        setSuggestions([])
    };

    //Choose Current Location 
    const chooseCurrentLocation = async () => {
        try {
            console.log('choose current locaitn ')
            const coords = await getPosition()

            const response = await getAddressFromCoordinates(coords.latitude, coords.longitude)
            const address = response.data.address

            const { road, state_district, village, town, neighbourhood, postcode } = address

            const newAddress = {
                street: road || neighbourhood || '',
                houseNo: '',
                district: state_district || '',
                city: village || town || '',
                pincode: postcode,
                location: {
                    type: 'Point' as 'Point',
                    coordinates: [coords.longitude, coords.latitude] as [number, number]
                }
            }

            setData(prev => ({ ...prev, address: newAddress }))



        } catch (error) {
            toast.error('something went wrong ')
        }
    }

    return (
        <div className="fixed inset-0 flex justify-center items-center z-100">
            <div className="bg-primary rounded-lg shadow-lg w-full max-w-md p-6 border border-gray-500 max-h-[100vh]">
                <div className="flex justify-between items-center mb-4 md:mb-6">
                    <h2 className="text-lg md:text-xl font-medium md:font-semibold ">Change Address</h2>
                </div>

                <Box className="flex flex-col items-center justify-center w-full max-w-lg mx-auto p-4">

                    <ThemeProvider theme={Input}>
                        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: {xs: 2.5, md : 3} }}>
                            <TextField
                                label="Name"
                                name='name'
                                value={data.name}
                                error={!!error.name}
                                helperText={error.name}
                                onChange={handleDataChange}
                                fullWidth
                            />

                            <TextField
                                label="Street Address"
                                name="street"
                                value={data.address.street}
                                error={!!error.address?.street}
                                helperText={error.address?.street}
                                onChange={handleDataChange}
                                fullWidth
                            />

                            <TextField
                                label="House No/ Building Name"
                                name="houseNo"
                                value={data.address.houseNo}
                                error={!!error.address?.houseNo}
                                helperText={error.address?.houseNo}
                                onChange={handleDataChange}
                                fullWidth
                            />

                            <Box sx={{ display: 'flex', gap: {xs: 2, md : 3}, width: '100%', flexDirection: { xs: 'column', sm: 'row' } }}>
                                <TextField
                                    label="District"
                                    name="district"
                                    value={data.address.district}
                                    error={!!error.address?.district}
                                    helperText={error.address?.district}
                                    onChange={handleDataChange}
                                    fullWidth
                                />

                                <TextField
                                    label="City"
                                    name="city"
                                    value={data.address.city}
                                    error={!!error.address?.city}
                                    helperText={error.address?.city}
                                    onChange={handleDataChange}
                                    fullWidth
                                />
                            </Box>

                            <Box sx={{
                                display: 'flex',
                                gap: {xs: 2.5, md : 3},
                                width: '100%',
                                flexDirection: { xs: 'column', sm: 'row' },
                                alignItems: 'center'
                            }}>
                                <Box sx={{ width: '50%' }}>
                                    <TextField
                                        label="Pincode"
                                        name="pincode"
                                        value={data.address.pincode}
                                        error={!!error.address?.pincode}
                                        helperText={error.address?.pincode}
                                        onChange={handleDataChange}
                                        fullWidth
                                    />
                                </Box>

                                <Box sx={{ width: '50%' }}>
                                    <Button
                                        onClick={chooseCurrentLocation}
                                        variant="contained"
                                        fullWidth
                                        sx={{
                                            height: '40px',
                                            bgcolor: '#009E4F',
                                            '&:hover': { bgcolor: 'accent' },
                                            fontSize: '12px',
                                        }}
                                        startIcon={<LocateFixed />}
                                    >
                                        Use my location
                                    </Button>
                                </Box>
                            </Box>

                            {/* Suggestions Dropdown */}
                            {suggestions.length > 0 && (
                                <div className="border border-gray-700 p-2 rounded shadow-lg bg-primary">
                                    {suggestions.map((suggestion, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => handleSuggestionClick(suggestion)}
                                            className="cursor-pointer hover:bg-seconday p-2 "
                                        >
                                            {suggestion.display_name}
                                        </div>
                                    ))}
                                </div>
                            )}

                            <TextField
                                label="Mobile"
                                name="mobile"
                                value={data.mobile}
                                error={!!error.mobile}
                                helperText={error.mobile}
                                onChange={handleDataChange}
                                fullWidth
                            />
                        </Box>
                    </ThemeProvider>
                    
                </Box>

                <div className="flex justify-end space-x-3 mt-4 md:mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-500 text-gray-200 rounded-md hover:bg-gray-500 transition-colors"
                    >
                        Cancel
                    </button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent3 hover:text-seconday transition-colors">
                        Update
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ChangeAddressModal