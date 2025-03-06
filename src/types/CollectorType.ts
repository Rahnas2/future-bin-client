import { UserType } from "./UserType";

export interface CollectorType extends UserType {
    details: {
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
        wallet?: {
            balance: number;
            transactions: {
                amount: number,
                type: string,
                discription?: string,
                date: Date
            }
        };
    }

}