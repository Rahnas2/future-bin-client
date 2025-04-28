import { fetchAllWasteTypesApi } from '@/api/adminServices'
import AdminNav from '@/components/Admin/AdminNav'
import AdminSearch from '@/components/Admin/AdminSearch'
import AddWasteTypeModal from '@/components/Admin/WasteTypes/AddWasteTypeModal'
import WasteTypesTable from '@/components/Admin/WasteTypes/WasteTypesTable'
import AddBtn from '@/components/common/AddBtn'
import Pagination from '@/components/common/Pagination'
import { fetchWasteTypes } from '@/redux/slices/wasteTypesSlice'
import { AppDispatch } from '@/redux/store'
import { wasteType } from '@/types/wasteTyp'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

type Props = {}

const WasteTypesManagement = (props: Props) => {

  const dispatch = useDispatch<AppDispatch>()

  const [wasteTypes, setWasteTypes] = useState<wasteType[]>([])
  const [selectedData, setSelectedData] = useState<wasteType>()

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchTerm, setSerachTerm] = useState("")
  const [debouncedTerm, setDebouncedTerm] = useState("");

  const [mode, setMode] = useState<'add' | 'edit'>('add')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const fetchAllWasteTypes = async () => {
      try {
        const response = await dispatch(fetchWasteTypes({ page: currentPage, limit: 10, search: debouncedTerm })).unwrap()
        setWasteTypes(response.wasteTypes)
        setTotalPages(response.totalPages)
      } catch (error) {
        console.error('error fetching waste types ', error)
      }
    }
    fetchAllWasteTypes()
  }, [dispatch, currentPage, debouncedTerm])

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm)
      setCurrentPage(1)
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm])


  // Handle Search 
  const handleSearch = (val: string) => {
    setSerachTerm(val)
  }

  // Handle Modal
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
      <div className='flex min-h-lvh'>
        <div className="py-4 flex-1 bg-primary mt-10 mr-10 rounded-t-2xl px-4 ">

          <div className="bg-seconday py-6 rounded-xl">

            <div className="font-medium mb-8 px-6">All Waste Types</div>

            <div className='flex items-center justify-evenly'> <AdminSearch onSearch={handleSearch} /> <AddBtn onOpen={handleOpen} setMode={setMode} setSelectedData={setSelectedData} /></div>

            <WasteTypesTable wasteTypes={wasteTypes} onOpen={handleOpen} setMode={setMode} setSelectedData={setSelectedData} handleDeleteWasteType={handleDeleteWasteType} />

            <div className="mt-6"><Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /></div>
          </div>

        </div>
      </div>

      {isOpen && <AddWasteTypeModal onClose={handleClose} handleAddWasteType={handleAddWasteType} handleEditWasteType={handleEditWasteType} mode={mode} data={selectedData} />}
    </>
  )
}

export default WasteTypesManagement