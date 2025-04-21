import { Outlet } from "react-router-dom"
import AdminNav from "../../components/Admin/AdminNav"


const CollectorManagement = () => {
  return (
    <div className="flex">
        {/* <AdminNav /> */}

        <div className="bg-primary my-10 mr-10 rounded-t-2xl px-4 py-4 flex-1 ">
            <Outlet />
        </div>
    </div>
  )
}

export default CollectorManagement