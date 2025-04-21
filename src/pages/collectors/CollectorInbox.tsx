import { fetchChatListApi } from "@/api/userService"
import BackBtn from "@/components/common/BackBtn"
import ChatUserList from "@/components/common/Chat/ChatUserList"
import ChatWindow from "@/components/common/Chat/ChatWindow"
import EmptyChatList from "@/components/common/Chat/EmptyChatList"
import ComponentSpinner from "@/components/common/ComponentSpinner"
import Loader from "@/components/common/Loader"
import { getSocket } from "@/services/socket"
import { chatListType } from "@/types/ChatListType"
import { useEffect, useState } from "react"


type Props = {}

const CollectorInbox = (props: Props) => {

  const socket = getSocket()
  const [isLoading, setIsLoading] = useState(true)
  const [chatList, setChatList] = useState<chatListType[]>([])
  const [selectedChat, setSelectedChat] = useState<chatListType>()

  //fetch chat list 
  useEffect(() => {
    const fetchChatList = async () => {
      try {
        setIsLoading(true)
        const response = await fetchChatListApi()
        console.log('hello....', response)
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

  const handleSelectedChat = async (data: chatListType) => {
    setSelectedChat(data)
  }

  if (isLoading) return <ComponentSpinner />

  return (
    <div className='px-6 py-4'>
      <BackBtn />
      {chatList.length === 0 ? <EmptyChatList /> :
       <div className='flex justify-center gap-5'>
        <ChatUserList chatList={chatList} handleSelectedChat={handleSelectedChat} />
        <ChatWindow selectedChat={selectedChat as chatListType} role="collector" />
      </div>
      }

    </div>
  )
}

export default CollectorInbox