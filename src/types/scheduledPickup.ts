
export interface scheduledPickupType {
    _id: string
    pickupRequestId: string,
    scheduledDate: Date,
    status: string,
    completedAt: Date
}