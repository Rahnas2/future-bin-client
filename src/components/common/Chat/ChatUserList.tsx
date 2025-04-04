
import { chatListType } from '@/types/ChatListType'
import { CiImageOn } from "react-icons/ci";

type Props = {
  chatList: chatListType[]
  handleSelectedChat: (data: chatListType) => void
}

const ChatUserList = (props: Props) => {

  return (
    <div className='bg-seconday w-xs py-8 rounded-lg'>
      <div className='text-center'>
        <input className='border h-10 border-gray-500 placeholder:px-4 rounded-lg' type="search" placeholder='searach user' />
      </div>

      <div className='flex flex-col gap-5 mt-6'>
        {props.chatList.map(chat => (
          <div key={chat._id} onClick={() => props.handleSelectedChat(chat)} className='flex w-full gap-3 px-6 py-2  rounded-2xl cursor-pointer'>

            <img className='w-13 h-13 rounded-full' src={chat.image} alt="" />

            <div className='flex-1'>
              <div>{chat.firstName + ' ' + chat.lastName}</div>
              {chat.lastMessage.isImage ? <div className='text-sm opacity-70'><CiImageOn className='inline'/>&nbsp;&nbsp;<span>Image</span></div>: <div className='opacity-50'>{chat.lastMessage.message}</div>}
            </div>

            <div className='opacity-50 text-end'>yestruday</div>

          </div>
        ))}
      </div>


    </div>
  )
}

export default ChatUserList