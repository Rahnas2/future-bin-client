import React, { useEffect, useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { Box, TextField } from '@mui/material'
import Input from '../../themes/input';

import { MdAdd, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { BiCurrentLocation } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { completeProfile } from '../../redux/slices/authSlice';
import { AppDispatch } from '../../redux/store';
import { completeProfileSchema, completeProfileType } from '../../validations/validation';
import toast from 'react-hot-toast';
import { ValidationError } from 'yup';
import { IRootState } from '@/redux/slices';
import ButtonSpinner from '@/components/common/ButtonSpinner';
import { initiateSocket } from '@/services/socket';
import { fetchUserProfile } from '@/redux/slices/userSlice';
import { fetchCollectorProfile } from '@/redux/slices/collectorSlice';

import { geocodeFullAddress, getAddressFromCoordinates, getAddressSuggestions, getCoordinatesFromSuggestion } from '@/api/geocoding';
import { getPosition } from '@/utils/getCurrentPosition';


const CompleteProfile = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const { isLoading } = useSelector((state: IRootState) => state.auth)
    const [isFetchingLocation, setIsFetchingLocation] = useState(false);

    const { Role, Email } = location.state
    const role = Role

    const [mobile, setMobile] = useState('')
    const [profileImg, setProfileImg] = useState<File | null>(null)

    // const [error, setError] = useState<completeProfileType>({})
    type ErrorType<T> = {
        [K in keyof T]?: ExcludeUndefined<T[K]> extends object ?
        (ExcludeUndefined<T[K]> extends File ? string : ErrorType<ExcludeUndefined<T[K]>>) :
        string;
    };

    const [error, setError] = useState<ErrorType<completeProfileType>>({});

    const [geocodeTimer, setGeocodeTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
    const [suggestions, setSuggestions] = useState<any[]>([]);

    type IdCardType = {
        front: File | null;
        back: File | null;
    };

    const [idCard, setIdCard] = useState<IdCardType>({
        front: null,
        back: null
    })

    const [address, setAddress] = useState({
        street: '',
        houseNo: '',
        district: '',
        city: '',
        pincode: 0,
        location: {
            type: '',
            coordinates: [0, 0]
        }
    })

    type ExcludeUndefined<T> = T extends undefined ? never : T;



    const getCurrentAddress = async () => {
        try {
            setIsFetchingLocation(true);
            const coords = await getPosition()

            const response = await getAddressFromCoordinates(coords.latitude, coords.longitude)

            const address = response.data.address

            const { road, state_district, village, town, neighbourhood, postcode } = address
            const newAddress = {
                street: road || neighbourhood || '',
                houseNo: '',
                district: state_district || '',
                city: village || town || '',
                pincode: postcode || 0,
                location: {
                    type: 'Point',
                    coordinates: [coords.longitude, coords.latitude],
                },
            };

            setAddress(newAddress)

            try {
                await completeProfileSchema.validateAt('address', { ...dataToValidate, address: newAddress });
                setError((prevErrors) => ({
                    ...prevErrors,
                    address: undefined, // Clear all address-related errors
                }));
            } catch (validationError) {
                if (validationError instanceof ValidationError) {
                    const addressErrors: Record<string, string> = {};
                    validationError.inner.forEach((err) => {
                        if (err.path?.startsWith('address.')) {
                            const field = err.path.split('.')[1];
                            addressErrors[field] = err.message;
                        }
                    });
                    setError((prevErrors) => ({
                        ...prevErrors,
                        address: addressErrors,
                    }));
                }
            }

        } catch (error) {
            console.error('error getting current position ', error)
        } finally {
            setIsFetchingLocation(false);
        }
    }

    const [vehicleDetails, setVehicleInfo] = useState({
        model: '',
        licensePlate: ''
    })

    const [vehicleImg, setVehicleImg] = useState<File | null>(null)

    const dataToValidate = {
        mobile,
        address,
        profileImg,
        idCard: role === 'collector' ? idCard : undefined,
        vehicleDetails: role === 'collector' ? vehicleDetails : undefined,
        vehicleImg: role === 'collector' ? vehicleImg : undefined,
        role,
    };

    useEffect(() => {
        return () => {
            if (geocodeTimer) {
                clearTimeout(geocodeTimer);
            }
        };
    }, [geocodeTimer]);

    //handle profile image changes 
    const handleProfileImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProfileImg(e.target.files[0])
            try {
                console.log('changing image ')
                await completeProfileSchema.validateAt('profileImg', { ...dataToValidate, profileImg: e.target.files[0] })
                setError((prevError) => ({
                    ...prevError,
                    ['profileImg']: undefined
                }))
                console.log('success')
            } catch (error) {
                if (error instanceof ValidationError) {
                    console.log('fald image validation ')
                    setError((prevError) => ({
                        ...prevError,
                        ['profileImg']: error.message
                    }))
                }
            }
        }
    }

    //handle id card images change
    const handleIdCard = async (e: React.ChangeEvent<HTMLInputElement>, side: 'front' | 'back') => {
        if (e.target.files && e.target.files[0]) {
            setIdCard(prev => ({
                ...prev,
                [side]: e.target.files![0]
            }));

            try {
                await completeProfileSchema.validateAt(`idCard.${side}`, { ...dataToValidate, idCard: { ...idCard, [side]: e.target.files[0] } });
                setError((prevError) => ({
                    ...prevError,
                    idCard: {
                        ...prevError.idCard,
                        [side]: null
                    }
                }))
            } catch (error) {
                if (error instanceof ValidationError) {
                    setError((prevError) => ({
                        ...prevError,
                        idCard: {
                            ...prevError.idCard,
                            [side]: error.message
                        }
                    }))
                }
            }
        }
    };

    //handle vehicle image changees
    const handleVehicleImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setVehicleImg(e.target.files[0])
            try {
                await completeProfileSchema.validateAt('vehicleImg', { ...dataToValidate, vehicleImg: e.target.files[0] })
                setError((prevError) => ({
                    ...prevError,
                    ['vehicleImg']: undefined
                }))
            } catch (error) {
                if (error instanceof ValidationError) {
                    setError((prevError) => ({
                        ...prevError,
                        ['vehicleImg']: error.message
                    }))
                }
            }

        }
    }

    //handle mobile 
    const handleMobile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setMobile(e.target.value)
        try {
            await completeProfileSchema.validateAt('mobile', { ...dataToValidate, mobile: e.target.value })
            setError((prevError) => ({
                ...prevError,
                ['mobile']: undefined
            }))
        } catch (error) {
            if (error instanceof ValidationError) {
                setError((prevError) => ({
                    ...prevError,
                    ['mobile']: error.message
                }))
            }
        }
    }

    //handle address change
    const handleAddress = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        const newAddress = {
            ...address,
            [name]: value
        };

        setAddress(newAddress)

        try {
            await completeProfileSchema.validateAt(`address.${name}`, { ...dataToValidate, address: { ...address, [name]: value } })
            setError((prevErrors) => ({
                ...prevErrors,
                address: {
                    ...prevErrors?.address,
                    [name]: null
                }
            }));

            if (name !== 'houseNo') {
                console.log('address suggstions')
                if (geocodeTimer) clearTimeout(geocodeTimer);

                // Set a new timer to prevent excessive API calls
                const timer = setTimeout(async () => {

                    const query = [newAddress.street, newAddress.district, newAddress.city, newAddress.pincode].filter(Boolean).join(", ");
                    const fetchedSuggestions = await getAddressSuggestions(query);
                    setSuggestions(fetchedSuggestions);
                }, 2000);

                setGeocodeTimer(timer);

            }
        } catch (error) {
            if (error instanceof ValidationError) {
                setError((prevErrors) => ({
                    ...prevErrors,
                    address: {
                        ...prevErrors?.address, // Ensure previous errors persist
                        [name]: error.message, // Dynamically set the specific field error
                    }
                }));
            }
        }
    }

    //when User Select From Suggestion 
    const handleSuggestionClick = async (place: any) => {
        const { address: suggestedAddress } = place;
        const newAddress = {
            street: suggestedAddress.road || suggestedAddress.neighbourhood || '',
            houseNo: '',
            district: suggestedAddress.state_district || '',
            city:
                suggestedAddress.village ||
                suggestedAddress.town ||
                suggestedAddress.city ||
                '',
            pincode: suggestedAddress.postcode || 0,
            location: getCoordinatesFromSuggestion(place),
        };
    
        setAddress(newAddress);
        setSuggestions([]);
    
        // Validate the new address
        try {
            await completeProfileSchema.validateAt('address', {
                ...dataToValidate,
                address: newAddress,
            });
            setError((prevErrors) => ({
                ...prevErrors,
                address: undefined, // Clear all address errors
            }));
        } catch (validationError) {
            if (validationError instanceof ValidationError) {
                const addressErrors: Record<string, string> = {};
                validationError.inner.forEach((err) => {
                    if (err.path?.startsWith('address.')) {
                        const field = err.path.split('.')[1];
                        addressErrors[field] = err.message;
                    }
                });
                setError((prevErrors) => ({
                    ...prevErrors,
                    address: addressErrors,
                }));
            }
        }
    };


    //handle vehicle details change
    const handleVehicleDetails = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setVehicleInfo({ ...vehicleDetails, [name]: value })

        try {
            await completeProfileSchema.validateAt(`vehicleDetails.${name}`, { ...dataToValidate, vehicleDetails: { ...vehicleDetails, [name]: value } })
            setError((prevErrors) => ({
                ...prevErrors,
                vehicleDetails: {
                    ...prevErrors?.vehicleDetails,
                    [name]: null
                }
            }));
        } catch (error) {
            if (error instanceof ValidationError) {
                setError((prevErrors) => ({
                    ...prevErrors,
                    vehicleDetails: {
                        ...prevErrors?.vehicleDetails,
                        [name]: error.message
                    }
                }));
            }
        }

    }

    const handleSubmit = async () => {
        const formData = new FormData()
        formData.append('email', Email)
        formData.append('mobile', mobile)
        if (profileImg instanceof File) {
            formData.append('image', profileImg);
        }
        if (idCard.front instanceof File) {
            formData.append('idCardFront', idCard.front)
        }
        if (idCard.back instanceof File) {
            formData.append('idCardBack', idCard.back)
        }
        formData.append('address', JSON.stringify(address))
        formData.append('vehicleDetails', JSON.stringify(vehicleDetails))
        if (vehicleImg instanceof File) {
            formData.append('vehicleImage', vehicleImg)
        }


        try {
            //validation 
            await completeProfileSchema.validate(dataToValidate, { abortEarly: false })
            setError({})

            // If coordinates are missing 
            if (!address.location.coordinates[0] || !address.location.coordinates[1]) {
                console.log('hello ', address)
                const locationData = await geocodeFullAddress(address);

                if (locationData) {
                    setAddress(prev => ({
                        ...prev,
                        location: locationData,
                    }));
                } else {
                    toast.error('Unable to fetch location coordinates. Please check the address.')
                    return
                }
            }

            const result = await dispatch(completeProfile(formData)).unwrap()

            initiateSocket()

            //Fetch User Or Collector Date  
            if (result.role === 'resident') {
                await dispatch(fetchUserProfile())
            } else if (result.role === 'collector') {
                await dispatch(fetchCollectorProfile())
                toast.success(result.message)
                return
            }
        } catch (error: any) {

            //validation error
            if (error instanceof ValidationError) {
                const ValidationErrors: Record<string, any> = {};

                error.inner.forEach((err) => {
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
            } else {
                console.error('other error', error)
                error?.message && toast.error(error.message)
            }
        }

    }


    return (
        <>
            <div onClick={() => navigate(-1)} className='m-6 cursor-pointer'><MdKeyboardArrowLeft className='inline text-4xl text-accent' />&nbsp;&nbsp;Back</div>
            <div className='m-10 grid lg:grid-cols-2 gap-5'>

                {/* personal details */}
                <div>
                    <ThemeProvider theme={Input} >
                        <TextField
                            label="Mobile"
                            name='mobile'
                            className='w-xs'
                            value={mobile}
                            error={!!error.mobile}
                            helperText={error.mobile}
                            onChange={handleMobile}
                        />
                        <br /> <br />
                    </ThemeProvider>

                    {/* id card section */}
                    {role === 'collector' && <div>
                        <div className='mt-8 mb-4 font-bold'>Add ID Card</div>
                        <div className='flex flex-col lg:flex-row gap-4'>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor='idcard-front' className={`border border-dashed ${error.idCard?.front ? 'border-red-700' : ''} rounded-xl w-xs h-48 flex items-center justify-center`}>
                                    {idCard.front ? <img className='p-1 h-48 w-xs rounded-xl' src={URL.createObjectURL(idCard.front)} alt="" /> : <MdAdd className='inline text-3xl font-bold' />}

                                    <input
                                        type="file"
                                        name='idcard-front'
                                        className="hidden "
                                        id="idcard-front"
                                        accept='image/*'
                                        onChange={(e) => handleIdCard(e, 'front')}
                                    />
                                </label>
                                <span className={`text-center ${error.idCard?.front ? 'text-red-700' : 'opacity-50'}`}>{(error.idCard?.front) ? `${error.idCard.front}` : 'Front Side'}</span>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor='idcard-back' className={`border border-dashed ${error.idCard?.back ? 'border-red-700' : ''} rounded-xl w-xs h-48 flex items-center justify-center`}>
                                    {idCard.back ? <img className='p-1 h-48 w-xs rounded-xl' src={URL.createObjectURL(idCard.back)} alt="" /> : <MdAdd className='inline text-3xl font-bold' />}
                                    <input
                                        type="file"
                                        name='idcard-back'
                                        className="hidden "
                                        id="idcard-back"
                                        accept='image/*'
                                        onChange={(e) => handleIdCard(e, 'back')}
                                    />
                                </label>
                                <span className={`text-center ${error.idCard?.back ? 'text-red-700' : 'opacity-50'}`}>{(error.idCard?.back) ? `${error.idCard.back}` : 'Back Side'}</span>
                            </div>
                        </div>
                    </div>}

                    {/* add profile image section */}
                    <div className='w-xs flex flex-col mt-8'>
                        <div className='font-bold mb-4'>Add Profile</div>
                        {
                            profileImg ? <div className='mb-8'><img className='h-80 w-80 rounded-full' src={URL.createObjectURL(profileImg)} alt="" /></div> :
                                <FaUserCircle className=' mb-8 h-80 w-80' />
                            // <div className='bg-white  h-80 rounded-full mb-8'></div>
                        }
                        {error.profileImg ? <p className='text-red-700'>Only images are allowed</p> : ''}

                        <div className='opacity-50 flex justify-center'>
                            <label htmlFor="profile-img" className='border rounded-2xl py-2 w-40 text-center cursor-pointer'>
                                <MdAdd className='inline font-bold' />
                                &nbsp;&nbsp;{profileImg ? <span>Change</span> : <span>Add</span>}
                                <input type="file"
                                    id='profile-img'
                                    name='profile-img'
                                    className="hidden"
                                    accept='image/*'
                                    onChange={handleProfileImg}
                                />
                            </label>
                        </div>
                    </div>
                </div>

                {/* Address & Vehicle Information */}
                <div>

                    {/* Address */}
                    <div>
                        <div className='font-bold mb-4'>Address Information</div>
                        <ThemeProvider theme={Input}>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { my: 1, width: "80%", }
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField label="Street Address"
                                    name='street'
                                    value={address.street}
                                    error={!!error.address?.street}
                                    helperText={error.address?.street}
                                    onChange={handleAddress}
                                />
                                <TextField label="House No/ Building Name"
                                    name='houseNo'
                                    value={address.houseNo}
                                    error={!!error.address?.houseNo}
                                    helperText={error.address?.houseNo}
                                    onChange={handleAddress}
                                />
                            </Box>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { my: 1, mr: 2, width: "38.5%", }
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField label="District"
                                    name='district'
                                    value={address.district}
                                    error={!!error.address?.district}
                                    helperText={error.address?.district}
                                    onChange={handleAddress}
                                />
                                <TextField label="City"
                                    name='city'
                                    value={address.city}
                                    error={!!error.address?.city}
                                    helperText={error.address?.city}
                                    onChange={handleAddress}
                                />

                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    '& > :not(style)': { my: 1, mr: 2, width: "38.5%", }
                                }}
                            >
                                <TextField label="Pincode"
                                    name='pincode'
                                    value={address.pincode}
                                    error={!!error.address?.pincode}
                                    helperText={error.address?.pincode}
                                    onChange={handleAddress}
                                />
                                <div className='flex justify-center'>
                                    <button
                                        onClick={getCurrentAddress}
                                        disabled={isFetchingLocation}
                                        className='bg-accent py-2 px-4 rounded-lg flex items-center justify-center cursor-pointer min-w-40'
                                    >
                                        {isFetchingLocation ? (
                                            <ButtonSpinner /> 
                                        ) : (
                                            <>
                                                <BiCurrentLocation className='inline' />&nbsp;Choose Location
                                            </>
                                        )}
                                    </button>
                                </div>
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

                        </ThemeProvider>

                    </div>

                    {/* Vehicle details */}
                    {role === 'collector' && <div>
                        <div className='mt-8 mb-4 font-bold'>Vehicle Information</div>

                        <ThemeProvider theme={Input}>
                            <Box
                                className='flex flex-col'
                                component="form"
                                sx={{ '& > :not(style)': { my: 1, width: "40%", } }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField label="Vehicle Model"
                                    name='model'
                                    value={vehicleDetails.model}
                                    error={!!error.vehicleDetails?.model}
                                    helperText={error.vehicleDetails?.model}
                                    onChange={handleVehicleDetails}
                                />
                                <TextField
                                    inputProps={{ style: { textTransform: 'uppercase' } }}
                                    label="License Plate"
                                    name='licensePlate'
                                    value={vehicleDetails.licensePlate}
                                    error={!!error.vehicleDetails?.licensePlate}
                                    helperText={error.vehicleDetails?.licensePlate}
                                    onChange={handleVehicleDetails}
                                    InputProps={{
                                        style: { textTransform: "uppercase" },
                                    }}
                                />
                            </Box>
                        </ThemeProvider>

                        <div className='mt-4 mb-4'>Add Image</div>
                        <div>
                            <label htmlFor='vehicle-img' className={`border border-dashed rounded-xl w-xs h-48 flex items-center justify-center ${error.vehicleImg ? 'border-red-700' : ''}`}>
                                {vehicleImg ? <img className='p-1 w-xs h-48 rounded-xl' src={URL.createObjectURL(vehicleImg)} alt="" /> : <MdAdd className='inline text-3xl font-bold' />}
                                <input
                                    type="file"
                                    name='vehicle-img'
                                    className="hidden "
                                    id="vehicle-img"
                                    accept='image/*'
                                    onChange={handleVehicleImg}
                                />
                            </label>
                            {error.vehicleImg && <p className='text-red-700'>Vehicle image is required</p>}
                        </div>
                    </div>}

                </div>
            </div >

            <div className='flex justify-center'>
                <button disabled={isLoading} onClick={handleSubmit} className='bg-accent py-2 px-8 rounded-lg flex items-center justify-center font-bold mt-15 mb-3 cursor-pointer w-40'>
                    {isLoading ? <ButtonSpinner /> :
                        <div>Proceed&nbsp;<MdKeyboardArrowRight className='inline' /></div>
                    }
                </button>
            </div>
            {role === 'collector' && <p className='text-center opacity-50 text-xs mb-4'>Note: Registeration approval will take maximum of 2 days</p>}
        </>
    )
}

export default CompleteProfile