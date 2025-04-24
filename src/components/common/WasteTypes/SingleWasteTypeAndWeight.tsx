import Input from '@/themes/input'
import { onDemandWasteType } from '@/types/onDemandWasteType'
import { Checkbox, FormControlLabel, TextField, ThemeProvider } from '@mui/material'

type Props = {
    waste: onDemandWasteType
}

const SingleWasteTypeAndWeight = (props: Props) => {
    return (
        <div className='flex items-center justify-between'>
            <FormControlLabel
                control={
                    <Checkbox
                        checked
                        // onChange={() => handleRemveWasteType(waste.name)}
                        sx={{
                            color: "hsl(0, 0%, 50%)",
                            "&.Mui-checked": { color: "#009E4F" },
                        }}
                    />
                }
                label={
                    <div className='flex items-center'>
                        <span>{props.waste.name}</span>
                        <span className='text-gray-500 ml-2 text-sm'>
                            (${props.waste.price}/kg)
                        </span>
                    </div>
                }
            />
            <ThemeProvider theme={Input}>
                <TextField
                    type="number"
                    label="Weight (kg)"
                    variant="outlined"
                    size="small"
                    value={props.waste.weight}
                    aria-readonly
                    // onChange={(e) => { handleWeightChange(e, index) }}
                    inputProps={{ min: 1, step: 1 }}
                    sx={{ width: '100px' }}
                />
            </ThemeProvider>
        </div>
    )
}

export default SingleWasteTypeAndWeight