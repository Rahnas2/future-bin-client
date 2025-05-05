
import { chatListType } from '@/types/ChatListType'
import { useEffect, useState } from 'react';
import { CiImageOn } from "react-icons/ci";
import { FaUserCircle } from 'react-icons/fa';
import { IoIosSearch } from 'react-icons/io';

type Props = {
  chatList: chatListType[]
  handleSelectedChat: (data: chatListType) => void
}

const ChatUserList = (props: Props) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredChatList, setFilteredChatList] = useState<chatListType[]>(props.chatList);

  // Update filtered list when chatList changes or search query changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredChatList(props.chatList);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = props.chatList.filter(chat =>
        `${chat.firstName} ${chat.lastName}`.toLowerCase().includes(query) ||
        chat.lastMessage.message.toLowerCase().includes(query)
      );
      setFilteredChatList(filtered);
    }
  }, [searchQuery, props.chatList]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className=''>
      <div className="flex justify-between items-center justify-self-center border opacity-50 rounded-lg mb-10 mx-5 shadow-2xs">
        <input onChange={handleSearchChange} className="outline-none px-4 py-2 text-lg w-full " placeholder="search..." type="search" />
        <button className="bg-primary text-white border-l rounded-r-lg px-4 py-2 text-2xl"><IoIosSearch className="inline" /></button>
      </div>

      <div className='flex flex-col gap-5 mt-6'>
        {filteredChatList.map(chat => (
          <div key={chat._id} onClick={() => props.handleSelectedChat(chat)} className='flex w-full gap-3 px-6 py-2  rounded-2xl cursor-pointer'>

            {!chat.image ? <FaUserCircle className='w-13 h-13' /> : <img className='w-13 h-13 rounded-full' src={chat.image} alt="" />}

            <div className='flex-1 min-w-0'>
              <div>{chat.firstName + ' ' + chat.lastName}</div>
              {chat.lastMessage.isImage ? <div className='text-sm opacity-70 '>
                <CiImageOn className='inline' />&nbsp;&nbsp;<span>Image</span></div> :
                <div className='opacity-50 truncate '>{chat.lastMessage.message}</div>}
            </div>

            <div className='opacity-50 text-end'>yestruday</div>

          </div>
        ))}
      </div>


    </div>
  )
}

export default ChatUserList