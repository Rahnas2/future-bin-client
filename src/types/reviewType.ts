export interface reviewType {
    userId: string,
    type: 'collector' | 'app';
    rating: number;
    comment?: string;
    collectorId?: string
}