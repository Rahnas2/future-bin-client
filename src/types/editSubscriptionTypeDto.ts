export interface editSubscriptionDto {
    id: string,
    updatedData?: {
        name?: string,
        price?: string,
        description?: string
    },
    features?:string[]
}