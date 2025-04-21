import { useDispatch } from "react-redux"
import AdminNav from "../../components/Admin/AdminNav"
import { logOut } from "../../redux/slices/authSlice"
import { AppDispatch } from "../../redux/store"
import { useNavigate } from "react-router-dom"



function AdmDash() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()


  const handleLogOut = async () => {
    try {
      await dispatch(logOut()).unwrap()
      navigate('/admin/login')
    } catch (error) {
      console.log('log out errror ', error)
    }
  }
  return (
    <div className="flex">
      {/* <AdminNav /> */}
      <div className=" flex p-8 justify-between">

        <div>Dahsboard</div>
        <div className="w-full flex justify-end"><span onClick={handleLogOut} className="text-end px-6 py-2 h-10 bg-accent cursor-pointer">Logout</span></div>
      </div>

    </div>
  )
}

export default AdmDash