import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { InputLabel, MenuItem, FormControl, Box, TextField } from '@mui/material'
import Input from '../../themes/input';

import { MdAdd, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdLocationOn } from 'react-icons/md'

const CompleteProfile = () => {
    const availableDistrict = ['kannur', 'malappuram', 'calicut']
    return (
        <>
            <div className='m-6'><MdKeyboardArrowLeft className='inline text-4xl text-accent' />&nbsp;&nbsp;Back</div>
            <div className='m-10 grid lg:grid-cols-2 gap-5'>

                {/* personal details */}
                <div>
                    <ThemeProvider theme={Input} >
                        <TextField label="Mobile" className='w-xs' />
                        <br /> <br />
                        <FormControl className='w-xs'>
                            <InputLabel id="demo-simple-select-label">Age</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Age"

                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </ThemeProvider>

                    <div className='mt-8 mb-4 font-bold'>Add ID Card</div>
                    <div className='flex flex-col lg:flex-row gap-4'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor='idcard-front' className='border border-dashed rounded-xl w-xs h-48 flex items-center justify-center opacity-50'>
                                <MdAdd className='inline text-3xl font-bold' />
                                <input
                                    type="file"
                                    className="hidden "
                                    id="idcard-front"
                                    accept='image/*'
                                />
                            </label>
                            <span className='text-center'>Front Side</span>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor='idcard-back' className='border border-dashed rounded-xl w-xs h-48 flex items-center justify-center opacity-50'>
                                <MdAdd className='inline text-3xl font-bold' />
                                <input
                                    type="file"
                                    className="hidden "
                                    id="idcard-back"
                                    accept='image/*'
                                />
                            </label>
                            <span className='text-center'>Back Side</span>
                        </div>
                    </div>

                    <div className='w-xs flex flex-col mt-8'>
                        <div className='font-bold mb-4'>Add Profile</div>
                        <div className='bg-white  h-80 rounded-full mb-8'></div>
                        <div className='opacity-50 flex justify-center'>
                            <label htmlFor="profile-img" className='border rounded-2xl py-2 w-40 text-center'>
                                <MdAdd className='inline' />
                                Add
                                <input type="file"
                                    id='profile-img'
                                    className="hidden"
                                    accept='image/*'
                                />
                            </label>
                        </div>
                    </div>
                </div>

                {/* Address & Vehicle Information */}
                <div>

                    {/* Address */}
                    <div>
                        <div className='font-bold mb-4'>Address Information</div>
                        <ThemeProvider theme={Input}>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { my: 1, width: "80%", }
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField label="Street Address" />
                                <TextField label="House No/ Building Name" />
                            </Box>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { my: 1, mr: 2, width: "38.5%", }
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField label="District" />
                                <TextField label="City" />

                            </Box>
                            <Box
                                component="form"
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    '& > :not(style)': { my: 1, mr: 2, width: "38.5%", }
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField label="Pincode" />
                                <div className='flex justify-center'>
                                    <button className='bg-accent py-2 px-4 rounded-lg flex items-center '><MdLocationOn className='inline' />&nbsp;&nbsp;Choose Location</button>
                                </div>
                            </Box>

                        </ThemeProvider>

                    </div>

                    {/* Vehicle details */}
                    <div>
                        <div className='mt-8 mb-4 font-bold'>Vehicle Information</div>

                        <ThemeProvider theme={Input}>
                            <Box
                                className='flex flex-col'
                                component="form"
                                sx={{ '& > :not(style)': { my: 1, width: "40%", } }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField label="Vehicle Modal" />
                                <TextField label="License Plate" />
                            </Box>
                        </ThemeProvider>

                        <div className='mt-4 mb-4'>Add Image</div>
                        <div>
                            <label htmlFor='vehicle-img' className='border border-dashed rounded-xl w-xs h-48 flex items-center justify-center opacity-50'>
                                <MdAdd className='inline text-3xl font-bold' />
                                <input
                                    type="file"
                                    className="hidden "
                                    id="vehicle-img"
                                    accept='image/*'
                                />
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex justify-center'><button className='bg-accent py-2 px-8 rounded-lg flex items-center font-bold mt-15'>Proceed&nbsp;<MdKeyboardArrowRight className='inline' /></button></div>
            <p className='text-center opacity-50 mt-3 text-xs mb-4'>Note: Registeration approval will take maximum of 2 days</p>
        </>
    )
}

export default CompleteProfile