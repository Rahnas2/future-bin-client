import { useEffect, useState } from 'react';

import { getSocket } from '@/services/socket';
import PaymentForm from '@/components/common/Payment/PaymentForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { deleteNotificationApi, fetchAllNotificatoinOfReceiverApi } from '@/api/notificationService';
import { notificationType } from '@/types/notificationType';
import { getClientSecretApi } from '@/api/paymentService';
import ComponentSpinner from '@/components/common/ComponentSpinner';
import NotificationItem from '@/components/Notification/NotificationItem';
import EmptyNotifications from '@/components/Notification/EmptyNotifications';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const appearance = {
    theme: 'stripe' as 'stripe',
};
const loader = 'auto';

type Props = {}

const NotificationList = (props: Props) => {

    const socket = getSocket();
    const [notifications, setNotifications] = useState<notificationType[]>([]);

    const [paymentForm, setPaymentForm] = useState(false);
    const [clientSecret, setClientSecret] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const handleNotification = (data: notificationType) => {
            setNotifications((prev) => [data, ...prev,]);
        }

        // Listen for payment requests
        socket.on('pickup_accepted', handleNotification);
        socket.on('payment_success', handleNotification);
        socket.on('payment_failed', handleNotification);
        socket.on('pickup_cancelled', handleNotification);
        socket.on('registeration_accepted', handleNotification);
        socket.on('registeration_rejected', handleNotification);

        // Clean up the socket listener
        return () => {
            socket.off('pickup_accepted');
            socket.off('payment_success');
            socket.off('payment_failed');
            socket.off('pickup_cancelled');
            socket.off('registeration_accepted');
            socket.off('registeration_rejected');
        };
    }, []);


    //fetch All Notifications
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                setIsLoading(true)
                const result = await fetchAllNotificatoinOfReceiverApi()
                console.log('all notification for user ', result)
                setNotifications(result.notifications)
            } catch (error) {
                console.error('error fetching notifications ', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchNotifications()
    }, [])

    //remove notification 
    const handleRemoveNotification = async (id: string) => {
        try {
            await deleteNotificationApi(id)
            setNotifications(notifications.filter(notification => notification._id !== id))
        } catch (error) {
            console.log('error removing notfication ', error)
        }
    }

    const handlePaymentForm = async (requestId: string) => {
        try {
            const result = await getClientSecretApi(requestId)
            setClientSecret(result.clientSecret)
            setPaymentForm(true);
        } catch (error) {
            console.error('error getting client secret ', error)
        }
    }

    if (isLoading) return <ComponentSpinner />

    return (
        <div className='flex flex-col items-center gap-5 mt-8'>
            {notifications.length === 0 ? (<EmptyNotifications />) :
                (notifications.map((notification) => (
                    <NotificationItem
                        key={notification._id}
                        notification={notification}
                        onRemove={handleRemoveNotification}
                        onClick={() => handlePaymentForm(notification.requestId!)}
                    />
                )))
            }
            {paymentForm && clientSecret && (
                <div className='fixed inset-0  bg-opacity-50 backdrop-blur-xs flex justify-center items-center'>
                    <div className="bg-white p-6 rounded-lg">
                        <Elements options={{ clientSecret: clientSecret!, appearance, loader }} stripe={stripePromise} >
                            <PaymentForm />
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

export default NotificationList