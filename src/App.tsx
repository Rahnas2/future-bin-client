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
type Props = {}

const App = (props: Props) => {
    return (
        <Router>
            <FacebookProvider appId='1634568927450402'>
                <GoogleOAuthProvider clientId="3144012594-6hqsjqjc8gf3880dkp3n7vqsicml2as1.apps.googleusercontent.com" >
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