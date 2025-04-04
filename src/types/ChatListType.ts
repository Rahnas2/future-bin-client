export interface chatListType {
    _id: string,
    lastMessage: {
        message: string,
        senderId: string,
        isImage: boolean
    },
    participanId: string,
    firstName: string,
    lastName: string,
    image: string
}