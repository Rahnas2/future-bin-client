export interface TransactionType {
    paymentId: string,
    pickupRequestId?: string,
    userId: string,
    amount: number,
    currency: string,
    type: 'credited' | 'refunded' | 'transfered' | 'withdrawal',
    paymentStatus: 'pending' | 'succeeded' | 'failed',
    createdAt: string
}