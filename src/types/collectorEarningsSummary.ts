export interface collectorEarningsSummary {
    totalEarnings: number,
    onDemandEarnings: number,
    subscriptionEarnings: number,
    lastPaymentDate: string | null,
    walletBalance: number
}