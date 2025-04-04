import { useEffect, useState } from 'react';

import { getSocket } from '@/services/socket';
import { PaymentNotificationType } from '@/types/PaymentNotificationType';
import PaymentForm from '@/components/common/Payment/PaymentForm';
import { IoMdClose } from 'react-icons/io';
import { deleteNotificationApi, fetchAllNotificatoinOfUserApi } from '@/api/userService';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const appearance = {
    theme: 'stripe' as 'stripe',
};
const loader = 'auto';

type Props = {}

const UserNotificationComp = (props: Props) => {

    const socket = getSocket();
    const [notifications, setNotifications] = useState<PaymentNotificationType[]>([]);

    const [paymentForm, setPaymentForm] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState<PaymentNotificationType | null>(null);

    useEffect(() => {
        // Listen for payment requests
        socket.on('payment-request', (paymentData: PaymentNotificationType) => {
            console.log('payment data ', paymentData)
            setNotifications((prev) => [...prev, paymentData]);
        });

        // Clean up the socket listener
        return () => {
            socket.off('payment-request');
        };
    }, []);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const result = await fetchAllNotificatoinOfUserApi()
                setNotifications(result.notifications)
            } catch (error) {
                console.error('error fetching notifications ', error)
            }
        }
        fetchNotifications()
    }, [])

    //remove notification 
    const handleRemoveNotification = async (id: string) => {
        try {
            await deleteNotificationApi(id)
            setNotifications(notifications.filter(notification => notification._id !== id ))
        } catch (error) {
            console.log('error removing notfication ', error)
        }
    }

    const handlePaymentForm = (notification: PaymentNotificationType) => {
        console.log('notification ', notification)
        setSelectedNotification(notification);
        setPaymentForm(true);
    };

    return (
        <div className='flex flex-col items-center gap-5 mt-8'>
            {notifications.map((notification, index) => (
                <div className='flex w-full lg:w-[60%] items-center justify-between bg-[#1D4443] px-6 py-4 rounded-xl' key={index} onClick={() => handlePaymentForm(notification)}>
                    <div>
                        <p>{notification.message}</p>
                        <p>Amount: {notification.amount}</p>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(), handleRemoveNotification(notification._id)}} className="font-bold text-end text-accent2 cursor-pointer"><IoMdClose className="inline text-2xl" /></button>
                </div>
            ))}

            {paymentForm && selectedNotification && (
                <div className='fixed inset-0  bg-opacity-50 backdrop-blur-xs flex justify-center items-center'>
                    <div className="bg-white p-6 rounded-lg">
                        <Elements options={{ clientSecret: selectedNotification.clientSecret, appearance, loader }} stripe={stripePromise} >
                            <PaymentForm clientSecret={selectedNotification.clientSecret} notificationId={selectedNotification._id} removeNotification={handleRemoveNotification} requestId={selectedNotification.requestId}  />
                        </Elements>
                        <button onClick={() => setPaymentForm(false)} className="mt-4 text-red-500">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserNotificationComp