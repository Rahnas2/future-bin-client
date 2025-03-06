
import { IoIosSearch } from "react-icons/io"

function AdminSearch() {
    return (
        <div className="w-md flex justify-between items-center justify-self-center border opacity-50 rounded-lg mb-10">
            <input className="rounded-lg px-4 py-2 text-xl" placeholder="search..." type="search" />
            <button className="bg-primary text-white border-l rounded-r-lg px-4 py-2 text-2xl"><IoIosSearch className="inline" /></button>
        </div>
    )
}

export default AdminSearch