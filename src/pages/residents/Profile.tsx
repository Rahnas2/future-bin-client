
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ThemeProvider } from '@mui/material/styles'
import Input from '../../themes/input';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { IRootState } from "../../redux/slices";
import { fetchUserProfile } from "../../redux/slices/userSlice";
import ProfileCard from "../../components/ProfileCard";

import { FaEdit } from "react-icons/fa";
import { editProfileSchema, editProfileType } from "../../validations/validation";
import { ValidationError } from "yup";

import { editProfileApi } from "../../api/userService";
import toast from "react-hot-toast";
import ChangePasswordModal from "../../components/common/ChangePasswordModal";
import ButtonSpinner from "@/components/common/ButtonSpinner";


function Profile() {

    const [isLoading, setIsloading] = useState(true)

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobile: ''
    })



    const { user } = useSelector((state: IRootState) => state.user)

    const dispatch = useDispatch<AppDispatch>()

    const [errors, setErrors] = useState<Partial<editProfileType>>({})

    // Mode (eidt or normal)
    const [isEdit, setIsEdit] = useState(false)

    // Show loading for Edit Api request
    const [isEditing, setIsEditing] = useState(false)

    //for change password modal
    const [isOpen, setIsOpen] = useState(false)
    const handleOpen = () => {
        setIsOpen(true)
    }

    const handleClose = () => {
        setIsOpen(false)
    }


    useEffect(() => {
        if (user) {
            const { firstName, lastName, email, mobile } = user
            setData({ firstName, lastName, email, mobile })
            setIsloading(false)
        } else {
            const fetchUser = async () => {
                try {
                    const result: any = await dispatch(fetchUserProfile()).unwrap()
                    console.log('result ', result)
                    const { firstName, lastName, email, mobile } = result.user
                    setData({ firstName, lastName, email, mobile })
                    setIsloading(false)
                } catch (error) {
                    console.log('fetch user profile error ', error)
                }
            }
            fetchUser()
        }
    }, [])

    console.log('data...', data)

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

    const [selectedImage, setSelectedImage] = useState<File | null>(null)

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
            await editProfileSchema.validate({ ...data, profileImage: selectedImage }, { abortEarly: false })

            const formData = new FormData();
            // Append text fields to FormData
            if (data.firstName !== user?.firstName) {
                formData.append('firstName', data.firstName);
            }
            if (data.lastName !== user?.lastName) {
                formData.append('lastName', data.lastName);
            }
            if (data.email !== user?.email) {
                formData.append('email', data.email);
            }
            if (data.mobile !== user?.mobile) {
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

    if (isLoading) {
        return <div>loading...</div>
    }

    return (
        <>
            <div className="md:bg-seconday flex-1 md:py-15 px-4 md:px-8 rounded-md">

                <ProfileCard isEdit={isEdit} image={user?.image} firstName={data.firstName} lastName={data.lastName} email={data.email} mobile={data.mobile} selectedImage={selectedImage} setSelectedImage={handleSelectedImage} imgValError={errors.profileImage} />

                {/* personal infromation */}
                <div className="mt-8">
                    <div className="font-medium md:font-bold">Personal Information</div>
                    <div onClick={() => setIsEdit(!isEdit)} aria-disabled={isEdit} className={`flex justify-end items-center gap-2 mb-10 cursor-pointer ${isEdit ? 'opacity-100' : 'opacity-50'}`}>
                        <FaEdit className=" inline text-lg" />
                        <span >Edit Profile</span>
                    </div>

                    <ThemeProvider theme={Input}>
                        <Box
                            className='grid grid-cols-2 gap-x-7 md:gap-x-20 gap-y-10 md:pr-5 '
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

                    {isEdit && <div className="flex justify-center my-5 "><button disabled={isEditing} onClick={handleSubmit} className="flex w-30 justify-center py-2 bg-accent rounded-lg cursor-pointer">
                        {isEditing ? <ButtonSpinner/> : <span>Submit</span>}   
                    </button>
                    </div>}
                </div>

                {/* address informaiton */}
                <div className="my-8">
                    <div className="mb-6 font-bold">Address Information</div>
                    <ThemeProvider theme={Input}>
                        <Box
                            className='grid grid-cols-2 gap-x-20 gap-y-8 pr-5 '
                            sx={{}}
                        >
                            <TextField id="outlined-basic"
                                label="street"
                                variant="outlined"
                                name="firstName"
                                value={user?.address?.street}
                            // onChange={handleChange}
                            // error={!!errors.firstName}
                            // helperText={errors.firstName}
                            />

                            <TextField id="outlined-basic"
                                label="house no / building name"
                                variant="outlined"
                                name='lastName'
                                value={user?.address?.houseNo}
                            // onChange={handleChange}
                            // error={!!errors.lastName}
                            // helperText={errors.lastName}
                            />

                            <TextField id="outlined-basic"
                                label="district"
                                variant="outlined"
                                name="firstName"
                                value={user?.address?.district}
                            // onChange={handleChange}
                            // error={!!errors.firstName}
                            // helperText={errors.firstName}
                            />

                            <TextField id="outlined-basic"
                                label="city"
                                variant="outlined"
                                name='lastName'
                                value={user?.address?.city}
                            // onChange={handleChange}
                            // error={!!errors.lastName}
                            // helperText={errors.lastName}
                            />

                            <TextField id="outlined-basic"
                                label="pincode"
                                variant="outlined"
                                name="firstName"
                                value={user?.address?.pincode}
                            // onChange={handleChange}
                            // error={!!errors.firstName}
                            // helperText={errors.firstName}
                            />

                        </Box>

                    </ ThemeProvider>
                </div>

                {/* change password modal */}
                {isOpen && <ChangePasswordModal onClose={handleClose} />}
            </div>
        </>
    )
}

export default Profile