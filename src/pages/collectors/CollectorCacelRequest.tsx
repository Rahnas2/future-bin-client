
import { cancelPickupRequestApi } from '@/api/userService'
import BackBtn from '@/components/common/BackBtn'
import ButtonSpinner from '@/components/common/ButtonSpinner'
import Input from '@/themes/input'
import { requestCancellationType } from '@/types/requestCancellation'
import { cancelReasons } from '@/utils/cancelResons'
import { uploadImage } from '@/utils/uploadImage'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, ThemeProvider } from '@mui/material'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { MdAdd } from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router-dom'

type Props = {}

const CollectorCacelRequest = (props: Props) => {

    const location = useLocation()
    const navigate = useNavigate()

    const { id } = location.state
    const [data, setData] = useState({
        reason: '',
        description: ''
    })
    const [image, setImage] = useState<File | null>(null)

    const [isLoading, setIsLoading] = useState(false)


    const handleDataChange = (e: SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleProofImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleSubmit = async () => {
        try {

            setIsLoading(true)
            if (data.reason.trim() === '') return toast.error('please choose a reason')

            if (!image) return toast.error('proof image is required')


            const dataToSend: Partial<requestCancellationType> = {
                reason: data.reason
            }

            if (data.description.trim() !== '') {
                dataToSend.description = data.description.trim()
            }

            const ImgURL = await uploadImage(image, 'cancelProof')
            dataToSend.proof = ImgURL?.url as string

            await cancelPickupRequestApi(id, dataToSend)

            navigate(-1)
            toast.success('success')
        } catch (error) {
            console.error('error submit the cancel reason ', error)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className='px-4 py-4'>
            <BackBtn />
            <div className='flex gap-20 my-10 mx-6'>
                <div className='flex flex-col gap-10'>
                    <ThemeProvider theme={Input} >
                        <div>
                            <span className='block mb-5'>Reason ?</span>
                            <FormControl className='w-sm m-0 border-blue-500'>
                                <InputLabel id="reason">Choose a Reason</InputLabel>
                                <Select
                                    labelId="reason"
                                    name='reason'
                                    label="Select reason"
                                    value={data.reason}
                                    onChange={handleDataChange}
                                    sx={{
                                        '.MuiOutlinedInput-notchedOutline': {
                                            borderWidth: '2px',
                                            borderColor: 'var(--color-gray-500)',
                                        }, backgroundColor: 'transparent'
                                    }}

                                >
                                    {cancelReasons().collector.map((reason, index) => (
                                        <MenuItem key={index} value={reason}>{reason}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>

                        <div>
                        <label className="block mb-2">Description</label>
                        <TextField
                            name="description"
                            value={data?.description || ''}
                            onChange={handleDataChange}
                            placeholder='description'
                            multiline
                            rows={4}
                            fullWidth
                            variant="outlined"
                            sx={{
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderWidth: '2px',
                                    borderColor: 'var(--color-gray-500)',
                                }, backgroundColor: 'tantransparent !import'
                            }}
                        />
                    </div>

                    </ThemeProvider>   
                </div>

                <div className='flex gap-8'>
                    <div>
                        <div className='mb-8'>Add Proof</div>
                        <label htmlFor="cancel-request-proof"
                            className='border-2 border-dashed border-gray-500 px-2 py-2 rounded-sm flex items-center justify-center'>
                            {image ? <img className='p-1 h-48 w-xs rounded-sm' src={URL.createObjectURL(image)} alt="" /> :
                                <span>Add Image&nbsp; <MdAdd className='inline' /></span>
                            }
                        </label>
                        <input type="file" id='cancel-request-proof' onChange={handleProofImg} accept='image/*' hidden />
                    </div>
                </div>

            </div>

            <div className='mt-10 flex justify-center'>
                <button disabled={isLoading} onClick={handleSubmit} className='bg-accent px-4 py-1 rounded-sm'>
                    {isLoading ? <ButtonSpinner /> : 'Submit'}</button>
            </div>

        </div>
    )
}

export default CollectorCacelRequest