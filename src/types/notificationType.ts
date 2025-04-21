export interface notificationType {
    _id: string,
    receiverId: string,
    type: "pickup_accepted" | "payment_success" | "payment_failed" | "pickup_cancelled" | "pickup_completed" | "registeration_accepted" | "registeration_rejected",
    message: string,
    isRead: boolean,
    requestId?: string
}