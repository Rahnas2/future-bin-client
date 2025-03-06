import { Box, TextField, ThemeProvider } from "@mui/material"
import Input from "../../themes/input"
import { AddressType } from "../../types/Address"


type props = {
    street: string | undefined,
    houseNo: string | undefined,
    district: string | undefined,
    city: string | undefined,
    pincode: number | undefined,
}


const Address2= (props: props) => {
    return (
        <div className="my-8" >
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
                        value={props.street}
                    // onChange={handleChange}
                    // error={!!errors.firstName}
                    // helperText={errors.firstName}
                    />

                    <TextField id="outlined-basic"
                        label="house no / building name"
                        variant="outlined"
                        name='lastName'
                        value={props.houseNo}
                    // onChange={handleChange}
                    // error={!!errors.lastName}
                    // helperText={errors.lastName}
                    />

                    <TextField id="outlined-basic"
                        label="district"
                        variant="outlined"
                        name="firstName"
                        value={props.district}
                    // onChange={handleChange}
                    // error={!!errors.firstName}
                    // helperText={errors.firstName}
                    />

                    <TextField id="outlined-basic"
                        label="city"
                        variant="outlined"
                        name='lastName'
                        value={props.city}
                    // onChange={handleChange}
                    // error={!!errors.lastName}
                    // helperText={errors.lastName}
                    />

                    <TextField id="outlined-basic"
                        label="pincode"
                        variant="outlined"
                        name="firstName"
                        value={props.pincode}
                    // onChange={handleChange}
                    // error={!!errors.firstName}
                    // helperText={errors.firstName}
                    />

                </Box>

            </ ThemeProvider>
        </div >
    )
}

export default Address2