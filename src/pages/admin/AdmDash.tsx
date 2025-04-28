import { useDispatch } from "react-redux"
import AdminNav from "../../components/Admin/AdminNav"
import { logOut } from "../../redux/slices/authSlice"
import { AppDispatch } from "../../redux/store"
import { useNavigate } from "react-router-dom"
import AdminDashComp from "@/components/Admin/Dash/AdminDashComp"



function AdmDash() {

  return (
    <div className="flex min-h-lvh">
      <div className="bg-primary mt-10  rounded-t-2xl px-4 py-4 flex-1">

        <AdminDashComp />

      </div>

    </div>
  )
}

export default AdmDash