
import { cancelPickupRequestApi } from '@/api/userService'
import Input from '@/themes/input'
import { requestCancellationType } from '@/types/requestCancellation'
import { cancelReasons } from '@/utils/cancelResons'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, ThemeProvider } from '@mui/material'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

type Props = {
    onClose: () => void
    pickupRequestId: string
    onCancelSuccess: (data: requestCancellationType) => void
}

const CancelPickupRequestModal: React.FC<Props> = ({ onClose, pickupRequestId, onCancelSuccess }) => {

    const [data, setData] = useState({
        reason: '',
        description: ''
    })

    const handleDataChange = (e: SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSubmit = async () => {
        try {

            if (data.reason.trim() === '') return toast.error('please choose a reason')

            const dataToSend: Partial<requestCancellationType> = {
                reason: data.reason
            }

            if (data.description.trim() !== '') {
                dataToSend.description = data.description.trim()
            }

            await cancelPickupRequestApi(pickupRequestId, dataToSend)

            onCancelSuccess({
                reason: dataToSend.reason!,
                description: dataToSend.description,
                cancelledBy: 'resident', 
            })

            onClose()

            toast.success('success')

        } catch (error) {
            console.error('error submit the cancel reason ', error)
            toast.error('error')
        }
    }

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-primary rounded-lg shadow-lg w-full max-w-md p-6 flex flex-col gap-8">
                <ThemeProvider theme={Input} >
                    <FormControl className='w-full border-blue-500 mb-8'>
                        <InputLabel id="reason">Choose a Reason</InputLabel>
                        <Select
                            labelId="reason"
                            name='reason'
                            label="Select reason"
                            value={data.reason}
                            onChange={handleDataChange}
                            fullWidth
                        >
                            {cancelReasons().user.map((reason, index) => (
                                <MenuItem key={index} value={reason}>{reason}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

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
                        />
                    </div>
                </ThemeProvider>

                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-500 text-gray-200 rounded-md hover:bg-gray-500 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent3 hover:text-seconday transition-colors"
                    >
                        Submit
                    </button>
                </div>

            </div>
        </div>
    )
}

export default CancelPickupRequestModal