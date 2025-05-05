import { useEffect, useState } from "react"
import AdminNav from "../../components/Admin/AdminNav"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../redux/store"
import { fetchUsers } from "../../redux/slices/adminSlice"

import axiosInstance from "../../api/axiosInstance"
import UserDetailModal from "@/components/Admin/UserManagement.tsx/Resident/UserDetailModal"
import { UserType } from "../../types/UserType"
import { IoIosSearch } from "react-icons/io";
import UsersData from "@/components/Admin/UserManagement.tsx/UsersData"
import Pagination from "@/components/common/Pagination"
import AdminSearch from "@/components/Admin/AdminSearch"
import { fetchSingleUserApi } from "@/api/adminServices"
import EmptyUsers from "@/components/Admin/UserManagement.tsx/EmptyUsers"
import { Users } from "lucide-react"


const UserManagement = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [searchTerm, setSerachTerm] = useState("")
  const [debouncedTerm, setDebouncedTerm] = useState("");


  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const fetchUsersList = async () => {
      try {
        const result = await dispatch(fetchUsers({ page: currentPage, limit: 10, search: debouncedTerm })).unwrap()
        setTotalPages(result.totalPages)
      } catch (error) {
        console.error('error fething users ', error)
      }
    }
    fetchUsersList()
  }, [dispatch, currentPage, debouncedTerm])

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm)
      setCurrentPage(1)
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const getUserDetail = async (userId: string) => {
    try {
      const result = await fetchSingleUserApi(userId)
      setSelectedUser(result.user);
      setIsModalOpen(true);
    } catch (error) {
      console.log('error fetching single user  ', error)
    }
  }


  const handleSearch = (val: string) => {
    setSerachTerm(val)
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="flex min-h-lvh">

      <div className="bg-primary mt-10 mr-10 rounded-t-2xl px-4 py-4 flex-1 ">

        <div className="bg-seconday py-6 rounded-xl">

          <div className="font-medium text-lg mb-8 px-6">All User</div>
          {totalPages === 0 ? <EmptyUsers Icon={Users} text='No Users' /> :
            <>
              <AdminSearch onSearch={handleSearch} />

              <div>
                <table className="w-full table">
                  <thead className="">
                    <tr className="border-b opacity-50">
                      <th className="pl-6 p-3 text-left">#</th>
                      <th className="p-3 text-left">Profile</th>
                      <th className="p-3 text-left">Full Name</th>
                      <th className="p-3 text-left">Mobile</th>
                      <th className="p-3 text-left">Email</th>
                      <th className="p-3 text-left">District</th>
                      <th className="p-3 text-left">Area</th>
                      <th className="pl-4 py-3 text-left"></th>
                    </tr>
                  </thead>
                  <UsersData role="resident" getUserDetail={getUserDetail} status={false} />
                </table>
              </div>
            </>
          }
          {totalPages > 0 && <div className="mt-6"><Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /></div>}
        </div>
      </div>
      {isModalOpen && (
        <UserDetailModal user={selectedUser} onClose={closeModal} />
      )}
    </div>
  )
}

export default UserManagement