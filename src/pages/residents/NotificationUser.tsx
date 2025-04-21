// import React, { useEffect, useState } from 'react';

// import { getSocket } from '@/services/socket';
// import { PaymentNotificationType } from '@/types/PaymentNotificationType';
// import PaymentForm from '@/components/common/Payment/PaymentForm';
import BackBtn from '@/components/common/BackBtn';
import NotificationList from '@/components/Notification/NotificationList';
import UserNotificationComp from '@/components/User/Notification/UserNotificationComp';

type Props = {};

const NotificationUser = (props: Props) => {

  return (
    <div className='px-4 py-6'>
        <BackBtn />
        {/* <UserNotificationComp /> */}
        <NotificationList />
    </div>
  );
};

export default NotificationUser;