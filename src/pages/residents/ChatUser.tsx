import { fetchChatListApi } from '@/api/userService'
import BackBtn from '@/components/common/BackBtn'
import ChatUserList from '@/components/common/Chat/ChatUserList'
import ChatWindow from '@/components/common/Chat/ChatWindow'
import EmptyChatList from '@/components/common/Chat/EmptyChatList'
import ComponentSpinner from '@/components/common/ComponentSpinner'
import { getSocket } from '@/services/socket'
import { chatListType } from '@/types/ChatListType'
import React, { useEffect, useState } from 'react'


type Props = {}

const ChatUser = (props: Props) => {

  const socket = getSocket()

  const [isLoading, setIsLoading] = useState(true)
  const [chatList, setChatList] = useState<chatListType[]>([])
  const [selectedChat, setSelectedChat] = useState<chatListType>()
  const [showChatWindowOnMobile, setShowChatWindowOnMobile] = useState(false)

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        setIsLoading(true)
        const response = await fetchChatListApi()
        setChatList(response.chatList)
        setSelectedChat(response.chatList[0])
        setIsLoading(false)
      } catch (error) {
        console.log('error fetching chat list usre side', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchChatList()
  }, [])

  useEffect(() => {
    socket.on('chat update', (updatedChat: chatListType) => {
      console.log('chat update here ', updatedChat)
      setChatList(prev => {
        const updatedList = prev.map(chat =>
          chat._id === updatedChat._id ? updatedChat : chat
        )
        return updatedList.some(chat => chat._id === updatedChat._id)
          ? updatedList
          : [...updatedList, updatedChat];
      })
      if (!selectedChat) {
        setSelectedChat(updatedChat)
      }
    });

    return () => {
      socket.off('chat update');
    };
  }, [selectedChat]);

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
          {/* <ChatUserList chatList={chatList} handleSelectedChat={handleSelectedChat} />
          <ChatWindow selectedChat={selectedChat as chatListType} role='resident' /> */}

          {/* Chat List */}
          <div className={` ${showChatWindowOnMobile ? 'hidden' : 'block'} md:block bg-seconday w-xs py-8 rounded-lg`}>
            <ChatUserList chatList={chatList} handleSelectedChat={handleSelectedChat} />
          </div>

          {/* Chat Window */}
          <div className={` ${showChatWindowOnMobile ? 'block' : 'hidden'} md:block flex  bg-seconday flex-1 rounded-lg`}>
            <ChatWindow
              selectedChat={selectedChat as chatListType}
              onBack={handleBackToList}
              role="resident"
            />
          </div>

        </div>
      }

    </div>
  )
}

export default ChatUser