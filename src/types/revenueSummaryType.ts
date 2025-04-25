export interface revenueSummaryType {
    type:   'credited' | 'refunded' | 'transfered',
    total: number;
}