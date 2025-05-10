import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { Toaster } from 'react-hot-toast'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { FacebookProvider } from 'react-facebook'
import { GoogleOAuthProvider } from '@react-oauth/google'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
console.log('strip promise ', stripePromise)

const appearance = {
    theme: 'stripe' as 'stripe',
};
const loader = 'auto';


const App = () => {
    return (
        <Router>
            <FacebookProvider appId={import.meta.env.VITE_FACEBOOK_APP_ID}>
                <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID} >
                    <Elements options={{ appearance, loader }} stripe={stripePromise} >
                        <AppRoutes />
                        <Toaster />
                    </Elements>
                </GoogleOAuthProvider>
            </FacebookProvider>
        </Router>
    )
}

export default App