import { Outlet } from "react-router-dom"


const CollectorManagement = () => {
  return (
    <div className="flex min-h-lvh">
        <div className="bg-primary mt-10 mr-10 rounded-t-2xl px-4 py-4 flex-1 ">
            <Outlet />
        </div>
    </div>
  )
}

export default CollectorManagement