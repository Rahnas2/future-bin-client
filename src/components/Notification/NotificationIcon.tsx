import { FC } from 'react';
import { 
  CheckCircle, 
  CreditCard, 
  AlertCircle, 
  XCircle, 
  Clock, 
  UserCheck, 
  UserX
} from 'lucide-react';

interface Props {
  type: string;
}

const NotificationIcon: FC<Props> = ({ type }) => {
  const iconClass = "h-6 w-6 sm:h-8 sm:w-8";
  
  switch (type) {
    case 'pickup_accepted':
      return <Clock className={`${iconClass} text-blue-300`} />;
    case 'payment_success':
      return <CheckCircle className={`${iconClass} text-emerald-300`} />;
    case 'payment_failed':
      return <AlertCircle className={`${iconClass} text-red-300`} />;
    case 'pickup_cancelled':
      return <XCircle className={`${iconClass} text-amber-300`} />;
    case 'pickup_completed':
      return <CheckCircle className={`${iconClass} text-emerald-300`} />;
    case 'registeration_accepted':
      return <UserCheck className={`${iconClass} text-emerald-300`} />;
    case 'registeration_rejected':
      return <UserX className={`${iconClass} text-red-300`} />;
    default:
      return <CreditCard className={`${iconClass} text-gray-300`} />;
  }
};

export default NotificationIcon;