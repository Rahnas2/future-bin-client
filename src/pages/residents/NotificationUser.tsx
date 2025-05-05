
import BackBtn from '@/components/common/BackBtn';
import NotificationList from '@/components/Notification/NotificationList';

type Props = {};

const NotificationUser = (props: Props) => {

  return (
    <div className='px-4 py-6'>
        <BackBtn />
        <NotificationList />
    </div>
  );
};

export default NotificationUser;