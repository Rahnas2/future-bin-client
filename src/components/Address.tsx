import TextField from '@mui/material/TextField';
import { ThemeProvider } from '@mui/material/styles'
import Box from '@mui/material/Box';
import Input from '../themes/input';
import { AddressType } from '../types/Address';
import React from 'react';

const Address: React.FC<{   address: AddressType }> = ({ address }) => {
    return (
        <div>
            <div className='font-bold mb-4'>Address Information</div>
            <ThemeProvider theme={Input}>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { my: 1, width: "95%", }
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField label="Street Address"
                        name='street-address'
                        value={address.street}
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                    />
                    <TextField label="House No/ Building Name"
                        name='house-no'
                        value={address.houseNo}
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        '& > :not(style)': { my: 1, mr:2, width: "45.5%", }
                    }}
                >
                    <TextField label="District"
                        name='district'
                        value={address.district}
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                    />
                    <TextField label="City"
                        name='city'
                        value={address.city}
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                    />

                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        '& > :not(style)': { my: 1, mr: 2 }
                    }}
                >
                    <TextField label="Pincode"
                        name='pincode'
                        value={address.pincode}
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                    />
                </Box>

            </ThemeProvider>

        </div>
    )
}

export default Address