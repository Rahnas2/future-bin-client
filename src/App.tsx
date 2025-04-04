import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { Toaster } from 'react-hot-toast'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Loader from './components/common/Loader'

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
            <Elements options={{appearance, loader}} stripe={stripePromise} >
                <AppRoutes />
                <Toaster />
            </Elements>
        </Router>
    )
}

export default App