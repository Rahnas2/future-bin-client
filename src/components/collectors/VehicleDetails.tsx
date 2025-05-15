import { ThemeProvider } from '@emotion/react'
import { Box, TextField } from '@mui/material'
import Input from '../../themes/input'

type Props = {
    model: string | undefined,
    licensePlate: string | undefined,
    image: string | undefined
}

const VehicleDetails = (props: Props) => {
    return (
        <div className='mt-8'>
            <div className='font-medium'>Vehicle Information</div>
            <ThemeProvider theme={Input}>
                <Box
                    className='grid md:w-[45%] gap-8 mt-6'
                    sx={{}}
                >
                    <TextField id="outlined-basic"
                        label="Model"
                        variant="outlined"
                        name="model"
                        value={props.model}
                    />

                    <TextField id="outlined-basic"
                        label="licensePlate"
                        variant="outlined"
                        name='licensePlate'
                        value={props.licensePlate}
                    />
                </ Box >
            </ ThemeProvider>

            <div className='w-full md:w-xs border border-dashed p-2 mt-6 rounded-md'>
                <img className='h-80 w-full md:w-xs rounded-md' src={props.image} alt="" />
            </div>
        </div>
    )
}

export default VehicleDetails