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
    approvalStatus: 'pending' | 'approved' | 'rejected';
    status: string;
    stripeAccountId: string
    isStripeEnabled: boolean
}