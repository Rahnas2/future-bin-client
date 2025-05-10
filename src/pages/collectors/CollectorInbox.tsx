import { fetchChatListApi } from "@/api/userService"
import BackBtn from "@/components/common/BackBtn"
import ChatUserList from "@/components/common/Chat/ChatUserList"
import ChatWindow from "@/components/common/Chat/ChatWindow"
import EmptyChatList from "@/components/common/Chat/EmptyChatList"
import ComponentSpinner from "@/components/common/ComponentSpinner"
import { getSocket } from "@/services/socket"
import { chatListType } from "@/types/ChatListType"
import { useEffect, useState } from "react"


const CollectorInbox = () => {

  const socket = getSocket()
  const [isLoading, setIsLoading] = useState(true)
  const [chatList, setChatList] = useState<chatListType[]>([])
  const [selectedChat, setSelectedChat] = useState<chatListType>()
  const [showChatWindowOnMobile, setShowChatWindowOnMobile] = useState(false)

  //fetch chat list 
  useEffect(() => {
    const fetchChatList = async () => {
      try {
        setIsLoading(true)
        const response = await fetchChatListApi()
        setChatList(response.chatList)
        setSelectedChat(response.chatList[0])
      } catch (error) {
        console.log('error fetching chat list collector side ', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchChatList()
  }, [])
  console.log('chat list ', chatList)

  //update chat list
  useEffect(() => {
    socket.on('chat update', (updatedChat: chatListType) => {
      setChatList(prev => {
        const updatedList = prev.map(chat =>
          chat._id === updatedChat._id ? updatedChat : chat
        );
        return updatedList.some(chat => chat._id === updatedChat._id)
          ? updatedList
          : [...updatedList, updatedChat];
      })
    });

    return () => {
      socket.off('chat update');
    };
  }, []);

  const handleSelectedChat = (chat: chatListType) => {
    setSelectedChat(chat)
    setShowChatWindowOnMobile(true)
  }

  const handleBackToList = () => {
    setShowChatWindowOnMobile(false)
  }

  if (isLoading) return <ComponentSpinner />

  return (
    <div className='px-6 py-4 h-screen overflow-hidden'>
      <BackBtn />
      {chatList.length === 0 ? <EmptyChatList /> :
        <div className='flex justify-center px-10 py-6 gap-5 h-full'>

          {/* Chat List */}
          <div className={` ${showChatWindowOnMobile ? 'hidden' : 'block'} md:block bg-seconday w-xs py-8 rounded-lg`}>
            <ChatUserList chatList={chatList} handleSelectedChat={handleSelectedChat} />
          </div>

          {/* Chat Window */}
          <div className={` ${showChatWindowOnMobile ? 'block' : 'hidden'} md:block flex  bg-seconday flex-1 rounded-lg h-[650px]`}>
            <ChatWindow
              selectedChat={selectedChat as chatListType}
              onBack={handleBackToList}
              role="collector"
            />
          </div>

        </div>
      }

    </div>
  )
}

export default CollectorInbox