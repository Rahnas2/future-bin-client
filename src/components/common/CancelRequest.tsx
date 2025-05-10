import Input from '@/themes/input'
import { FormControl, InputLabel, Select, ThemeProvider } from '@mui/material'

const CancelRequest = () => {
    return (
        <div className='flex flex-col'>
            <div>
                <h3>Reason ?</h3>
                <ThemeProvider theme={Input}>
                    <FormControl className='w-xs'>
                        <InputLabel id="demo-simple-select-label">Select District</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            name='reason'
                            value=""
                            id="demo-simple-select"
                            label="choose a reason"

                        >
                            {/* {availableDistrict.map((district, index) => (
                                    <MenuItem key={index} value={district}>{district}</MenuItem>
                                ))} */}
                        </Select>
                    </FormControl>
                </ThemeProvider>
            </div>

            <div>
                <h3>Description</h3>
                <textarea name="" id=""></textarea>
            </div>

            <div>
                <h3>Add Proof</h3>
                <input type="image" src="" alt="" />g
            </div>

            <div>
                <button>Submit</button>
            </div>
        </div>
    )
}

export default CancelRequest