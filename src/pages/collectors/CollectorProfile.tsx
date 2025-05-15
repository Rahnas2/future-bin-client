import React, { useEffect, useState } from 'react'
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
import ChangePasswordModal from '../../components/common/ChangePasswordModal'
import RegisterationStatus from '@/components/collectors/RegisterationStatus'
import ComponentSpinner from '@/components/common/ComponentSpinner'
import ButtonSpinner from '@/components/common/ButtonSpinner'

type Props = {}

function CollectorProfile({ }: Props) {
    const [isLoading, setIsloading] = useState(true)
    const dispatch = useDispatch<AppDispatch>()
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

        }
        fetchUser()
    }, [dispatch])


    const [isEdit, setIsEdit] = useState(false)

    // Show loading for Edit Api request
    const [isEditing, setIsEditing] = useState(false)

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

    //for change password modal
    const [isOpen, setIsOpen] = useState(false)
    const handleOpen = () => {
        setIsOpen(true)
    }

    const handleClose = () => {
        setIsOpen(false)
    }

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
            if (data.firstName !== collector?.firstName) {
                formData.append('firstName', data.firstName);
            }
            if (data.lastName !== collector?.lastName) {
                formData.append('lastName', data.lastName);
            }
            if (data.email !== collector?.email) {
                formData.append('email', data.email);
            }
            if (data.mobile !== collector?.mobile) {
                formData.append('mobile', data.mobile);
            }

            // Append the image file if it exists
            if (selectedImage) {
                formData.append('profileImage', selectedImage);
            }

            const formDataLen = Array.from(formData.entries()).length;

            if (!formDataLen) {
                toast('you are not updated any data', { icon: '⚠️' })
                return
            }

            console.log('from data from submitted ', ...formData)

            setIsEditing(true)
            await editProfileApi(formData)
            toast.success('updated profile')

        } catch (error: any) {
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
                error.response.data.message ? toast.error(error.response.data.message) : toast.error('something went wrong')
            }
        } finally {
            setIsEditing(false)
        }
    }

    return (
        <div className='flex min-h-lvh'>
            <div className="bg-primary md:mt-10 md:mr-5 px-4 py-10 md:py-5 rounded-t-2xl  flex-1 ">
                {isLoading ? <ComponentSpinner /> :
                    <>
                        {collector?.details?.approvalStatus !== 'approved' || !collector.details.isStripeEnabled ?
                            <RegisterationStatus status={collector?.details?.approvalStatus!} stripeAccountId={collector?.details?.stripeAccountId!} /> : <></>}

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
                                    className='grid md:grid-cols-2 gap-x-5 md:gap-x-20 gap-y-6 md:gap-y-10 md:pr-5 '
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

                            <div onClick={handleOpen} className="text-accent2 font-bold text-sm cursor-pointer">Change password?</div>

                            {isEdit && <div className="flex justify-center my-5 "><button disabled={isEditing} onClick={handleSubmit} className="flex w-30 justify-center py-2 bg-accent rounded-xl cursor-pointer">
                            {isEditing ? <ButtonSpinner/> : <span>Submit</span>}   
                            </button>
                            </div>}

                            {/* change password modal */}
                            {isOpen && <ChangePasswordModal onClose={handleClose} />}

                        </div>

                        {/* id card images */}
                        <IDCard front={collector?.details?.idCard.front} back={collector?.details?.idCard.back} />

                        {/* address detals */}
                        <Address2 street={collector?.address?.street} houseNo={collector?.address?.houseNo} district={collector?.address?.district} city={collector?.address?.city} pincode={collector?.address?.pincode} />

                        {/* vehicle details */}
                        <VehicleDetails model={collector?.details?.vehicleDetails.model} licensePlate={collector?.details?.vehicleDetails.licensePlate} image={collector?.details?.vehicleDetails.image} />
                    </>
                }
            </div>
        </div>
    )
}

export default CollectorProfile