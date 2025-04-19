import { CollectorDocType } from "./CollectorDocType";
import { UserType } from "./UserType";

export interface CollectorType extends UserType {
    details: CollectorDocType
}