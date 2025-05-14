import { FC } from 'react';
import { IoMdClose } from 'react-icons/io';
import { notificationType } from '@/types/notificationType';
import NotificationIcon from './NotificationIcon';

import { motion } from 'motion/react';


interface Props {
    notification: notificationType;
    onRemove: (id: string) => void;
    onClick: () => void;
}

const NotificationItem: FC<Props> = ({
    notification,
    onRemove,
    onClick
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`
    flex w-full lg:w-[60%] items-center justify-between bg-primary
    px-6 py-4 rounded-xl shadow-md
    transition-all duration-300 ease-in-out
    cursor-pointer border-l-4 ${notification.isRead ? 'border-gray-600' : 'border-accent2'}
  `}
        >
            <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                    <NotificationIcon type={notification.type} />
                </div>
                <div className="flex-1">
                    <p className="font-medium text-white text-sm sm:text-base">{notification.message}</p>
                    {notification.type === 'pickup_accepted' && (
                        <button onClick={onClick} className="text-blue-500 text-xs sm:text-sm mt-1">
                            Click to make payment
                        </button>
                    )}
                </div>
            </div>
            {notification.type !== 'pickup_accepted' &&
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove(notification._id);
                    }}
                    className="ml-4 p-2 rounded-full hover:bg-[#2A5655] transition-colors duration-300 ease-in-out cursor-pointer"
                    aria-label="Remove notification"
                >
                    <IoMdClose className="text-accent2 text-xl " />
                </button>}
        </motion.div>
    );
};

export default NotificationItem;