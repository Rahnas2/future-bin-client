export interface CollectorDocType {
    _id: string,
    userId: string
    idCard: {
        front: string;
        back: string;
    }
    vehicleDetails: {
        model: string;
        licensePlate: string;
        image: string
    }
    approvalStatus: string;
    status: string;
    stripeAccountId: string
    isStripeEnabled: boolean
}