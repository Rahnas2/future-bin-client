import { FiSend  } from "react-icons/fi"
import { FaRegTrashCan } from "react-icons/fa6";
type Props = {
    media: string,
    sendMessage: () => void
    handleImageRemove: () => void
}

const ChatMediaPreview = (props: Props) => {
    return (
        <div className="fixed bottom-10 flex flex-col gap-3 border p-2 border-gray-500 bg-primary shadow-2xl rounded-sm">
            <img className="h-100 w-xl object-cover" src={props.media} alt="image" />
            <div className="flex gap-5">
                <button className="bg-accent flex-1 rounded-sm cursor-pointer" onClick={props.sendMessage}>Send <FiSend className='inline' /></button>
                <button className="bg-red-5 px-2 py-1 cursor-pointer" onClick={props.handleImageRemove}><FaRegTrashCan className="inline"/></button>
            </div>
        </div>
    )
}

export default ChatMediaPreview