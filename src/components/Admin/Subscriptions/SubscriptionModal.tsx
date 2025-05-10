import { IoMdClose } from "react-icons/io"
import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, ThemeProvider } from "@mui/material"
import Input from "../../../themes/input"
import { useState } from "react"
import { addSubscriptionApi, editSubscriptionApi } from "../../../api/adminServices"
import toast from "react-hot-toast"
import { subscriptionSchema, subscriptionSchemaType } from "../../../validations/addSubscription"
import { ValidationError } from "yup"
import { subscriptionType } from "../../../types/SubscriptionType"
import { subscriptionFrequencies } from "@/utils/subscriptionFrequencies"




type Props = {
    onClose: () => void
    onAddSubscription: (newSubscription: subscriptionType) => void
    onEditSubscription: (updatedSubscription: subscriptionType) => void
    subscription: subscriptionType | null
}

const SubscriptionModal = (props: Props) => {

    const [data, setData] = useState(props.subscription || {
        name: "",
        price: "",
        description: "",
        frequency: "",
        totalPickups: 0,
        features: [] as string[]
    })

    const [errors, setErrors] = useState<Partial<subscriptionSchemaType>>({})

    const [newFeature, setNewFeature] = useState<string>("")

    const handleDataChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })

        try {
            await subscriptionSchema.validateAt(name, { ...data, [name]: value })
            setErrors({ ...errors, [name]: null })
        } catch (error) {

            if (error instanceof ValidationError) {
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


            if (props.subscription) {
                const updatedData: Partial<subscriptionType> = {
                    _id: props.subscription._id
                }
                
                //send only updated data 
                if(props.subscription.name !== data.name){
                    updatedData['name'] = data.name
                }
                if(props.subscription.price !== data.price){
                    updatedData['price'] = data.price
                }
                if(props.subscription.description !== data.description){
                    updatedData['description'] = data.description
                }
                if(props.subscription.frequency !== data.frequency){
                    updatedData['frequency'] = data.frequency
                }
                if(props.subscription.totalPickups !== data.totalPickups){
                    updatedData['totalPickups'] = data.totalPickups
                }

                updatedData['features'] = data.features.filter(val => val !== "")

                const result = await editSubscriptionApi(updatedData)
                props.onEditSubscription(result.subscription)
                toast.success(result.message)
            } else {
                const result = await addSubscriptionApi(data)
                props.onAddSubscription(result.subscription)  
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

                        <Box sx={{ mt: 4, mb: 4, display: 'flex', gap: 8 }} >
                            <FormControl className='w-3xs' error={!!errors.frequency}>
                                <InputLabel id="frequency">Select Freequency</InputLabel>
                                <Select
                                    labelId="frequency"
                                    name='frequency'
                                    label="Select frequency"
                                    value={data.frequency}
                                    onChange={handleDataChange}
                                >
                                    {subscriptionFrequencies().map((frequency, index) => (
                                        <MenuItem key={index} value={frequency}>{frequency}</MenuItem>
                                    ))}
                                </Select>
                                {errors.frequency && <FormHelperText>{errors.frequency}</FormHelperText>}
                            </FormControl>

                            <TextField
                                label="Total Pickups"
                                name="totalPickups"
                                value={data.totalPickups}
                                onChange={handleDataChange}
                                error={!!errors.totalPickups}
                                helperText={errors.totalPickups}
                            />
                        </Box>

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
        </div >
    )
}

export default SubscriptionModal