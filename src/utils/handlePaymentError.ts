import { StripeError } from "@stripe/stripe-js";

export const handlePaymentError = (error: StripeError) => {
    console.log('payment error ', error)
        let errorMessage = 'Payment failed: ';
        
        switch (error.type) {
            case 'card_error':
                switch (error.code) {
                    case 'insufficient_funds':
                        errorMessage += 'Insufficient funds in your account';
                        break;
                    case 'card_declined':
                        errorMessage += 'Your card was declined';
                        break;
                    case 'expired_card':
                        errorMessage += 'Your card has expired';
                        break;
                    case 'incorrect_cvc':
                        errorMessage += 'Incorrect CVV code';
                        break;
                    case 'processing_error':
                        errorMessage += 'Processing error occurred';
                        break;
                    default:
                        errorMessage += error.message || 'Unknown card error';
                }
                break;
            case 'validation_error':
                errorMessage += 'Invalid payment details provided';
                break;
            case 'api_error':
            case 'rate_limit_error':
            case 'idempotency_error':
                errorMessage += 'Temporary server issue, please try again';
                break;
            default:
                errorMessage += error.message || 'Unknown error occurred';
        }

        window.location.href = `${window.location.origin}/payment-status?error=${encodeURIComponent(errorMessage)}`;
    };