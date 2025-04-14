import Address from '@/components/Address'
import Address2 from '@/components/common/Address2'
import { useOnDemandComplete } from '@/context/OnDemandCompleteContex'
import Input from '@/themes/input'
import { AddressType } from '@/types/Address'
import { pickupRequestType } from '@/types/PickupRequest'
import { TextField, ThemeProvider } from '@mui/material'
import React from 'react'

type Props = {
}

const RequestActionPersonalInfo = (props: Props) => {

    const { pickupRequest } = useOnDemandComplete();


    return (
        <div className='flex flex-col gap-5'>
            <div className='font-medium'>Abount User</div>
            <div>
            <ThemeProvider theme={Input}>
                <TextField
                name="name"
                label="name"
                defaultValue={pickupRequest.name}
                slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                 /> 
                 <TextField
                name="mobile"
                label="mobile"
                defaultValue={pickupRequest.mobile}
                slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                 />
            </ThemeProvider>
            </div>

            <div className=''>
                <Address address={pickupRequest.address}/>
            </div>
            <div></div>
        </div>
    )
}

export default RequestActionPersonalInfo