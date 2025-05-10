
import React, { useState } from "react"
import { IoIosSearch } from "react-icons/io"

type Props = {
    onSearch: (val: string) => void
}
const AdminSearch: React.FC<Props> = ({ onSearch }) => {

    const [value, setValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        onSearch(e.target.value);
    };


    return (
        <div className="md:w-md flex justify-between items-center justify-self-center border opacity-50 rounded-lg mb-10">
            <input onChange={handleChange} value={value} className="outline-none px-4 py-2 text-xl w-full " placeholder="search..." type="search" />
            <button className="bg-primary text-white border-l rounded-r-lg px-4 py-2 text-2xl"><IoIosSearch className="inline" /></button>
        </div>
    )
}

export default AdminSearch