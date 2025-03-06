import { UserType } from "./UserType";

export type UserDetailModalProps = {
    user: UserType | null;
    onClose: () => void;
  };