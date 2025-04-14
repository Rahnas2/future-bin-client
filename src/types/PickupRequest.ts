import { onDemandWasteType } from "./onDemandWasteType"
import { requestCancellationType } from "./requestCancellation"

export interface BasePickupRequestType  {
    _id?: string,
    userId?: string,
    name: string,
    mobile: string,
    email: string,
    type: 'on-demand' | 'subscription',
    status?: string,
    address: {
        street: string
        houseNo: string
        district: string
        city: string
        pincode: number
        location: {
            type: 'Point';
            coordinates: [number, number]
        };
    }
    collectorId?: string,
    collectorName?: string,
    cancellation?: requestCancellationType
    paymentStatus?: string,
    totalAmount: number,
    paidAmount?: number,
    paymentIntentId?: string,
    createdAt?: string,
    updatedAt?: string,
    assignedAt?: string,
    completedAt?: string
}

export interface OnDemandPickupRequestType extends BasePickupRequestType {
    type: 'on-demand',
    wasteTypes: onDemandWasteType[],
    totalWeight: number
}

export interface SubscriptionPickupRequestType extends BasePickupRequestType {
    type: 'subscription',
    subscriptionPlanId: string,
    subscriptionPlanName: string,
    totalPickups: number,
    completedPickups: number
}

export interface OnDemandPickupRequestState {
    onDemandPickupRequest: OnDemandPickupRequestType
}

export interface SubscriptionPickupRequestState {
    subscriptionPickupRequest: OnDemandPickupRequestType
}

export type pickupRequestType = OnDemandPickupRequestType | SubscriptionPickupRequestType