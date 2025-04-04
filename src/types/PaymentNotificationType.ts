export interface PaymentNotificationType {
    _id: string,
    message: string,
    clientSecret: string,
    collectorName: string,
    amount: number,
    requestId?: string 
}