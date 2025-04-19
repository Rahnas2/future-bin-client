export interface pickupRequestSubscriptionObjType {
    planId: string,
    name: string,
    frequency: string,
    totalPickups: number,
    features: string []
    completedPickups: number,
    startDate?: string,
    endDate?: string
}