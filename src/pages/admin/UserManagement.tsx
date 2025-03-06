  import { useEffect, useState } from "react"
  import AdminNav from "../../components/Admin/AdminNav"
  import { useDispatch, useSelector } from "react-redux"
  import { AppDispatch } from "../../redux/store"
  import { fetchUsers } from "../../redux/slices/adminSlice"

  import axiosInstance from "../../api/axiosInstance"
  import UserDetailModal from "../../components/UserDetailModal"
  import { UserType } from "../../types/UserType"
  import { IoIosSearch } from "react-icons/io";
import UsersData from "../../components/UsersData"


  const UserManagement = () => {

    const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const dispatch = useDispatch<AppDispatch>()
    const admin = useSelector((state: any) => state.admin)
    console.log('admin ', admin)

    useEffect(() => {
      dispatch(fetchUsers())
    }, [dispatch])

    const getUserDetail = async (userId: string) => {
      try {
        const response = await axiosInstance.get(`/admin/user/view-detail?userId=${userId}`)
        setSelectedUser(response.data.user);
        setIsModalOpen(true);
      } catch (error) {
        console.log('error ', error)
      }
    }

    const closeModal = () => {
      setIsModalOpen(false);
      setSelectedUser(null);
    };

    return (
      <div className="flex">
        <AdminNav />
        <div className="bg-primary my-10 mr-10 rounded-t-2xl px-4 py-4 flex-1 ">

          <div className="bg-seconday py-6 rounded-xl">

            <div className="font-bold mb-8 px-6">All User</div>

            <div className="w-md flex justify-between items-center justify-self-center border opacity-50 rounded-lg mb-10">
              <input className="rounded-lg px-4 py-2 text-xl" placeholder="search..." type="search" />
              <button className="bg-primary text-white border-l rounded-r-lg px-4 py-2 text-2xl"><IoIosSearch className="inline" /></button>
            </div>

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
                <UsersData role="resident" getUserDetail={getUserDetail} status={false}/>
                
            </table>
            {/* <div className="flex justify-between pb-2 border-b opacity-50">
              <span>#</span>
              <span>Profile</span>
              <span>Full Name</span>
              <span>Mobile</span>
              <span>Email</span>
              <span>District</span>
              <span>Area</span>
              <span>Status</span>
              {/* <span className=""></span> */}
            {/* </div> */}

            {/* {users && users.map((user: any, index: any) => (
              <div key={user._id} className="flex justify-between py-2 border-b">
                <span>{index + 1}</span>
                <span>
                  {user.image && <img className="rounded-full h-17 w-17 object-cover" src={user.image} alt="" />}
                </span>
                <span>{user.firstName + user.lastName}</span>
                <span>{user.mobile}</span>
                <span>{user.email}</span>
                <span>{user.address.district}</span>
                <span>{user.address.city}</span>
                <span>{user.isBlock}</span>
                <span onClick={() => getUserDetail(user._id)} className="px-4 py-2 bg-accent cursor-pointer">
                  View Detail
                </span>
              </div>
            ))} */}

          </div>
        </div>
      </div>
      {isModalOpen && (
        <UserDetailModal user={selectedUser} onClose={closeModal} />
      )}
    </div>
  )
}

export default UserManagement