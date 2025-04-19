import { updateCollectorDataApi } from '@/api/collectorServices'
import { IRootState } from '@/redux/slices'
import { changeWorkStatus } from '@/redux/slices/collectorSlice'
import { AppDispatch } from '@/redux/store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

type Props = {
    status: 'active' | 'in-active'
}

const WorkStatus = (props: Props) => {

    const dispatch = useDispatch<AppDispatch>()
    const { collector } = useSelector((state: IRootState) => state.collector)
    const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        try {
            if(!collector) return 

            const { value } = e.target
            dispatch(changeWorkStatus(value))

            console.log('value ', value)
            const result = await updateCollectorDataApi(collector.details?._id!, {status: value})
            console.log('updated collector work status result ', result)

        } catch (error) {
            console.log('error changing work status ', error)
        }



    }
    return (
        <div className="text-end">
            <label htmlFor="">Status: </label>
            <select onChange={handleChange} value={props.status} className={`outline-0 ${props.status === 'active' ? 'text-accent2' : 'text-red-600 '}`} name="" id="">
                <option disabled value={props.status} >{props.status === 'active' ? 'on-duty' : 'off-duty'}</option>
                <option value={props.status === 'active' ? 'in-active' : 'active'}>{props.status === 'active' ? 'off-duty' : 'on-duty'}</option>
            </select>

        </div>
    )
}

export default WorkStatus


