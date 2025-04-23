import { getSocket } from '@/services/socket'
import { messageType } from '@/types/messageType'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { FiSend } from 'react-icons/fi'
import { GrEmoji } from 'react-icons/gr'
import Loader from '../common/Loader'
import { useSelector } from 'react-redux'
import { IRootState } from '@/redux/slices'
import { fetchMessagesBetweenTwoUserApi } from '@/api/collectorServices'

type Props = {
    participant: string
    participantName: string
}

const ChatModal = (props: Props) => {

    const socket = getSocket()

    const [messages, setMessages] = useState<messageType[]>([])
    const [message, setMessage] = useState('')
    const { role } = useSelector((state: IRootState) => state.auth)
    const { collector } = useSelector((state: IRootState) => state.collector)
    const { user } = useSelector((state: IRootState) => state.user)

    const messagesContainerRef = useRef<HTMLDivElement | null>(null);
    useLayoutEffect(() => {
        const container = messagesContainerRef.current;
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetchMessagesBetweenTwoUserApi(props.participant)
                console.log('messages ', response)
                setMessages(response.messages)
            } catch (error) {
                console.log('error fetching messages ', error)
            }
        }
        fetchMessages()
    }, [props.participant])

    useEffect(() => {
        socket.on("receive message", (newMessage: messageType) => {
            if (newMessage.senderId === props.participant) {
                setMessages((prev) => [...prev, newMessage]);
            }
        });

        return () => {
            socket.off("receive message");
        };
    }, [props.participant]);


    const handleMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setMessage(value)
        console.log('message ', message)
    }

    const sendMessage = () => {
        if (!message.trim()) return;

        const senderId = role === 'collector' ? collector?._id : user?._id
        console.log('sender id ', senderId)
        if(!senderId) return 

        setMessages((prev) => [...prev, { senderId, message, isImage: false, createdAt: new Date().toISOString() }])

        const newMessage = { receiverId: props.participant, message };
        socket.emit("send message", newMessage);
        setMessage("");
    };

    return (
        <div className='flex flex-col max-h-60 py-3 text-seconday'>
            <div className='flex justify-center'>
                {/* <img src="" alt="" /> */}
                <span className=''>{props.participantName}</span>
            </div>
            <div className='flex-1 my-2 overflow-y-auto' ref={messagesContainerRef}>
                {messages?.length ? messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex flex-col text-sm px-4 mb-4 text-primary ${message.senderId === props.participant ? 'items-start' : 'items-end'
                            }`}
                    >
                        <small className="opacity-50 text">{new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</small>
                        <p className={`px-4 py-1 ${message.senderId === props.participant ? 'bg-primary' : 'bg-gray-600'}`}>{message.message}</p>


                    </div>
                )) : <div></div>}
            </div>

            <div className='flex gap-2 px-3'>
                <span><GrEmoji className='inline' /></span>
                <input onChange={(e) => handleMessage(e)} value={message} className='flex-1 border border-gray-600 rounded-full' type="text" placeholder='Type a message' />
                <button onClick={sendMessage}><FiSend className='inline' /></button>
            </div>
        </div>
    )
}

export default ChatModal