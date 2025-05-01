import { onDemandWasteType } from "./onDemandWasteType"
import { refundType } from "./refundType"
import { requestCancellationType } from "./requestCancellation"
import { subscriptionType } from "./SubscriptionType"

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
    refund?: refundType,
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
    subscription: {
        planId: string,
        name: string,
        frequency: string,
        features: string []
        totalPickups: number,
        completedPickups: number,
        startDate?: string,
        endDate?: string,
    }
}

export interface OnDemandPickupRequestState {
    onDemandPickupRequest: OnDemandPickupRequestType
}

export interface SubscriptionPickupRequestState {
    subscriptionPickupRequest: SubscriptionPickupRequestType
}

export type pickupRequestType = OnDemandPickupRequestType | SubscriptionPickupRequestType