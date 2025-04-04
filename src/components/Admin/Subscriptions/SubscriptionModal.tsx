import { IoIosAdd, IoMdClose } from "react-icons/io"
import { Box, Button, TextField, ThemeProvider } from "@mui/material"
import Input from "../../../themes/input"
import { useState } from "react"
import { addSubscriptionApi } from "../../../api/adminServices"
import toast from "react-hot-toast"
import { subscriptionSchema, subscriptionSchemaType } from "../../../validations/addSubscription"
import { ValidationError } from "yup"
import { subscriptionType } from "../../../types/SubscriptionType"




type Props = {
    onClose: () => void
    handleAddSubscription: (newSubscription: subscriptionType) => void
}

const SubscriptionModal = (props: Props) => {

    const [data, setData] = useState({
        name: "",
        price: "",
        description: "",
        features: [] as string[]
    })

    const [errors, setErrors] = useState<Partial<subscriptionSchemaType>>({})

    const [newFeature, setNewFeature] = useState<string>("")

    const handleDataChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })

        try {
            await subscriptionSchema.validateAt(name, {...data, [name]: value})
            setErrors({...errors, [name]: null})
        } catch (error) {

            if(error instanceof ValidationError){
            setErrors({ ...errors, [name]: error.message })
            }
        }
    }

    //add new features
    const handleAddFeature = () => {
        if (newFeature.trim() && !data.features?.includes(newFeature.trim().toLowerCase())) {
            setData(prev => ({
                ...prev,
                features: [...prev.features, newFeature.trim().toLowerCase()]
            }))
            setNewFeature("")
        }
    }

    //for remove features
    const handleRemoveFeature = (index: number) => {
        const featuresCopy = [...data.features]
        featuresCopy.splice(index, 1)
        setData(prev => ({
            ...prev,
            features: featuresCopy
        }))
    }

    //handle submit
    const handleSubmit = async () => {
        try {
            
            //validation
            await subscriptionSchema.validate(data, { abortEarly: false })
            setErrors({})
            if (!data.features.length) return toast('⚠️ please add atlease one features')
 
            const result = await addSubscriptionApi(data)

            props.handleAddSubscription(result.subscription)
            props.onClose()
            toast.success(result.message)
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
            }
            toast.error(error?.response?.data?.message || 'somthing went wrong')
            console.log('error ', error)
        }
    }
    return (
        <div className="fixed flex inset-0 justify-center items-center">
            <div className="bg-primary border border-gray-500 max-w-xl rounded-xl pr-4 pt-4">
                <div onClick={props.onClose} className="font-bold text-end text-accent2 cursor-pointer text-2xl"><IoMdClose className="inline" /></div>

                <div className=" px-10 py-8 ">
                    <ThemeProvider theme={Input} >
                        <Box sx={{ mt: 2, mb: 4, display: 'flex', gap: 8 }}
                        >
                            <TextField
                                inputProps={{ style: { textTransform: 'uppercase' } }}
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

                        <TextField
                            label="Description"
                            name="description"
                            value={data.description}
                            onChange={handleDataChange}
                            error={!!errors.description}
                            helperText={errors.description}
                            fullWidth
                        />

                        <div className="mt-8 mb-3">Features</div>
                        <div className="flex flex-wrap gap-2 mb-5">
                            {
                                data.features.map((val, index) => (
                                    <div key={index} className="flex gap-4 bg-accent2 text-primary pl-4 pr-2 mb-3 rounded-2xl">
                                        <span>{val}</span>
                                        <span onClick={() => handleRemoveFeature(index)} className="cursor-pointer"><IoMdClose className="inline" /></span>
                                    </div>

                                ))
                            }
                        </div>

                        <div className="flex items-center gap-2">
                            <TextField
                                label="Add Features"
                                value={newFeature}
                                onChange={(e) => setNewFeature(e.target.value)}
                            />

                            <Button variant="text"
                                className="text-accent2! min-h-full!"
                                onClick={handleAddFeature}
                            >
                                Add
                            </Button>
                        </div>


                    </ ThemeProvider>

                    <div className="flex justify-center mt-8">
                        <span onClick={handleSubmit} className="bg-accent px-6 py-1 rounded-xl cursor-pointer">Submit</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SubscriptionModal