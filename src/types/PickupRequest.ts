import { onDemandWasteType } from "./onDemandWasteType"

export interface BasePickupRequestType  {
    _id?: string,
    userId?: string,
    name: string,
    mobile: string,
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
    paymentStatus?: string,
    price: number,
    createdAt?: string
}

export interface OnDemandPickupRequestType extends BasePickupRequestType {
    type: 'on-demand',
    wasteTypes: onDemandWasteType[],
    weight: number
}

export interface SubscriptionPickupRequestType extends BasePickupRequestType {
    type: 'subscription',
    subscriptionPlanId: string,
    subscriptionPlanName: string
}

export type pickupRequestType = OnDemandPickupRequestType | SubscriptionPickupRequestType