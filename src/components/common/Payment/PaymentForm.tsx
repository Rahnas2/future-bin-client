import React from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { PaymentIntent } from '@stripe/stripe-js';
import toast from 'react-hot-toast';
import { handlePaymentError } from '@/utils/handlePaymentError';
import { useNavigate } from 'react-router-dom';


type Props = {
    notificationId?: string,
    removeNotification?: (id: string) => void,
    requestId?: string
};

const PaymentForm = (props: Props) => {
    const stripe = useStripe();
    const elements = useElements();

    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        try {
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: window.location.origin + '/payment-status',
                },
                redirect: 'if_required',
            });

            if (error) {
                handlePaymentError(error);
                return;
            }

            if (paymentIntent) {
                switch (paymentIntent.status) {
                    case 'succeeded':
                        await handleSuccessfulPayment(paymentIntent);
                        break;
                    case 'processing':
                        toast.loading('Payment is processing...');
                        // You might want to poll for status updates
                        break;
                    case 'requires_action':
                        // Handle 3D Secure authentication
                        break;
                    default:
                        toast.error(`Unexpected payment status: ${paymentIntent.status}`);
                }
            }
        } catch (error) {
            console.error('Payment error:', error);
            const errorMessage = 'An unexpected error occurred. Please try again later.';
            toast.error(errorMessage);
            // window.location.href = `${window.location.origin}/payment-status?error=${encodeURIComponent(errorMessage)}`;
            navigate(`/payment-status?error=${encodeURIComponent(errorMessage)}`)
        }
    };


    //handle success full payment
    const handleSuccessfulPayment = async (paymentIntent: PaymentIntent) => {
        console.log('success payment intent ', paymentIntent)
        try {
            // window.location.href = `${window.location.origin}/payment-status?success=true&payment_intent=${paymentIntent.id}`;
            navigate(`/payment-status?success=true&payment_intent=${paymentIntent.id}`, { replace: true })
        } catch (error) {
            console.error('Post-payment processing error:', error);
            toast.error('Payment succeeded but failed to update records. Please contact support.');
            // window.location.href = `${window.location.origin}/payment-status?success=true&payment_intent=${paymentIntent.id}&warning=update_failed`;
            navigate(`/payment-status?success=true&payment_intent=${paymentIntent.id}&warning=update_failed`, { replace: true })
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button
                disabled={!stripe || !elements}
                type="submit"
                className="w-full bg-blue-900 mt-8 py-2 rounded-xs cursor-pointer"
            >
                Pay
            </button>
        </form>
    );
};

export default PaymentForm;