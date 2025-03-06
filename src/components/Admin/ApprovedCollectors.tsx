
import AdminSearch from './AdminSearch'
import TableHead from '../TableHead'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { fetchCollectors } from '../../redux/slices/adminSlice'
import UsersData from '../UsersData'



const ApprovedCollectors = () => {

  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchCollectors('accepted'))
  },[])

  return (
    <div className="bg-seconday py-6 rounded-xl">
      <div className="font-bold mb-8 px-6">All Collectos</div>

      <AdminSearch />

      <table className='w-full'>
        <TableHead status={true} />
        <UsersData role='collector' status={true}/>
      </table>
    </div>
  )
}

export default ApprovedCollectors