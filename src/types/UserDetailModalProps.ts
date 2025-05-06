import { pickupRequestSubscriptionObjType } from "./pickupRequestSubscriptionObjType";
import { UserType } from "./UserType";

export type UserDetailModalProps = {
    user: UserType | null;
    onClose: () => void;
    activeSubscription: pickupRequestSubscriptionObjType | null,
    totalOnDemandPickupsCount: number
  };