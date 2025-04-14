import { changeWorkStatus } from '@/redux/slices/collectorSlice'
import { AppDispatch } from '@/redux/store'
import React from 'react'
import { useDispatch } from 'react-redux'

type Props = {
    status: 'active' | 'inactive'
}

const WorkStatus = (props: Props) => {

    const dispatch = useDispatch<AppDispatch>()
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target
        dispatch(changeWorkStatus(value))
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