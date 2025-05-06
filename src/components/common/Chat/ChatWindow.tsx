import React, { Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'

import { GrEmoji } from "react-icons/gr";
import { FiSend } from "react-icons/fi";
import { chatListType } from '@/types/ChatListType';
import { deleteImageApi, fetchMessagesApi } from '@/api/userService';
import { messageType } from '@/types/messageType';
import Loader from '../Loader';
import { useSelector } from 'react-redux';
import { IRootState } from '@/redux/slices';

import { getSocket } from '@/services/socket';
import { EmojiClickData } from 'emoji-picker-react';
import { CiImageOn } from "react-icons/ci";
import { uploadImage } from '@/utils/uploadImage';
import ChatMediaPreview from './ChatMediaPreview';
import { FaUserCircle } from 'react-icons/fa';

const EmojiPicker = React.lazy(() => import('emoji-picker-react'))

type Props = {
  selectedChat: chatListType,
  role: string
  onBack?: () => void
}

const ChatWindow = (props: Props) => {

  const socket = getSocket()

  const [isLoading, setIsLoading] = useState(true)

  //all messages
  const [messages, setMessages] = useState<messageType[]>([])

  //send single message
  const [message, setMessage] = useState('')

  //send image
  const [image, setImage] = useState<{ url: string, publicId: string } | null>(null)

  //show emojis
  const [shwoPicker, setShowPicker] = useState(false)


  //for hanling message container
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);


  //get sender userId
  let userId: string
  if (props.role === 'resident') {
    const { user } = useSelector((state: IRootState) => state.user)
    userId = user?._id as string
  } else if (props.role === 'collector') {
    const { collector } = useSelector((state: IRootState) => state.collector)
    userId = collector?._id as string
  }

  //initial fetching messages form backend
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetchMessagesApi(props.selectedChat._id)
        setMessages(response.messages)
        setIsLoading(false)
      } catch (error) {
        console.log('error fetching messages ', error)
        setIsLoading(false)
      }
    }
    fetchMessages()
  }, [props.selectedChat])


  //received messages via socket
  useEffect(() => {
    socket.on("receive message", (newMessage: messageType) => {
      console.log('receive message here ', newMessage)
      if (newMessage.senderId === props.selectedChat.participanId) {
        setMessages((prev) => [...prev, newMessage]);
      }
    });

    return () => {
      socket.off("receive message");
    };
  }, [props.selectedChat])


  //handle emoji click
  const onEmojiClick = (emojiData: EmojiClickData) => {
    setMessage(prev => prev + emojiData.emoji)
  }

  //handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const response = await uploadImage(file, 'chat/images')
      setImage(response)
    }
  }

  //handle image remove 
  const handleImageRemove = async () => {
    try {
      setImage(null)
      await deleteImageApi(image?.publicId as string)
    } catch (error) {
      console.error('error deleting image ', error)
    }
  }

  //handle messages changes
  const handleMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setMessage(value)
    console.log('message ', message)
  }


  //send message
  const sendMessage = async () => {
    if (!message.trim() && !image) return;

    // let imageUrl: undefined | string;
    // if (image) {
    //   console.log('image uploading ')
    //   imageUrl = await uploadImage(image, 'chat/images')
    // }

    const messageData = {
      senderId: userId,
      receiverId: props.selectedChat.participanId,
      message: image ? image.url : message,
      isImage: image ? true : false,
      createdAt: new Date().toISOString()
    }

    setMessages((prev) => [...prev, { senderId: messageData.senderId, message: messageData.message, isImage: messageData.isImage, createdAt: messageData.createdAt }])

    const newMessage = { receiverId: messageData.receiverId, message: messageData.message, isImage: messageData.isImage } = messageData
    console.log('new message ', newMessage)
    socket.emit("send message", newMessage);
    setMessage('')
    setImage(null)
  }


  return (
    <div className='flex flex-col flex-1 h-full'>
      {/* <div className='flex gap-5 justify-center border-b border-b-gray-500 items-center py-2'>
        {props.onBack && (
          <div className='justify-start p-2'>
            <button onClick={props.onBack} className='text-lg text-white hover:underline'>
              ← 
            </button>
          </div>
        )}

        {!props.selectedChat.image ? <FaUserCircle className='w-15 h-15' /> : <img className='w-15 h-15 rounded-full' src={props.selectedChat.image} alt="" />}
        <span>{props.selectedChat.firstName + ' ' + props.selectedChat.lastName}</span>
        </div> */}

      <div className="relative border-b border-b-gray-500 py-2 flex items-center justify-center">

        {/* Back Button - only shown on mobile */}
        {props.onBack && (
          <div className="absolute left-5 md:hidden">
            <button onClick={props.onBack} className="text-lg text-white hover:underline">
              ←
            </button>
          </div>
        )}

        {/* Centered Profile Info */}
        <div className="flex items-center gap-3">
          {props.selectedChat.image === '' ? (
            <FaUserCircle className="w-10 h-10 text-white" />
          ) : (
            <img className="w-10 h-10 rounded-full" src={props.selectedChat.image} alt="" />
          )}
          <span className="text-white font-medium">
            {props.selectedChat.firstName + ' ' + props.selectedChat.lastName}
          </span>
        </div>

      </div>


      <div className='flex-1 my-2 overflow-y-auto relative' ref={messagesContainerRef}>
        {isLoading ? <Loader /> : messages?.length ? messages.map((message, index) => (
          <div
            key={index}
            className={`flex flex-col text-sm px-4 mb-4 ${message.senderId === userId ? 'items-end' : 'items-start'
              }`}
          >
            <small className="opacity-50 text">{new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</small>
            {message.isImage ? <img
              src={message.message}
              alt="Sent image"
              className={`max-w-[250px] max-h-[250px] object-cover rounded-lg ${message.senderId === userId ? 'self-end' : 'self-start'}`}
            /> :
              <p className={`px-4 py-1 ${message.senderId === userId ? 'bg-gray-600' : 'bg-primary'}`}>{message.message}</p>}


          </div>
        )) : <div></div>}



      </div>
      {shwoPicker && (
        <div className='absolute bottom-16 left-60 flex justify-center z-10'>
          <Suspense fallback={<div>loading...</div>}>
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </Suspense>
        </div>
      )}

      {image && <ChatMediaPreview
        media={image.url}
        sendMessage={sendMessage}
        handleImageRemove={handleImageRemove} />}

      <div className='flex items-center border border-gray-700 px-5 gap-5 h-10 rounded-b-lg'>

        <button onClick={() => setShowPicker(!shwoPicker)} className='cursor-pointer'><GrEmoji className='inline' /></button>
        <input onChange={handleMessage} value={message} className='flex-1 outline-0' type="text" placeholder='Type a message' />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="imageUpload"
          disabled={!!image}
        />
        <label htmlFor="imageUpload" className="cursor-pointer">
          <CiImageOn className='inline cursor-pointer' />
        </label>

        <button onClick={sendMessage} disabled={!!image}><FiSend className='inline' /></button>
      </div>

    </div>
  )
}

export default ChatWindow