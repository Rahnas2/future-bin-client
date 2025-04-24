export interface reviewType {
    _id?: string
    userId: string,
    type: 'collector' | 'app';
    rating: number;
    comment?: string;
    collectorId?: string
}