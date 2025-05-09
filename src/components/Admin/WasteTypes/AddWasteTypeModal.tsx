import { addWasteTypeApi, editWasteTypeApi } from '@/api/adminServices'
import axiosInstance from '@/api/axiosInstance'
import { addWasteType, editWasteType } from '@/redux/slices/wasteTypesSlice'
import { AppDispatch } from '@/redux/store'
import Input from '@/themes/input'
import { wasteType } from '@/types/wasteTyp'
import { addWasteTypeSchema } from '@/validations/addWasteType'
import { Box, TextField, ThemeProvider } from '@mui/material'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { IoMdClose } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { ValidationError } from 'yup'

type Props = {
    onClose: () => void,
    handleAddWasteType: (data: wasteType) => void
    handleEditWasteType: (id: string, data: wasteType) => void
    mode: 'add' | 'edit'
    data?: wasteType
}

const AddWasteTypeModal = (props: Props) => {

    const dispatch = useDispatch<AppDispatch>()

    const [data, setData] = useState({
        _id: props.data?._id || '',
        name: props.data?.name || '',
        price: props.data?.price || 0
    })
    const [errors, setErrors] = useState<Partial<wasteType>>({})

    //handle data changes
    const handleDataChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setData({ ...data, [name]: value })
    }


    //add waste type
    const handleSubmit = async () => {
        try {

            //validation 
            await addWasteTypeSchema.validate(data, { abortEarly: false })
            setErrors({})

            //cal api according to the mode
            if(props.mode === 'add'){
               const response =  await dispatch(addWasteType({name: data.name, price: data.price})).unwrap()
               props.handleAddWasteType(response.wasteType)
            }else{
                const result = await dispatch(editWasteType(data)).unwrap()
                props.handleEditWasteType(data._id, result.updatedWasteType)
                toast.success(result.message)
            }
                

            props.onClose()
        } catch (error: any) {

            //validation errors 
            if (error instanceof ValidationError) {
                const ValidationErrors: { [key: string]: string } = {}

                error.inner.forEach(err => {
                    if (err.path) {
                        ValidationErrors[err.path] = err.message
                    }
                })

                setErrors(ValidationErrors)
                return
            }else {
                toast.error(error)
            }

            console.error('error adding waste type ', error)
            
        }
    }

    return (
        <div className="fixed flex  inset-0 justify-center items-center">
            <div className="bg-primary border border-gray-500 max-w-xl rounded-xl pr-4 pt-4 pb-6">
                <div onClick={props.onClose} className="font-bold text-end text-accent2 cursor-pointer text-2xl"><IoMdClose className="inline" /></div>

                <div className=" px-6 py-8 ">
                    <ThemeProvider theme={Input} >
                        <Box sx={{ mt: 2, mb: 4, display: 'flex', gap: 8 }}
                        >
                            <TextField
                                label="Name"
                                name="name"
                                value={data.name}
                                onChange={handleDataChange}
                                error={!!errors.name}
                                helperText={errors.name}

                            />

                            <TextField
                                label="Price"
                                name="price"
                                value={data.price}
                                onChange={handleDataChange}
                                error={!!errors.price}
                                helperText={errors.price}
                            />
                        </Box>
                    </ ThemeProvider>
                </div>

                <div className="flex justify-center ">
                    <span onClick={handleSubmit} className="bg-accent px-6 py-1 rounded-lg cursor-pointer">Submit</span>
                </div>

            </div>



        </div>
    )
}

export default AddWasteTypeModal