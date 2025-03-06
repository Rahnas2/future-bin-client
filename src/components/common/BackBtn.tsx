import { MdKeyboardArrowLeft } from "react-icons/md"
import { useNavigate } from "react-router-dom"



const BackBtn = () => {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate(-1)} className=''><MdKeyboardArrowLeft className='inline text-4xl text-accent cursor-pointer' />&nbsp;&nbsp;Back</div>
  )
}

export default BackBtn