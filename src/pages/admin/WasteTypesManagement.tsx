import { fetchAllWasteTypesApi } from '@/api/adminServices'
import AdminNav from '@/components/Admin/AdminNav'
import AddWasteTypeModal from '@/components/Admin/WasteTypes/AddWasteTypeModal'
import WasteTypesTable from '@/components/Admin/WasteTypes/WasteTypesTable'
import AddBtn from '@/components/common/AddBtn'
import { fetchWasteTypes } from '@/redux/slices/wasteTypesSlice'
import { AppDispatch } from '@/redux/store'
import { wasteType } from '@/types/wasteTyp'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

type Props = {}

const WasteTypesManagement = (props: Props) => {
  
  const dispatch = useDispatch<AppDispatch>()

  const [wasteTypes, setWasteTypes] = useState<wasteType[]>([])
  const [ selectedData, setSelectedData ] = useState<wasteType>()

  const [mode, setMode] = useState<'add' | 'edit'>('add')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const fetchAllWasteTypes = async () => {
      try {
        const response =  await dispatch(fetchWasteTypes()).unwrap()
        setWasteTypes(response.wasteTypes)
      } catch (error) {
        console.error('error fetching waste types ', error)
      }
    }
    fetchAllWasteTypes()
  }, [])

  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
  }

  const handleAddWasteType = (data: wasteType) => {
    setWasteTypes(prev => [data, ...prev])
  }

  const handleEditWasteType = (id: string, data: wasteType) => {
    const index = wasteTypes.findIndex(w => w._id == id)
    const updatedWasteTypes = [...wasteTypes]
    updatedWasteTypes[index] = data
    setWasteTypes(updatedWasteTypes)
  }

  const handleDeleteWasteType = (id: string) => {
    setWasteTypes(prev => prev.filter(prev => prev._id !== id))
  }

  return (
    <>
      <div className='flex'>
      
        <div className="bg-primary my-6 mr-2 rounded-t-xl px-4 py-4 flex-1 ">

          <AddBtn onOpen={handleOpen} setMode={setMode} setSelectedData={setSelectedData}   />

          <WasteTypesTable wasteTypes={wasteTypes} onOpen={handleOpen} setMode={setMode} setSelectedData={setSelectedData} handleDeleteWasteType={handleDeleteWasteType}  />

        </div>
      </div>

      {isOpen && <AddWasteTypeModal onClose={handleClose} handleAddWasteType={handleAddWasteType} handleEditWasteType={handleEditWasteType} mode={mode} data={selectedData} />}
    </>
  )
}

export default WasteTypesManagement