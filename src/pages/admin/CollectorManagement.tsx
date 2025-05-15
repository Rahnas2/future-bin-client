import { Outlet } from "react-router-dom"


const CollectorManagement = () => {
  return (
    <div className="flex min-h-lvh">
        <div className="bg-primary md:mt-10 md:px-4 py-15 md:py-4 rounded-t-2xl flex-1 ">
            <Outlet />
        </div>
    </div>
  )
}

export default CollectorManagement