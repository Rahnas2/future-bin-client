import React, { useEffect, useState } from 'react'
import CollectorNav from '../../components/collectors/CollectorNav'
import ProfileCard from '../../components/ProfileCard'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../redux/slices'
import { AppDispatch } from '../../redux/store'
import { editProfileSchema, editProfileType } from '../../validations/validation'
import { ValidationError } from 'yup'
import { ThemeProvider } from '@emotion/react'
import { Box, TextField } from '@mui/material'
import { FaEdit } from 'react-icons/fa'
import { fetchCollectorProfile } from '../../redux/slices/collectorSlice'
import Input from '../../themes/input'
import Address2 from '../../components/common/Address2'
import IDCard from '../../components/collectors/IDCard'
import VehicleDetails from '../../components/collectors/VehicleDetails'
import toast from 'react-hot-toast'
import { editProfileApi } from '../../api/userService'

type Props = {}

function CollectorProfile({ }: Props) {
    const [isLoading, setIsloading] = useState(true)
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result: any = await dispatch(fetchCollectorProfile()).unwrap()
                console.log('result ', result)
                const { firstName, lastName, email, mobile } = result.collector
                setData({ firstName, lastName, email, mobile })
                setIsloading(false)
            } catch (error) {
                console.log('fetch collector profile error ', error)
            }

            // console.log('user ', user)
        }
        fetchUser()
    }, [])

    const dispatch = useDispatch<AppDispatch>()

    const [isEdit, setIsEdit] = useState(false)

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobile: ''
    })
    const { collector } = useSelector((state: IRootState) => state.collector)

    //for update image
    const [selectedImage, setSelectedImage] = useState<File | null>(null)

    const [errors, setErrors] = useState<Partial<editProfileType>>({})

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setData({ ...data, [name]: value })

        try {
            await editProfileSchema.validateAt(name, { ...data, [name]: value })

            setErrors({ ...errors, [name]: null })

        } catch (error) {
            console.error('error ', error)
            if (error instanceof ValidationError) {
                setErrors({ ...errors, [name]: error.message })
            }
        }
    }



    const handleSelectedImage = async (file: File) => {
        setSelectedImage(file)
        try {
            await editProfileSchema.validateAt("profileImage", { ...data, profileImage: file });
            setErrors({ ...errors, profileImage: null })

        } catch (error) {
            console.error('error ', error)
            if (error instanceof ValidationError) {
                setErrors({ ...errors, profileImage: error.message })
            }
        }
    }

    const handleSubmit = async () => {
        try {
            console.log('selected image ', selectedImage)
            await editProfileSchema.validate({ ...data, profileImage: selectedImage }, { abortEarly: false })

            const formData = new FormData();
            // Append text fields to FormData
            if(data.firstName !== collector?.firstName){
                formData.append('firstName', data.firstName);
            }
            if(data.lastName !== collector?.lastName){
                formData.append('lastName', data.lastName);
            }
            if(data.email !== collector?.email){
                formData.append('email', data.email);
            }
            if(data.mobile !== collector?.mobile){
                formData.append('mobile', data.mobile);
            }
            
            // Append the image file if it exists
            if (selectedImage) {
                formData.append('profileImage', selectedImage);
            }

            const formDataLen = Array.from(formData.entries()).length;

            if(!formDataLen){
                toast('you are not updated any data', {icon: '⚠️'})
                return
            }

            console.log('from data from submitted ', ...formData)

            await editProfileApi(formData)
            toast.success('updated profile')

        } catch (error) {
            if (error instanceof ValidationError) {

                const ValidationErrors: { [key: string]: string } = {}

                error.inner.forEach(err => {
                    if (err.path) {
                        console.log('error ', err)
                        ValidationErrors[err.path] = err.message
                    }
                })
                console.log('catch block ', ValidationErrors)
                setErrors(ValidationErrors)
            } else {
                console.error('error edit proifle ', error)
            }
        }
    }

    if (isLoading) {
        return <div>loading...</div>
    }

    return (
        <div className='flex'>
            <CollectorNav />
            <div className="bg-primary my-10 mr-10 rounded-t-2xl px-4 py-4 flex-1 ">
                <ProfileCard isEdit={isEdit} image={collector?.image} firstName={data.firstName} lastName={data.lastName} email={data.email} mobile={data.mobile} selectedImage={selectedImage} setSelectedImage={handleSelectedImage} imgValError={errors.profileImage} />

                {/* personal infromation */}
                <div className="mt-8">
                    <div className="font-bold">Personal Information</div>
                    <div onClick={() => setIsEdit(!isEdit)} aria-disabled={isEdit} className={`flex justify-end items-center gap-2 mb-10 cursor-pointer ${isEdit ? 'opacity-100' : 'opacity-50'}`}>
                        <FaEdit className=" inline text-lg" />
                        <span >Edit Profile</span>
                    </div>

                    <ThemeProvider theme={Input}>
                        <Box
                            className='grid grid-cols-2 gap-x-20 gap-y-10 pr-5 '
                            sx={{ my: 3, }}
                        >
                            <TextField id="outlined-basic"
                                label="First name"
                                variant="outlined"
                                name="firstName"
                                value={data.firstName}
                                onChange={isEdit ? handleChange : undefined}
                                error={!!errors.firstName}
                                helperText={errors.firstName}
                            />

                            <TextField id="outlined-basic"
                                label="Last name"
                                variant="outlined"
                                name='lastName'
                                value={data.lastName}
                                onChange={isEdit ? handleChange : undefined}
                                error={!!errors.lastName}
                                helperText={errors.lastName}
                            />

                            <TextField id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                name="email"
                                value={data.email}
                                onChange={isEdit ? handleChange : undefined}
                                error={!!errors.email}
                                helperText={errors.email}
                            />

                            <TextField id="outlined-basic"
                                label="Mobile"
                                variant="outlined"
                                name='mobile'
                                value={data.mobile}
                                onChange={isEdit ? handleChange : undefined}
                                error={!!errors.mobile}
                                helperText={errors.mobile}
                            />
                        </Box>

                    </ ThemeProvider>

                    <div className="text-accent2 font-bold text-sm">Change password?</div>

                    {isEdit && <div className="flex justify-center my-5 "><span onClick={handleSubmit} className="px-8 py-2 bg-accent rounded-xl cursor-pointer">Submit</span></div>}
                </div>

                {/* id card images */}
                <IDCard front={collector?.details?.idCard.front} back={collector?.details?.idCard.back} />

                {/* address detals */}
                <Address2 street={collector?.address?.street} houseNo={collector?.address?.houseNo} district={collector?.address?.district} city={collector?.address?.city} pincode={collector?.address?.pincode}/>

                {/* vehicle details */}
                <VehicleDetails model={collector?.details?.vehicleDetails.model} licensePlate={collector?.details?.vehicleDetails.licensePlate} image={collector?.details?.vehicleDetails.image}/>

            </div>
        </div>
    )
}

export default CollectorProfile