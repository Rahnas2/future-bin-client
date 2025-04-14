export interface requestCancellationType {
    cancelledBy: "resident" | "collector";
    reason: string;
    description?: string;
    proof?: string;
}